import { Component, OnInit } from '@angular/core';
import{Event} from "../shared/event.model";
import {Router} from "@angular/router";
import {SharedService} from "../shared/shared.service";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import{User} from "../shared/user.model";




@Component({
  selector: 'event-reg',
  templateUrl: './event-reg.component.html',
  styleUrls: ['./event-reg.component.css']
})
export class EventRegComponent implements OnInit {
  public token:any;
  public event:any;
  user:User;


  constructor(private router:Router, public http: Http, private _sharedService: SharedService) {

  this.event = this._sharedService.event;
    this.token = this._sharedService.token;

    console.log("CONSTRUCTOR EVENT RG" + this._sharedService.token);
    this.authenticateToken();

  }

  ngOnInit() {

    console.log("---EVENT IS HERE OUTSIDE"+ this.event.host.email);
  }


  authenticateToken(){
    console.log("myToken : event reg"+ this.token);
    const sendData = {
      "generatedToken": this.token
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({headers: headers});

    //Check proxy file for correct API callthis._sharedService.token
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

  btnClick(){

    console.log("Host EMAIL ID"+ this.event.host.email)
    console.log("EVENT HOST EMAIL ID"+ this.event.attendee)
    console.log("EVENT HOST EMAIL ID"+Object.entries(this.event.attendee));

    for(var key in this.event.attendee){
      console.log(this.event.attendee[key]);


      if(this.user.email== this.event.host.name)
      {
        alert("Cannot be Registered");
      }

      else{
        alert("Registered");
        this.addAttendeeToEvent();

      }

    }


  }

  // Authenticate user by calling login-action from OW
  addAttendeeToEvent(){


    console.log("hello.. we are in add attendee to event");

    const attendee = {
      email: this.user.email,
      name: this.user.name,
      profileIcon : this.user.profileIcon
    };


    //Construct data to be sent to backend because in login-action,
    // we take user out from parameters and then take individual properties of this user
    const sendData = {
      "event" : this.event,
      "attendee": attendee
    };


    console.log("event" + this.event.name);
    console.log("attendee" + attendee.name);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({headers: headers});

    //Check proxy file for correct API call
    this.http.post('/updateEvent', sendData, requestOptions)
    // .map((res: Response) => res)
      .subscribe((res)=>{

        console.log("I AM HERE!!");
        if(res.status == 200){

          //attendee = res.json();
          console.log("WORKEDDDDD!!");
          // this.token = res.headers.get('token')[0];

          // this._sharedService.setToken(this.token);
          // this._sharedService.setUser(this.card);
        }
        else if(res.status == 401){
          console.log('Invalid credentials');
          //this.errorUserLogin = res.json();

          this._sharedService.setToken(null);
          this._sharedService.setUser(null);
        }
      });

    // console.log(this.loginForm.get('usernameLogin').value+" <----> "+this.loginForm.get('passwordLogin').value);
  }


}
