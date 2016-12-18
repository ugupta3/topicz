import { Geolocation } from 'ionic-native';
import { Injectable } from '@angular/core';
import {DataService} from './dataservice'

declare var GeoFire: any

declare var firebase: any;


@Injectable()
export class GeoFireService
{
   firebaseRef ;
   geoFire;

  constructor(public dataService:DataService)
  {
     this.firebaseRef = firebase.database().ref("topicgeo").push();
     this.geoFire = new GeoFire(this.firebaseRef);
  }

  saveUserCurrentLocations(){
   Geolocation.getCurrentPosition().then(
     (location) => {
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;
    console.log("Retrieved user's location: [" + latitude + ", " + longitude + "]");
   let username = "Uma";
   this.geoFire.set(username, [latitude, longitude]).then(
      (locatio)=> {
      console.log("Current user " + username + "'s location has been added to GeoFire");
     // When the user disconnects from Firebase (e.g. closes the app, exits the browser),
     // remove their GeoFire entry
     //this.firebaseRef.child(username).onDisconnect().remove();
     //console.log("Added handler to remove user " + username + " from GeoFire when you leave this page.");
   },(error)=>
     {
      console.log("Error adding user " + username + "'s location to GeoFire");
   });

  },
   (err) => {
     console.log(err);
   }
 );
}

}
