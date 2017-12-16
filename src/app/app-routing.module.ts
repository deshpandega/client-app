import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {IndexPage} from "./indexPage/indexPage.component";
import {ProfileComponent} from "./profile/profile.component";
import {PaymentComponent} from "./payment/payment.component";
import {EventRegComponent} from "./event-reg/event-reg.component";
import { AllEventsComponent } from "./all-events/all-events.component";
import { EditProfileComponent } from "./editProfile/editProfile.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {EventCreateComponent} from "./event-create/event-create.component"

const routes: Routes = [
  {
    path: 'index',
    component: IndexPage
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'editprofile',
    component: EditProfileComponent
  },
   {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'event-reg',
    component: EventRegComponent
  },

  {
    path: 'all-events',
    component: AllEventsComponent
  },
  {
    path: 'event-create',
    component: EventCreateComponent
  },

  {
    path: 'about-us',
    component: AboutUsComponent
  },

  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  }
];

@NgModule({
  imports:[RouterModule.forRoot(
      routes,
      {
        enableTracing:true
      }
    )],
  exports:[RouterModule]
})
export class AppRoutingModule{

}
