import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {IndexPage} from "./indexPage/indexPage.component";
import {ProfileComponent} from "./profile/profile.component";
import {PaymentComponent} from "./payment/payment.component";

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
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  }
];

@NgModule({
  imports:[RouterModule.forRoot(
      routes, 
      {
        enableTracing:true,

      }
    )],
  exports:[RouterModule]
})
export class AppRoutingModule{

}
