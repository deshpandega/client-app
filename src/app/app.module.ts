import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IndexPage } from "./indexPage/indexPage.component";
import { HeaderComponent } from './header/header.component';
import { Carousal } from './indexPage/carousal/carousal.component';
import { Events } from './indexPage/events/events.component';
import { Categories } from "./indexPage/categories/categories.component";
import { Login } from "./indexPage/login/login.component";
import { About } from "./indexPage/about/about.component";
import { FooterComponent } from "./footer/footer.component";
import { SharedService } from "./shared/shared.service";
import { ProfileComponent } from "./profile/profile.component";
import { EventRegComponent} from "./event-reg/event-reg.component";
import { EqualValidator } from "./indexPage/login/equalvalidator.directive";
import { PaymentComponent } from "./payment/payment.component";
import { ProfileHeader } from "./profile/profileHeader/profileHeader.component";
import { EventsBody } from "./profile/events/events.component";
import { HobbieDetails } from "./profile/hobbieDetails/hobbieDetails.component";
import { EditProfileComponent } from "./editProfile/editProfile.component";
import { AllEventsComponent } from './all-events/all-events.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EventCreateComponent } from './event-create/event-create.component';

@NgModule({
  declarations: [
    AppComponent, IndexPage, HeaderComponent, Carousal, Events, Categories, Login, About, FooterComponent,
    ProfileComponent, EventRegComponent, EqualValidator,PaymentComponent, ProfileHeader, EventsBody, HobbieDetails, AllEventsComponent,
    EditProfileComponent,
    AboutUsComponent,
    EventCreateComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, RouterModule, AppRoutingModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
