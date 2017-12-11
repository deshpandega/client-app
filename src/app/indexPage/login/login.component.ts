import {Component, OnInit} from "@angular/core";
import {SharedService} from "../../shared/shared.service";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import { User } from "../../shared/user.model";
import 'rxjs/add/operator/map';

@Component({
  selector: 'loginComp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class Login implements OnInit{

  loginForm: FormGroup;
  registrationForm: FormGroup;

  usernameLoginControl;
  passwordLoginControl;

  loading:Boolean = false;
  user:User;

  errorUserLogin:string;

  //Token to check authentication of users
  token:string;

  // Constructor to inject things
  constructor(private formBuilder: FormBuilder, public http: Http, private _sharedService: SharedService){
    this.buildForm();
  }

  // InIt method makes things ready when component is loaded
  ngOnInit(){
    if(this.token!='' && this.token!=null && this.token!=undefined){
      console.log('token present without login');
      this.authenticateUser();
    }
  }

  // Builds the form for client side validation
  buildForm(){
    this.loginForm=this.formBuilder.group({
      usernameLogin: this.formBuilder.control('', Validators.required),
      passwordLogin: this.formBuilder.control('', Validators.required),
      remember: this.formBuilder.group({
        rememberMe: this.formBuilder.control(false)
      })
    });

    this.usernameLoginControl = this.loginForm.get('usernameLogin');
    this.usernameLoginControl.valueChanges.subscribe(value=>{ });

    this.passwordLoginControl = this.loginForm.get('passwordLogin');
    this.passwordLoginControl.valueChanges.subscribe(value=>{ });
  };

  // Authenticate user by calling login-action from OW
  authenticateUser(){
    this.loading = true;

    const formValues = Object.assign({},this.loginForm.value);

    //Get values from validated form and generate user object
    const userData : User = {
      username: this.loginForm.get('usernameLogin').value,
      password: this.loginForm.get('passwordLogin').value,
      fullname: null,
      createdDate: null,
      profileIcon: null,
      hobbies: null
    };

    //Construct data to be sent to backend because in login-action,
    // we take user out from parameters and then take individual properties of this user
    const sendData = {
      "user": userData
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({headers: headers});

    //Check proxy file for correct API call
    this.http.post('/authenticate', sendData, requestOptions)
      // .map((res: Response) => res)
      .subscribe((res)=>{
        this.loading = false;
        console.log('--->> '+res);
        if(res.status == 200){
          this.loginForm.reset();

          this.user = res.json();
          console.log(this.user);
          this.token = res.headers.get('token')[0];

          this._sharedService.setToken(this.token);
          this._sharedService.setUser(this.user);
        }
        else if(res.status == 401){
          console.log('Invalid credentials');
          this.errorUserLogin = res.json();

          this._sharedService.setToken(null);
          this._sharedService.setUser(null);
        }

      });

    // console.log(this.loginForm.get('usernameLogin').value+" <----> "+this.loginForm.get('passwordLogin').value);
  }

}
