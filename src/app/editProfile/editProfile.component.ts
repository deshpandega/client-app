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
    this.buildForm();
  }

  buildForm(){
    this.editProfileForm=this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required),
      aboutme: this.formBuilder.control('', Validators.required),
      dob: this.formBuilder.control(''),
      image: this.formBuilder.control('')
    });
    this.fullNameControl = this.editProfileForm.get('name');
    this.fullNameControl.valueChanges.subscribe(value=>{  });

    
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
        // this.buildForm();
        this.editProfileForm.patchValue({
          fullNameControl:this.user.name
        });
      }
    }).catch((error)=>{

      this._sharedService.setToken(' blank token ');
      this._sharedService.setUser(null);
    });
  }

  editDetails(){
    this.user.name = this.editProfileForm.get('name').value;
    this.user.aboutme = this.editProfileForm.get('aboutme').value;
    this.user.dob = this.editProfileForm.get('dob').value;

    console.log(this.user.dob);
    
    const sendData = {
      "user": this.user,
      task:'editUser'
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({headers: headers});

    //Check proxy file for correct API call
     this.http.post('/addHobbies', sendData, requestOptions)
      .toPromise().then((res: Response)=>{
      console.log(res);
      if(res.status == 200){
        console.log(res+ " user modified");

        this.router.navigate(['/profile']);
      }
    }).catch((error)=>{
      console.log("invalid cred -> "+error);
    });
  }

  managePayment(){
    this.currentDiv = 'payment';
    console.log(this.currentDiv + ' is the current value');
  }

  openDiv() {
    this.currentDiv = 'profile';
    console.log( ' ------ ' + this.currentDiv);

  }

}
