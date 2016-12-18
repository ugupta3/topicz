import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { EntertainmentPage } from '../pages/entertainment/entertainment';
import { ProfilePage } from '../pages/profile/profile';
import { ConnectzTab } from '../pages/connectz/connectz';
import { TopiczPage } from '../pages/topicz/topicz';
import { PostPage } from '../pages/post/post';
import { PostDetailPage } from '../pages/postdetailpage/postdetailpage';
import { CatogeryPage } from '../pages/catogery/catogery';
import { PostsData } from '../providers/posts-data';
import { HomePage } from '../pages/tabs/home';
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
    ConnectzTab,
    TopiczPage,
    PostPage,
    PostDetailPage,
    CatogeryPage,
    HomePage,
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
    ConnectzTab,
    TopiczPage,
    PostPage,
    PostDetailPage,
    CatogeryPage,
    HomePage,
    ResponseCreatePage
  ],
  providers: [PostsData,APP_PROVIDERS,{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
