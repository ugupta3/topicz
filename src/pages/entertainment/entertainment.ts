import { Component,Input } from '@angular/core';
import { AlertController, App, ModalController, NavController, NavParams, LoadingController } from 'ionic-angular';

import { DataService } from '../../shared/dataservice';
import { ITopic } from '../../shared/interfaces';
import { PostDetailPage } from '../postdetailpage/postdetailpage';
import { CatogeryPage } from '../catogery/catogery';
import { ResponseCreatePage } from '../respondcreate/responsecreate';
import { OrderByPipe} from '../../shared/OrderByPipe'
import { CategoryMappingsService } from '../../shared/categoryMappingService'
@Component({
  selector: 'entertainment-ui',
  templateUrl: 'entertainment.html'
})
export class EntertainmentPage {
  @Input() topics;
  category:string;
  categoryTitle:string;
  queryText="";
  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public dataservice: DataService,
    public navParams: NavParams,
    public orderByPipe: OrderByPipe,
    public categoryMappingsService:CategoryMappingsService
  ) {
     console.log(navParams.data.parentCategory);
    this.category=navParams.data.parentCategory;
    this.categoryTitle=categoryMappingsService.getTitleForCategory(this.category);
    this.queryText="Search topic like movies, events,jobs etc"
    this.loadTopics();
  }

ionViewDidLoad() {
    this.app.setTitle('Entertainment Posts');
    
  }

  loadTopics() {
    let self = this;
    self.topics = [];
    let loader = self.loadingCtrl.create({
      content: 'Loading Topic...',
      dismissOnPageChange: true
    });
    loader.present();
   
    self.dataservice.loadTopicsByCategory(this.category).
      then(function (snapshot) {
        loader.dismiss()
          .then(() => {
            let list = snapshot.val();
           if(list==null)
           return ;    
            Object.keys(list).map(
              (key: any) => {
              let topic: ITopic = list[key];
              console.log("topic" + topic);
              self.topics.push({
                subject: topic.subject,
                description: topic.description,
                topicKey:topic.key,
                tagz: topic.tagz,
                dateCreated: topic.dateCreated,
                user: { uid: topic.user.uid, username: topic.user.username },
                milesAway: topic.milesAway,
                catogery:"",
                numOfcomments:5
              });
               }
            );

            loader.dismiss();
          });
      }, function (error) {
        // The Promise was rejected.
        console.error(error);
        loader.dismiss();
      });
  }



  openCatogeryPage() {
    this.navCtrl.push(CatogeryPage,this.category);
  }

  openResponsePage(topic:any) {
    this.navCtrl.push(ResponseCreatePage,topic);
}

 handleClickEvent(postData)
 {
   if(postData.event.target.id=="respondBtn")
   {
     this.openResponsePage(postData);
   }
   else{
     this.goToPostDetail(postData)
   }
 }
  goToPostDetail(postData) {
    this.navCtrl.push(PostDetailPage, postData);
  }
}
