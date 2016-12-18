import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IResponse, ITopic } from './interfaces';


declare var firebase: any;

@Injectable()
export class DataService {
    databaseRef: any = firebase.database();
    usersRef: any = firebase.database().ref('users');
    topicsRef: any = firebase.database().ref('topics');
    responseRef: any = firebase.database().ref('responses');
    statisticsRef: any = firebase.database().ref('statistics');
    storageRef: any = firebase.storage().ref();
    connectionRef: any = firebase.database().ref('.info/connected');
    defaultImageUrl: string;
    connected: boolean = false;
    dbRef: any = firebase.database();

    constructor() {
        var self = this;
        try {
            self.checkFirebaseConnection();
            /*
            self.storageRef.child('images/default/profile.png').getDownloadURL().then(function (url) {
                self.defaultImageUrl = url.split('?')[0] + '?alt=media';
            });
            */
        } catch (error) {
            console.log('Data Service error:' + error);
        }
    }

    checkFirebaseConnection() {
        try {
            var self = this;
            var connectedRef = self.getConnectionRef();
            connectedRef.on('value', function (snap) {
                console.log(snap.val());
                if (snap.val() === true) {
                    console.log('Firebase: Connected:');
                    self.connected = true;
                } else {
                    console.log('Firebase: No connection:');
                    self.connected = false;
                }
            });
        } catch (error) {
            self.connected = false;
        }
    }

    isFirebaseConnected() {
        return this.connected;
    }

    getDatabaseRef() {
        return this.databaseRef;
    }

    getConnectionRef() {
        return this.connectionRef;
    }

    goOffline() {
        firebase.database().goOffline();
    }

    goOnline() {
        firebase.database().goOnline();
    }

    getDefaultImageUrl() {
        return this.defaultImageUrl;
    }

    getResponsesRef() {
        return this.responseRef;
    }

    getStatisticsRef() {
        return this.statisticsRef;
    }

    getUsersRef() {
        return this.usersRef;
    }

    getStorageRef() {
        return this.storageRef;
    }
    getTopicsRef() {
        return this.topicsRef;
    }

    submitTopic(topic: ITopic) {
        var newTopicRef = this.topicsRef.push();
        topic.key=newTopicRef.key;
        console.log(topic);
        return newTopicRef.set(topic);
    }


    addThreadToFavorites(userKey: string, threadKey: string) {
        return this.usersRef.child(userKey + '/favorites/' + threadKey).set(true);
    }

    getFavoriteThreads(user: string) {
        return this.usersRef.child(user + '/favorites/').once('value');
    }

    setUserImage(uid: string) {
        this.usersRef.child(uid).update({
            image: true
        });
    }

    getTotalTopics() {
        return this.statisticsRef.child('topics').once('value');
    }
    loadTopics() {
        return this.topicsRef.once('value');
    }

    loadTopicsByCategory(category:string) {
        return this.dbRef.ref(category).once('value');
    }

    loadResponsesByTopic(topicKey: string) {
            return this.responseRef.orderByChild('topic').equalTo(topicKey).once('value');
    }

    createTopic(topic:ITopic)
    {
      var newTopicRef = this.databaseRef.ref(topic.parentCategory).push();
      topic.key=newTopicRef.key;
      console.log(topic);
      return newTopicRef.set(topic);
    }
    createResponse(threadKey: string, response: IResponse) {

      let responseRef = this.getResponsesRef().push();
      let responseKey: string = responseRef.key;
         response.key=responseKey;
     return responseRef.set(response);
    }

    voteComment(commentKey: string, like: boolean, user: string): any {
        let commentRef = this.responseRef.child(commentKey + '/votes/' + user);
        return commentRef.set(like);
    }
    getUsername(userUid: string) {
        return this.usersRef.child(userUid + '/username').once('value');
    }
    getUser(userUid: string) {
        return this.usersRef.child(userUid).once('value');
    }
    getUserComments(userUid: string) {
        return this.responseRef.
        orderByChild('user/uid').equalTo(userUid).once('value');
    }
}
