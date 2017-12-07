import {Component} from '@angular/core';
import {SharedService} from "../shared/shared.service";
import {OnInit} from '@angular/core';
import {User} from "../shared/user.model";
@Component({
  selector: 'navigation',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class Navigation{
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
