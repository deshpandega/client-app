import {Component, OnInit} from "@angular/core";
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

  constructor(private formBuilder: FormBuilder, public http: Http){
    this.buildForm();
  }

  ngOnInit(){

  }

  buildForm(){
    this.loginForm=this.formBuilder.group({
      usernameLogin: this.formBuilder.control('', Validators.required),
      passwordLogin: this.formBuilder.control('', Validators.required),
      remember: this.formBuilder.group({
        rememberMe: this.formBuilder.control(false)
      })
    });
    this.usernameLoginControl = this.loginForm.get('usernameLogin');
    this.usernameLoginControl.valueChanges.subscribe(value=>{

    });
    this.passwordLoginControl = this.loginForm.get('passwordLogin');
    this.passwordLoginControl.valueChanges.subscribe(value=>{

    });
  };

  authenticateUser(){
    this.loading = true;
    console.log(this.loginForm.value);

    const formValues = Object.assign({},this.loginForm.value);

    const userData : User = {
      username: this.loginForm.get('usernameLogin').value,
      password: this.loginForm.get('passwordLogin').value
    };

    const sendData = {
      "user": userData
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({headers: headers});

    this.http.post('/api', sendData, requestOptions)
      .map((res: Response) => res.json())
      .subscribe(data=>{
        this.loginForm.reset();
        this.loading = false;
        this.user = data;
      });

    // console.log(this.loginForm.get('usernameLogin').value+" <----> "+this.loginForm.get('passwordLogin').value);
  }

}
