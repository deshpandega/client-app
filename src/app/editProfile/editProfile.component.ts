import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {SharedService} from "../shared/shared.service";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { User } from "../shared/user.model";
import 'rxjs/add/operator/map';

@Component({
  selector: 'edit-profile',
  templateUrl: './editProfile.component.html',
  styleUrls: ['./editProfile.component.css']
})

export class EditProfileComponent  {

  currentDiv= 'profile' ;
  editProfileForm: FormGroup;
  public token : any;

  fullNameControl;

  user: User;

  public constructor (private formBuilder: FormBuilder, private router : Router ,private _sharedService: SharedService, public http: Http) {
    this.token = this._sharedService.token;
    this.authenticateToken();
  }

  buildForm(){
    console.log("------------------------->>> "+this.user.name);
    this.editProfileForm=this.formBuilder.group({
      name: this.formBuilder.control(this.user.name, Validators.required),
      aboutme: this.formBuilder.control(this.user.aboutme, Validators.required),
      dob: this.formBuilder.control(this.user.dob),
      image: this.formBuilder.control('')
    });
    this.fullNameControl = this.editProfileForm.get('name');
    this.fullNameControl.valueChanges.subscribe(value=>{
      this.user.name
    });

    this.editProfileForm.patchValue({
      fullNameControl:this.user.name
    })
  };

  authenticateToken(){
    const sendData = {
      "generatedToken": this.token
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({headers: headers});

    //Check proxy file for correct API call
    this.http.post('/session', sendData, requestOptions)
      .toPromise().then((res: Response)=>{
      if(res.status == 200){
        this.user = res.json().user;
        this.token = this.user.token;

        // this._sharedService.setToken(this.token);
        // this._sharedService.setUser(this.user);
        this.buildForm();
      }
    }).catch((error)=>{

      this._sharedService.setToken(' blank token ');
      this._sharedService.setUser(null);
    });
  }

  editDetails(){

  }

  managePayment(){
    this.currentDiv = 'payment';
    console.log(this.currentDiv + ' is the current value');
  }

  public token : any;
    user: User;

  //public person : any;
  // Constructor to inject things
  constructor(private router : Router ,public http: Http, private _sharedService: SharedService){
    this.token = this._sharedService.token;
     this.authenticateToken();
  }

authenticateToken(){
    console.log("myToken : edit profile "+ this.token);
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

  openDiv() {
    this.currentDiv = 'profile';
    console.log( ' ------ ' + this.currentDiv);

  }

}
