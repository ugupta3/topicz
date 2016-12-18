import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { EntertainmentPage } from '../pages/entertainment/entertainment';
import { ProfilePage } from '../pages/profile/profile';
import { TravelPage } from '../pages/travel/travel';
import { BuyAndSellPage } from '../pages/buyandsell/buyandsell';
import { JobsPage } from '../pages/jobs/jobs';
import { ServicesPage } from '../pages/services/services';
import { ConnectzTab } from '../pages/connectz/connectz';
import { TopiczPage } from '../pages/topicz/topicz';
import { PostPage } from '../pages/post/post';
import { PostDetailPage } from '../pages/postdetailpage/postdetailpage';
import { CatogeryPage } from '../pages/catogery/catogery';
import { PostsData } from '../providers/posts-data';
import { TabsPage } from '../pages/tabs/tabs';
// Custom components
import { TopicComponent } from '../shared/components/topic.component';
import { UserAvatarComponent } from '../shared/components/user-avatar.component';

import { APP_PROVIDERS } from '../providers/appproviders';
import { ResponseCreatePage } from '../pages/respondcreate/responsecreate'



@NgModule({
  declarations: [
    MyApp,
    EntertainmentPage,
    ProfilePage,
    TravelPage,
    JobsPage,
    BuyAndSellPage,
    ServicesPage,
    ConnectzTab,
    TopiczPage,
    PostPage,
    PostDetailPage,
    CatogeryPage,
    TabsPage,
    ResponseCreatePage,
    TopicComponent,
    UserAvatarComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EntertainmentPage,
    ProfilePage,
    TravelPage,
    JobsPage,
    BuyAndSellPage,
    ServicesPage,
    ConnectzTab,
    TopiczPage,
    PostPage,
    PostDetailPage,
    CatogeryPage,
    TabsPage,
    ResponseCreatePage
  ],
  providers: [PostsData,APP_PROVIDERS,{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
