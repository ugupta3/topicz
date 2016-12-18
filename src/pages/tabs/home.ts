import { Component } from '@angular/core';
import { ConnectzTab } from '../connectz/connectz';
import { ProfilePage } from '../profile/profile';
import { TopiczPage } from '../topicz/topicz';

@Component({
  selector: 'tabs-ui',
  templateUrl: 'home.html'
})
export class HomePage {
  tab1Root = TopiczPage;
  tab2Root = ConnectzTab;
  tab3Root = ProfilePage;
  constructor() {
  }
}
