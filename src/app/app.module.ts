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
import { EqualValidator } from "./indexPage/login/equalvalidator.directive";
import { PaymentComponent } from "./payment/payment.component";

@NgModule({
  declarations: [
    AppComponent, IndexPage, HeaderComponent, Carousal, Events, Categories, Login, About, FooterComponent,
    ProfileComponent, EqualValidator,PaymentComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, RouterModule, AppRoutingModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
