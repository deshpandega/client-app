import { Component, OnInit } from '@angular/core';
import{Event} from "../shared/event.model";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {SharedService} from "../shared/shared.service";
import 'rxjs/add/operator/map';


@Component({
  selector: 'all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit {
  events:Event[];
  showHide: false;
  hobby: string;
  constructor(public http: Http, private _sharedService: SharedService) { }

  ngOnInit( ) {
    this.getEvents();
    this.searchEvents();
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





}
