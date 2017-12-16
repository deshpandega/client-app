import { Component, OnInit } from '@angular/core';
import{Event} from "../shared/event.model";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {SharedService} from "../shared/shared.service";
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";


@Component({
  selector: 'all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit {
  events:Event[];
  myevent :Event;
  showHide: false;
  hobby: string;
  constructor(private router:Router, public http: Http, private _sharedService: SharedService) {

    this._sharedService.event = this.myevent;
    console.log("IM in CONSTRUCTOR__----->>>" + this.myevent);

  }

  ngOnInit( ) {
    this.getEvents();
    this.searchEvents();
    this.getDetails(this.myevent);
  }


  getEvents(){
    this.hobby='';
    this.showHide=false;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({headers: headers});

    //Check proxy file for correct API call
    this.http.post('/getEvents', requestOptions)
      .toPromise().then((res: Response)=>{
      console.log(res);
      this.events = res.json();
      console.log("Events Loaded");
        console.log(this.events);

      }
    ).catch((error)=>{
      console.log("invalid cred -> "+error.json());

      console.log("Events not loaded");

    });

  }

  searchEvents(){
    console.log('CLICKED');
    console.log(this.hobby);
    const inputHobby={
     hobby: this.hobby
    }
    console.log("-----> "+inputHobby.hobby);


      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const requestOptions = new RequestOptions({headers: headers});

      //Check proxy file for correct API call
      this.http.post('/searchEventsByHobby',inputHobby, requestOptions)
        .toPromise().then((res: Response)=>{
          console.log(res);
          this.events = res.json();
          console.log("Events Loaded");
          console.log(this.events);

        }
      ).catch((error)=>{
        console.log("invalid cred -> "+error.json());

        console.log("Events not loaded");

      });

    }



  getDetails(myevent){
    for(var key in myevent){
      console.log(myevent[key]);
    }
    console.log("TEST EVENT NAMEEEE " + myevent);
    this._sharedService.event = this.myevent;
    this.hobby='';
    this.showHide=false;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({headers: headers});

    //Check proxy file for correct API call
    this.http.post('/getEvents', requestOptions)
      .toPromise().then((res: Response)=>{
        console.log(res);
        this.events = res.json();
        console.log("Events Loaded");
        console.log(this.events);

      }
    ).catch((error)=>{
      console.log("invalid cred -> "+error.json());

      console.log("Events not loaded");

    });

  }



}
