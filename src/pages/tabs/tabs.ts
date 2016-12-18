import { Component } from '@angular/core';
import { ConnectzTab } from '../connectz/connectz';
import { ProfilePage } from '../profile/profile';
import { TopiczPage } from '../topicz/topicz';

@Component({
  selector: 'tabs-ui',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = TopiczPage;
  tab2Root = ConnectzTab;
  tab3Root = ProfilePage;
  constructor() {
  }
}
