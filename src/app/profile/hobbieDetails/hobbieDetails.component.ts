import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {SharedService} from "../../shared/shared.service";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {FormGroup, FormBuilder,  FormControl} from "@angular/forms";
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
  hobby: any;
  allHobbi:any[];
  addHobbyForm: FormGroup;


  public constructor (private formBuilder: FormBuilder, private router : Router ,private _sharedService: SharedService, public http: Http) {
    this.token = this._sharedService.token;
    this.buildForm();
    this.authenticateToken();
  }

  buildForm(){
    this.addHobbyForm=this.formBuilder.group({
      hobbies: this.formBuilder.control('')
    });
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

        this._sharedService.setToken(this.token);
        this._sharedService.setUser(this.user);
      }
    }).catch((error)=>{

      this._sharedService.setToken(' blank token ');
      this._sharedService.setUser(null);
    });
    this.getAllHobbies();
  }


  getAllHobbies(){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({headers: headers});

    //Check proxy file for correct API call
    this.http.get('/getHobbies', requestOptions)
      .toPromise().then((res: Response)=>{
      if(res.status == 200){

        this.allHobbi = res.json();
      }
    }).catch((error)=>{

      this._sharedService.setToken(' blank token ');
      this._sharedService.setUser(null);
    });
  }


  addHobby(){
    console.log("Lets add hobbies");
    const selectedHobbies = this.addHobbyForm.get('hobbies').value;

    console.log(selectedHobbies);

    const userData : User = this.user;
    const hobbies = {
      "name":selectedHobbies
    };
    const sendData = {
      "user":userData,
      "hobbies":hobbies,
      task:'addHobby'
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({headers: headers});

    //Check proxy file for correct API call
    this.http.post('/addHobbies', sendData, requestOptions)
      .toPromise().then((res: Response)=>{
      console.log(res);
      if(res.status == 200){
        console.log(res+ " hobbies added");
      }
    }).catch((error)=>{
      console.log("invalid cred -> "+error);
    });
  }
}
