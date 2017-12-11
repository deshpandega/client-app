import {Component} from '@angular/core';
import {SharedService} from "../shared/shared.service";
import {OnInit} from '@angular/core';
import {User} from "../shared/user.model";
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent{
  token: string;
  user: User;
  
  constructor(private _sharedService: SharedService) { }

  ngOnInit(){
    this._sharedService.tokenValue$.subscribe(
      token=>{
        this.token = token;
      });

    this._sharedService.userValue$.subscribe(
      user=>{
        this.user = user;
        console.log(user);

      })
  };
}
