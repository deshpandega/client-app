import {Component, OnInit} from "@angular/core";
import {SharedService} from "../shared/shared.service";
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import { Event } from "../shared/event.model";
import { User } from "../shared/user.model";


@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit{
  createEventForm: FormGroup;

    loading:Boolean = false;
    event:Event;
    hobbies:any;
    user:User;
    errorUserLogin:string;

    //Token to check authentication of users
    public token:any;

    nameControl;
    venueControl;
    descriptionControl;
    dateControl;
    eventStartTimeControl;
    eventEndTimeControl;
    entryFeeControl;
    // Constructor to inject things
    constructor(private router:Router,private formBuilder: FormBuilder, public http: Http, private _sharedService: SharedService){
      this.token=this._sharedService.token;
      this.authenticateToken();
      this.buildForm();
      this.loadHobbies();
    }

    // InIt method makes things ready when component is loaded
    ngOnInit(){
      if(this.token!='' && this.token!=null && this.token!=undefined){
        console.log('token present without login');
      }
    }

    // Builds the form for client side validation
    buildForm(){
      console.log("Inside Build Form");
      this.createEventForm=this.formBuilder.group({
        eventName:this.formBuilder.control('', Validators.required),
        venue:this.formBuilder.control('', Validators.required),
        description:this.formBuilder.control('', Validators.required),
        hobbies:this.formBuilder.control('', Validators.required),
        date:this.formBuilder.control('', Validators.required),
        eventStartTime:this.formBuilder.control('', Validators.required),
        eventEndTime:this.formBuilder.control('', Validators.required),
        entryFee:this.formBuilder.control('', Validators.required)
      });
      console.log('---->'+this.createEventForm.get('eventName').valid);
      this.nameControl = this.createEventForm.get('eventName');
      this.nameControl.valueChanges.subscribe(value=>{ });

      this.venueControl=this.createEventForm.get('venue');
      this.venueControl.valueChanges.subscribe(value=>{});

      this.descriptionControl=this.createEventForm.get('description');
      this.descriptionControl.valueChanges.subscribe(value=>{});

      this.dateControl=this.createEventForm.get('date');
      this.dateControl.valueChanges.subscribe(value=>{});

      this.eventStartTimeControl=this.createEventForm.get('eventStartTime');
      this.eventStartTimeControl.valueChanges.subscribe(value=>{});

      this.eventEndTimeControl=this.createEventForm.get('eventEndTime');
      this.eventEndTimeControl.valueChanges.subscribe(value=>{});

      this.entryFeeControl=this.createEventForm.get('entryFee');
      this.entryFeeControl.valueChanges.subscribe(value=>{});
    };

    loadHobbies(){
      this.http.get('/getHobbies')
      // .map((res: Response) => res)
      .subscribe((res)=>{
        this.hobbies = res.json();
        console.log(this.hobbies.length);
        if(res.status == 401){
          console.log('Invalid credentials');
          this.errorUserLogin = res.json();

          this._sharedService.setToken(null);
          this._sharedService.setUser(null);
        }
      });
    }

    // Authenticate user by calling login-action from OW
    createEventMethod(){
      this.loading = true;

      console.log("hello.. we are in create event method");
      const formValues = Object.assign({},this.createEventForm.value);
      const hobbies=this.createEventForm.get('hobbies').value;
      var len=hobbies.length;
      let hobArr = [];
      for(var i=0;i<len;i++)
      {
          hobArr.push({"name":hobbies[i]});
      }
      let usr:{name:string,email:string,profileIcon:string};
      usr={name:this.user.name,email:this.user.email,profileIcon:this.user.profileIcon};
      console.log("USR------>"+usr);
      //Get values from validated form and generate event object

    //  console.log("----------------->"+this.createEventForm.get('hobbyTags').value);

      const eventData : Event = {
        eid: "",
        name: this.createEventForm.get('eventName').value,
        venue: this.createEventForm.get('venue').value,
        description: this.createEventForm.get('description').value,
        hobbies:hobArr,
        date: this.createEventForm.get('date').value,
        duration: this.createEventForm.get('eventStartTime').value+"to"+this.createEventForm.get('eventEndTime').value,
        entryFee:  null,
        banner: null,
        host: usr,
        attendee:null,
        rating:null,
        comments:null
      };

      //Construct data to be sent to backend because in login-action,
      // we take user out from parameters and then take individual properties of this user
      const sendData = {
        "event": eventData
      };

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const requestOptions = new RequestOptions({headers: headers});

      //Check proxy file for correct API call
      this.http.post('/postEvent', sendData, requestOptions)
        // .map((res: Response) => res)
        .subscribe((res)=>{
          this.loading = false;
          if(res.status == 200){
            this.createEventForm.reset();

            this.event = res.json();
            console.log(this.event);
            this._sharedService.setToken(this.token);
            this._sharedService.setUser(this.event);
          }
          else if(res.status == 401){
            console.log('Invalid credentials');
            this.errorUserLogin = res.json();

            this._sharedService.setToken(null);
            this._sharedService.setUser(null);
          }
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
