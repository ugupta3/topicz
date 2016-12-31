import { Component, OnChanges, OnInit, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { PageInterface } from '../../shared/interfaces'
import { EntertainmentPage } from '../entertainment/entertainment';
import { ITopic } from '../../shared/interfaces';
import { AlertController, App, ModalController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CategoryMappingsService } from '../../shared/categoryMappingService'
import { DataService } from '../../shared/dataservice';

@Component({
  selector: 'topicz-ui',
  templateUrl: 'topicz.html'
})
export class TopiczPage implements OnInit {

  appPages: PageInterface[] = [
    { title: 'Entertainment', component: EntertainmentPage, index: 1, icon: './assets/img/If0y1AnoQi6lq7eWzdq9_movie.jpg' },
    { title: 'Travel', component: EntertainmentPage, index: 2, icon: './assets/img/ZSBHPs7TgewFHKBeS9fQ_plane-travel-flight-tourism-travel-icon-png-10.png' },
    { title: 'Buy and sell', component: EntertainmentPage, index: 3, icon: './assets/img/c1Uesyy3RiWje8bJ1Nps_Buy_Sell_Transparent.png' },
    { title: 'Jobs', component: EntertainmentPage, index: 4, icon: './assets/img/2UQoV4rnR32gq6h5MJA3_employement-icon.png' },
    { title: 'Services', component: EntertainmentPage, index: 5, icon: './assets/img/rPdHr708TqmVn8fQ1N3v_service.jpg' }
  ];
  @ViewChild('mySlider') slider: Slides;

  public selected = 0;
  public indicator = null;
  public mySlideOptions = {};
  topics: ITopic[][] = [];

  category: string;

  ngAfterViewInit() {
    this.indicator = document.getElementById("indicator");
    if (this.platform.is('windows')) {
      this.indicator.style.opacity = '0';
    }
  }

  constructor(public navCtrl: NavController, public platform: Platform, public loadingCtrl: LoadingController,
    public dataservice: DataService,
    public categoryMappingsService: CategoryMappingsService,
    public zone: NgZone) {
    this.platform = platform;
  }
  ngOnInit() {

  }
  select(p: PageInterface) {
    this.selected = p.index;
    this.category = this.categoryMappingsService.getCategoryByTitle(p.title);
    if (p.index === 1)
      this.indicator.style.webkitTransform = 'translate3d(100%,0,0)';
    if (p.index === 0)
      this.indicator.style.webkitTransform = 'translate3d(0%,0,0)';
    this.slider.slideTo(p.index, 100);
  }

  onSlideChanged($event) {
    if (((($event.touches.startX - $event.touches.currentX) <= 100)
      || (($event.touches.startX - $event.touches.currentX) > 0))
      && (this.slider.isBeginning() || this.slider.isEnd())) {
      //console.log("interdit Direction");
    }
    else {
      //console.log("OK Direction");
      this.indicator.style.webkitTransform = 'translate3d(' + (-($event.translate) / 4) + 'px,0,0)';
    }

  }

  panEvent(e) {
    let currentIndex = this.slider.getActiveIndex();

    if (currentIndex === 1) {
      this.selected = 1;
      this.indicator.style.webkitTransform = 'translate3d(100%,0,0)';
    }
    if (currentIndex === 0) {
      this.selected = 0;
      this.indicator.style.webkitTransform = 'translate3d(0%,0,0)';

    }
  }

  loadTopics() {
    let self = this;
    let loader = self.loadingCtrl.create({
      content: 'Loading Topic...',
      dismissOnPageChange: true
    });
    loader.present();

    for (var i: number = 0; i < this.appPages.length; i++) {
      let category = this.categoryMappingsService.getCategoryByTitle(this.appPages[i].title);
      let topicDbRef = self.dataservice.dbRef.ref(category);
      topicDbRef.on('value', function (snapshot) {
        this.zone.run(() => {
          let list = snapshot.val();
          let topicsForCategory = []
          if (list == null)
            return;
          Object.keys(list).map(
            (key: any) => {
              let topic: ITopic = list[key];
              console.log("topic" + topic);
              topicsForCategory.push(topic);
            });
          self.topics[i] = topicsForCategory;
        })
      }
      );
    }
    loader.dismiss();
  }
}
//import {GeoFireService} from '../../shared/geofireService';
 /*constructor(public geofireService:GeoFireService) {

    geofireService.saveUserCurrentLocations();

  }*/