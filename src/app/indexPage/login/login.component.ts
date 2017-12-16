import {Component, OnInit} from "@angular/core";
import {SharedService} from "../../shared/shared.service";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import { User } from "../../shared/user.model";
import 'rxjs/add/operator/map';
import {EqualValidator} from "./equalvalidator.directive";
import {Router} from "@angular/router";


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

  passwordConfirmRegisterControl;
  emailRegisterControl;
  usernameRegisterControl;
  passwordRegisterControl;

  loading:Boolean = false;
  user:User;

  // To showw error messages to user
  errorUserLogin:string;
  errorUserRegister: string;

  //Token to check authentication of users
  token:string;

  // Constructor to inject things
  constructor(private formBuilder: FormBuilder, public http: Http, private _sharedService: SharedService){
    this.token=this._sharedService.token;
    this.authenticateToken();
    this.buildForm();
    this.registerForm();
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

  registerForm(){
    this.registrationForm=this.formBuilder.group({
      usernameRegister: this.formBuilder.control('', Validators.required),
      emailRegister: this.formBuilder.control('', Validators.required),
      passwordRegister: this.formBuilder.control('', Validators.required),
      confirm_passwordRegister: this.formBuilder.control('', Validators.required)
    });
    console.log('---->'+this.registrationForm.get('usernameRegister').valid);
    this.usernameRegisterControl = this.registrationForm.get('usernameRegister');
    this.usernameRegisterControl.valueChanges.subscribe(value=>{ });

    this.emailRegisterControl = this.registrationForm.get('emailRegister');
    this.emailRegisterControl.valueChanges.subscribe(value=>{ });

    this.passwordRegisterControl = this.registrationForm.get('passwordRegister');
    this.passwordRegisterControl.valueChanges.subscribe(value=>{ });

    this.passwordConfirmRegisterControl = this.registrationForm.get('confirm_passwordRegister');
    this.passwordConfirmRegisterControl.valueChanges.subscribe(value=>{ });
  };

  // Authenticate user by calling login-action from OW
  authenticateUser(){
    this.loading = true;
    this.errorUserLogin=null;
    this.errorUserRegister=null;

    const formValues = Object.assign({},this.loginForm.value);

    //Get values from validated form and generate user object
    const userData : User = {
      email: this.loginForm.get('usernameLogin').value,
      password: this.loginForm.get('passwordLogin').value,
      name: null,
      dob: null,
      profileIcon: null,
      hobbies: [{"name":""}],
      aboutme: null,
      hostedevents: null,
      registeredevents: null,
      token: '',
      payments : null
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
      .toPromise().then((res: Response)=>{
        console.log(res);
        this.loading = false;
        if(res.status == 200){
          this.loginForm.reset();

          this.user = res.json();
          console.log(this.user);
          this.token = this.user.token;

          this._sharedService.setToken(this.token);
          this._sharedService.token = this.token;
          this._sharedService.setUser(this.user);
          console.log("in logic component" + this._sharedService.token);
        }
      }).catch((error)=>{
        console.log("invalid cred -> "+error.json());
          this.errorUserLogin = error.json();
          console.log(this.errorUserLogin);

          this._sharedService.setToken(' blank token ');
          this._sharedService.setUser(null);
      });
  }

  // Register a New User
  registerUser(){
    this.loading = true;
    this.errorUserLogin=null;
    this.errorUserRegister=null;

    const formValues = Object.assign({}, this.registrationForm.value);

    // Get values from validated form and generate user object
    const userRegistrationData : User = {
      email: this.registrationForm.get('emailRegister').value,
      password: this.registrationForm.get('passwordRegister').value,
      name: this.registrationForm.get('usernameRegister').value,
      dob: null,
      profileIcon: null,
      hobbies: [{"name":""}],
      aboutme: null,
      hostedevents: null,
      registeredevents: null,
      token: '',
      payments : null
    };

    // Construct data to be sent to backend because in login-action,
    // we take user out from parameters and then take individual properties of this user
    const sendData = {
      "user": userRegistrationData
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({headers: headers});

    //Check proxy file for correct API call
    this.http.post('/addUser', sendData, requestOptions)
      .toPromise().then((res: Response)=>{
        console.log(res);
        this.loading = false;
        if(res.status == 200){
          this.registrationForm.reset();

          this.user = res.json();
          console.log(this.user);
          this.token = this.user.token;

          this._sharedService.setToken(this.token);
          this._sharedService.setUser(this.user);
        }
      }).catch((error)=>{
        console.log("invalid cred -> "+error.json());
          this.errorUserRegister = error.json();
          console.log(this.errorUserLogin);

          this._sharedService.setToken(' blank token ');
          this._sharedService.setUser(null);
      });

    // .map((res: Response) => res)
      // .subscribe((res)=>{
      //   this.loading = false;
      //   if(res.status == 200){


      //     this.user = res.json();
      //     console.log(this.user);
      //     this.token = this.user.token;

      //     this._sharedService.setToken(this.token);
      //     this._sharedService.setUser(this.user);
      //   }
      //   else if(res.status == 401){
      //     console.log('Invalid credentials');
      //     this.errorUserRegister = res.json();

      //     this._sharedService.setToken(null);
      //     this._sharedService.setUser(null);
      //   }
      // });

    // console.log(this.loginForm.get('usernameLogin').value+" <----> "+this.loginForm.get('passwordLogin').value);
  };

  logout(){
    this.token=null;
    this.user = null;
    this.errorUserLogin=null;
    this.errorUserRegister=null;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions({headers: headers});

    this.http.post('/logout', this.token, requestOptions)
      .toPromise().then((res: Response)=>{
        console.log(res);
        this.loading = false;
        // if(res.status == 200){
          this.loginForm.reset();

          this.token = res.json();

          this._sharedService.setToken(res.json());
          this._sharedService.setUser(null);
        // }
      }).catch((error)=>{
        console.log("invalid cred -> "+error.json());
          this.errorUserLogin = "Something went rong! Please try again later";
          console.log(this.errorUserLogin);

          this._sharedService.setToken(' blank token ');
          this._sharedService.setUser(null);
      });
  }

  authenticateToken(){
    console.log("myToken : create Event"+ this.token);
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
}
