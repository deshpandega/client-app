import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {SharedService} from "../shared/shared.service";
import { User } from "../shared/user.model";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  selector: 'edit-profile',
  templateUrl: './editProfile.component.html',
  styleUrls: ['./editProfile.component.css']
})

export class EditProfileComponent  {

  currentDiv= 'profile' ;
  managePayment(){
    this.currentDiv = 'payment';
    console.log(this.currentDiv + ' is the current value');
  }

  public token : any;
    user: User;

  //public person : any;
  // Constructor to inject things
  constructor(private router : Router ,public http: Http, private _sharedService: SharedService){
    this.token = this._sharedService.token;
     this.authenticateToken();
  }

authenticateToken(){
    console.log("myToken : edit profile "+ this.token);
    const sendData = {
      "generatedToken": this.token
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({headers: headers});

    //Check proxy file for correct API call
    this.http.post('/session', sendData, requestOptions)
      .toPromise().then((res: Response)=>{
      console.log(res);
      if(res.status == 200){
        this.user = res.json().user;
        console.log("my user" + this.user);
        console.log("my user name " + this.user.name);
        this.token = this.user.token;

        this._sharedService.setToken(this.token);
        this._sharedService.setUser(this.user);
      }
    }).catch((error)=>{
      console.log("invalid cred -> "+error.json());

      this._sharedService.setToken(' blank token ');
      this._sharedService.setUser(null);
    });
  }

  openDiv() {
    this.currentDiv = 'profile';
    console.log( ' ------ ' + this.currentDiv);
    // if (activityName === 'EditProfile') {
    //   this.currentDiv = 'profile';
    // } else {
    //   this.currentDiv = 'falafal';
    // }
    // var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    // tabcontent = document.getElementsByClassName("tabcontent");
    // for (i = 0; i < tabcontent.length; i++) {
    //   tabcontent[i].style.display = "none";
    // }

    // Get all elements with class="tablinks" and remove the class "active"
    // tablinks = document.getElementsByClassName("tablinks");
    // for (i = 0; i < tablinks.length; i++) {
    //   tablinks[i].className = tablinks[i].className.replace(" active", "");
    // }

    // Show the current tab, and add an "active" class to the link that opened the tab
    // document.getElementById(activityName).style.display = "block";
    // evt.currentTarget.className += " active";
  }

}
