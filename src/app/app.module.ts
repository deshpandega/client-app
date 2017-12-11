import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { IndexPage } from "./indexPage/indexPage.component";
import { Navigation } from './nav/nav.component';
import { Carousal } from './indexPage/carousal/carousal.component';
import { Events } from './indexPage/events/events.component';
import { Categories } from "./indexPage/categories/categories.component";
import { Login } from "./indexPage/login/login.component";
import { About } from "./indexPage/about/about.component";
import { Contact } from "./contact/contact.component";
import { SharedService } from "./shared/shared.service";
import { EqualValidator } from "./indexPage/login/equalvalidator.directive";

@NgModule({
  declarations: [
    AppComponent,
    IndexPage,
    Navigation,
    Carousal,
    Events,
    Categories,
    Login,
    About,
    Contact,
    EqualValidator
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
