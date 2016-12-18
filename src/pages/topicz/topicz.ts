import { Component } from '@angular/core';
import {GeoFireService} from '../../shared/geofireService';

@Component({
  selector: 'topicz-ui',
  templateUrl: 'topicz.html'
})
export class TopiczPage {
  constructor(public geofireService:GeoFireService) {

    geofireService.saveUserCurrentLocations();

  }
}
