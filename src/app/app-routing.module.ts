import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {IndexPage} from "./indexPage/indexPage.component";
import {ProfileComponent} from "./profile/profile.component";
import {PaymentComponent} from "./payment/payment.component";
import {EventRegComponent} from "./event-reg/event-reg.component";
import {createEvent} from "./createEvent/createEvent.component";

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
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'event-reg',
    component: EventRegComponent
  },
  {
    path: 'createEvent',
    component: CreateEventComponent
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
