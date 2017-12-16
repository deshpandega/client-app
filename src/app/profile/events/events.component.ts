import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {SharedService} from "../../shared/shared.service";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import { User } from "../../shared/user.model";
import 'rxjs/add/operator/map';

@Component({
  selector: 'events-body',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsBody {
  public token : any;
  user: User;
  events:any[];
  hostedevents:any[];

  public constructor (private router : Router ,private _sharedService: SharedService, public http: Http)
  {

    this.token = this._sharedService.token;
    console.log("profile Header----------------> "+this._sharedService.token);

    //   this.user = this._sharedService.user;
    //console.log("profile Header----------------> "+this._sharedService.user);
    this.authenticateToken();
  }

  authenticateToken(){
    console.log(this.token);
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
        console.log(this.user);
        console.log(this.user.name);
        this.token = this.user.token;

        this._sharedService.setToken(this.token);
        this._sharedService.setUser(this.user);

        this.getRegisteredEvents();
        this.getHostedEvents();
      }
    }).catch((error)=>{
      console.log("invalid cred -> "+error.json());

      this._sharedService.setToken(' blank token ');
      this._sharedService.setUser(null);
    });
  }

  getRegisteredEvents(){
    console.log("----------------->>>"+this.user.name);
    const sendEventData = {
      "attendee" :{
        "name": this.user.name,
        "email": this.user.email
      }
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({headers: headers});

    this.http.post('/getRegisteredEvents', sendEventData, requestOptions)
      .toPromise().then((res: Response)=>{
      if(res.status == 200){
        this.events = res.json();
        this.token = this.user.token;

      }
    }).catch((error)=>{
      console.log("invalid cred -> "+error.json());

      this._sharedService.setToken(' blank token ');
      this._sharedService.setUser(null);
    });
  }

  getHostedEvents(){
    const sendEventData = {
      "host" :{
        "name": this.user.name,
        "email": this.user.email
      }
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({headers: headers});

    this.http.post('/getHostedEvents', sendEventData, requestOptions)
      .toPromise().then((res: Response)=>{
      if(res.status == 200){
        this.hostedevents = res.json();
        this.token = this.user.token;

      }
    }).catch((error)=>{
      console.log("invalid cred -> "+error.json());

      this._sharedService.setToken(' blank token ');
      this._sharedService.setUser(null);
    });
  }

}
