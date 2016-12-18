import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';

import { IResponse, IUser } from '../../shared/interfaces';
import { DataService } from '../../shared/dataservice';

@Component({
  templateUrl: 'responsecreate.html',
   selector: 'responsecreate-ui',
})
export class ResponseCreatePage {

  topicKey: string;
  response:IResponse;

  constructor(public nav: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public fb: FormBuilder,
    public dataService: DataService) {

      this.response = {
        text:"",
        topic:"",
        user: { uid: "uid", username: "System" },
        dateCreated: new Date().toString()
      };
      this.topicKey = this.navParams.get('topicKey');
  }


  cancelNewComment() {
    this.viewCtrl.dismiss();
  }

  createRespond(responseForm: any): void {
    var self = this;
    if (responseForm.valid) {

      let loader = this.loadingCtrl.create({
        content: 'Posting comment...',
        dismissOnPageChange: true
      });
        loader.present();
        let uid = "123";
        let username = "Uma";
        let user: IUser = { uid: uid, username: username };

        let newResponse: IResponse = {
          key: null,
          text: this.response.text,
          topic: this.topicKey,
          user: user,
          dateCreated: new Date().toString()
        };
        self.dataService.createResponse(self.topicKey, newResponse).
          then(function (snapshot) {
            loader.dismiss();
            self.viewCtrl.dismiss();
          }, function (error) {
            // The Promise was rejected.
            console.error(error);
            loader.dismiss();
          });
      //});
    }
  }
}
