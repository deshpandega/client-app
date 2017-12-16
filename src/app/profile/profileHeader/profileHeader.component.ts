import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'profile-header',
  templateUrl: './profileHeader.component.html',
  styleUrls: ['./profileHeader.component.css']
})

export class ProfileHeader{

public token : any;

public constructor (private router : Router ,private _sharedService: SharedService)
{

 this._sharedService.storage = {
            "firstname": "Gaurang",
            "lastname": "Deshpande",
            "address": {
                "city": "Boston",
                "state": "Mass"
            }
        }


        this.token = this._sharedService.token;
    console.log("profile Header----------------> "+this._sharedService.token);
}

}
