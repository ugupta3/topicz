import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { EntertainmentPage } from '../entertainment/entertainment';
import { DataService } from '../../shared/dataservice';
import { ITopic } from '../../shared/interfaces';
@Component({
  selector: 'post-ui',
  templateUrl: 'post.html'
})
export class PostPage {

  topic: ITopic;
 
  constructor(
    public navController: NavController,
    public navParams: NavParams,
    public dataService: DataService,
    public loadingCtrl: LoadingController) {
    this.topic = {
      subject: "",
      description: "",
      tagz: "#" + this.navParams.data.name,
      milesAway: 5,
      category: this.navParams.data.name,
      parentCategory:this.navParams.data.parentCategory,
      user: { uid: "uid", username: "System" },
      dateCreated: new Date().toString(),
      numOfcomments: 20
    };
  };

  createTopic(form) {
    var self = this;
    if (form.valid) {
      let newTopic = JSON.stringify(this.topic);
      console.log(newTopic);
      let loader = self.loadingCtrl.create({
        content: 'Posting Topic...',
        dismissOnPageChange: true
      });
      loader.present();
      this.dataService.createTopic(self.topic).
        then(function (snapshot) {
          loader.dismiss()
            .then(() => {
              self.navController.push(EntertainmentPage,self.topic);
            });
        }, function (error) {
          // The Promise was rejected.
          console.error(error);
          loader.dismiss();
        });
    }
  }
 cancelPost()
 {
  this.navController.push(EntertainmentPage);
 }

}
