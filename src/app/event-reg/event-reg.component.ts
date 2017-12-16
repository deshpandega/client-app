import { Component, OnInit } from '@angular/core';
import{Event} from "../shared/event.model";
import {Router} from "@angular/router";
import {SharedService} from "../shared/shared.service";
import {Http, Response, RequestOptions, Headers} from "@angular/http";

@Component({
  selector: 'event-reg',
  templateUrl: './event-reg.component.html',
  styleUrls: ['./event-reg.component.css']
})
export class EventRegComponent implements OnInit {

  public event:any;

  constructor(private router:Router, public http: Http, private _sharedService: SharedService) {

  this.event = this._sharedService.event;

  }

  ngOnInit() {

    console.log("---EVENT IS HERE OUTSIDE"+ this.event.name);
  }

}
