import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class PostsData {
  data: any;

  constructor(public http: Http, public alertCtrl: AlertController) { }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('assets/data/data.json')
        .map(this.processData);
    }
  }

  processData(data) {

    this.data = data.json();

    this.data.posts = [];

    // loop through posts
    this.data.entertainmentPosts.forEach(post => {
      post.postResponses = [];
      post.responses.forEach(postResponse => {
        post.postResponses.push(postResponse);
      });
      this.data.posts.push(post);
    });

    return this.data;
  }

  getPosts() {
    return this.load().map(data => {
      return data.posts;
    });

  }

  getMap() {
    return this.load().map(data => {
      return data.map;
    });
  }
}