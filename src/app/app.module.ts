import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Navigation } from './nav/nav.component';
import { Carousal } from './carousal/carousal.component';
import { Events } from './events/events.component';
import { Categories } from "./categories/categories.component";
import { Login } from "./login/login.component";
import { About } from "./about/about.component";
import { Contact } from "./contact/contact.component";

@NgModule({
  declarations: [
    AppComponent,
    Navigation,
    Carousal,
    Events,
    Categories,
    Login,
    About,
    Contact
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
