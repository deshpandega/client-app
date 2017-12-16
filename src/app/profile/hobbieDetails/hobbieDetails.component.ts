import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {SharedService} from "../../shared/shared.service";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import { User } from "../../shared/user.model";
import 'rxjs/add/operator/map';

@Component({
  selector: 'hobbie-details',
  templateUrl: './hobbieDetails.component.html',
  styleUrls: ['./hobbieDetails.component.css']
})

export class HobbieDetails{
  public token : any;
  user: User;
  hobbies:any[];
  hobbi:any[];

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
      }
    }).catch((error)=>{
      console.log("invalid cred -> "+error.json());

      this._sharedService.setToken(' blank token ');
      this._sharedService.setUser(null);
    });
    this.getAllHobbies();
  }

  getAllHobbies(){
    const sendData = {
      "generatedToken": this.token
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({headers: headers});

    //Check proxy file for correct API call
    this.http.get('/getHobbies', requestOptions)
      .toPromise().then((res: Response)=>{
      if(res.status == 200){
        this.hobbies = res.json();
        console.log(".................................." +res.json());
        // for(var i=0;i<this.hobbies.length; i++){
        //   console.log(this.hobbies[i]);
        // }
        for(var hobby in this.hobbies){
          console.log(this.hobbies[hobby]['name']);
          this.hobbi.push(this.hobbies[hobby]['name']);
        }
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
}
