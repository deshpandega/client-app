import {Component} from '@angular/core';
import {SharedService} from "../shared/shared.service";
import {OnInit} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Router} from "@angular/router";
import {User} from "../shared/user.model";

@Component({
  selector: 'header-nav',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent{
  token: string;
  user: User;
  
  constructor(private _sharedService: SharedService, public http: Http, private router: Router) { 
    this._sharedService.tokenValue$.subscribe(
      token=>{
        this.token = token;
        console.log("In header component->> "+this.token);
      });

    this._sharedService.userValue$.subscribe(
      user=>{
        this.user = user;
        console.log(user);
        if(user == null || user == undefined){
          if(this.router.url !== '/event-reg'){
            this.router.navigate(['/index']);
          }
        }
      })
  }

  ngOnInit(){
    
  };

  logout(){
    this.token=null;
    this.user = null;
    
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions({headers: headers});

    this.http.post('/logout', this.token, requestOptions)
      .toPromise().then((res: Response)=>{
        console.log(res);
          this.token = res.json();

          this._sharedService.setToken(res.json());
          this._sharedService.token = res.json();
          this._sharedService.setUser(null);
          this._sharedService.user=null;
        }).catch((error)=>{
        console.log("invalid cred -> "+error.json());
          this._sharedService.setToken(' blank token ');
          this._sharedService.setUser(null);
      });
    };
}