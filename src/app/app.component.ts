import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav,Events } from 'ionic-angular';
import { Network,StatusBar, Splashscreen } from 'ionic-native';
import { EntertainmentPage } from '../pages/entertainment/entertainment';
import { HomePage } from '../pages/tabs/home';
import { DataService } from '../shared/dataservice';
import { CategoryMappingsService } from '../shared/categoryMappingService'
import {PageInterface} from '../shared/interfaces'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make TabsPage the root (or first) page
  rootPage: any = HomePage;
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public dataService:DataService,
    public events: Events,
    public categoryMappingsService:CategoryMappingsService
  ) {
    this.initializeApp();
  }

    // set our app's pages
    appPages: PageInterface[] = [
            {title: "Home" ,component:HomePage,icon: './assets/img/GnjSKTMQQOm7L7HetVtR_house_icon_colored.jpg'},
            {title: 'Entertainment',component:EntertainmentPage,index: 1,icon: './assets/img/If0y1AnoQi6lq7eWzdq9_movie.jpg'},
            {title: 'Travel',component:EntertainmentPage,index: 2,icon: './assets/img/ZSBHPs7TgewFHKBeS9fQ_plane-travel-flight-tourism-travel-icon-png-10.png'},
            {title: 'Buy and sell',component:EntertainmentPage,index: 3,icon: './assets/img/c1Uesyy3RiWje8bJ1Nps_Buy_Sell_Transparent.png'},
            {title: 'Jobs',component:EntertainmentPage,index: 4,icon: './assets/img/2UQoV4rnR32gq6h5MJA3_employement-icon.png'},
            {title: 'Services',component:EntertainmentPage,index: 5,icon: './assets/img/rPdHr708TqmVn8fQ1N3v_service.jpg'}
    ];


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page: PageInterface) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component, { tabIndex: page.index,parentCategory:this.categoryMappingsService.
      getCategoryByTitle(page.title) });
  }



}
