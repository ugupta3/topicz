import { Component } from '@angular/core';
import { NavParams,NavController } from 'ionic-angular';
import {DataService} from '../../shared/dataservice'
import { ResponseCreatePage } from '../respondcreate/responsecreate'

/*
  Generated class for the PostDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'post-detail-page',
  templateUrl: 'postdetailpage.html'
})
export class PostDetailPage {
  topic: any;
  topicResponses =[]

  constructor(public navParams: NavParams,
    public dataservice: DataService,
    public navCtrl: NavController) {

    this.topic = navParams.data;

    this.topic.topicResponses = this.topicResponses;

    this.loadResponsesForTopic();
  }

 loadResponsesForTopic()
 {
   let self = this.topic;
   this.dataservice.loadResponsesByTopic(this.topic.topicKey).
     then(function (snapshot) {
           let list = snapshot.val();
          if(list!=null)
          { Object.keys(snapshot.val()).map((key: any) => {
             let response:any = list[key];
             console.log("response" + response);
             self.topicResponses.push(response);
           });
         }
     }, function (error) {
       // The Promise was rejected.
       console.error(error);
     });
 }
 openResponsePage() {
   this.navCtrl.push(ResponseCreatePage,this.topic);
 }


}
