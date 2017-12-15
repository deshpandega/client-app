import {Component} from "@angular/core";
import {SharedService} from "../shared/shared.service";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import { Event } from "../shared/event.model";

@Component({
  selector: 'createEvent',
  templateUrl: './createEvent.component.html',
  styleUrls: ['./createEvent.component.css']
})

export class FooterComponent{
  createEventForm: FormGroup;
  
    eventNameControl;
    venueControl;
    cityControl;
    abouteventControl;
    hobbytagsControl;
    createdDateControl;
    eventStartDateControl;
    eventEndDateControl;
    eventStartTimeControl;
    eventEndTimeControl;
    eventFeeControl;
  
    loading:Boolean = false;
    event:Event;
  
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
        this.createEventMethod();
      }
    }
  
    // Builds the form for client side validation
    buildForm(){
      this.createEventForm=this.formBuilder.group({
        eventNameControl: this.formBuilder.control('', Validators.required),
        venueControl: this.formBuilder.control('', Validators.required),
        cityControl: this.formBuilder.control('', Validators.required),
        abouteventControl: this.formBuilder.control('', Validators.required),
        hobbytagsControl: this.formBuilder.control('', Validators.required),
        eventStartDateControl:this.formBuilder.control('',Validators.required),
        eventEndDateControl:this.formBuilder.control('',Validators.required),
        eventStartTimeControl:this.formBuilder.control('',Validators.required),
        eventEndTimeControl:this.formBuilder.control('',Validators.required),
        eventFeeControl:this.formBuilder.control('',Validators.required),
      });
  
      this.eventNameControl = this.createEventForm.get('eventName');
      this.eventNameControl.valueChanges.subscribe(value=>{ });
  
      this.venueControl = this.createEventForm.get('venue');
      this.venueControl.valueChanges.subscribe(value=>{ });
  
      this.cityControl = this.createEventForm.get('city');
      this.cityControl.valueChanges.subscribe(value=>{ });
  
      this.abouteventControl = this.createEventForm.get('aboutEvent');
      this.abouteventControl.valueChanges.subscribe(value=>{ });
  
      this.hobbytagsControl = this.createEventForm.get('hobbytags');
      this.hobbytagsControl.valueChanges.subscribe(value=>{ });

      this.eventStartDateControl = this.createEventForm.get('eventStartDate');
      this.eventStartDateControl.valueChanges.subscribe(value=>{ });

      this.eventEndDateControl = this.createEventForm.get('eventEndDate');
      this.eventEndDateControl.valueChanges.subscribe(value=>{ });

      this.eventStartTimeControl = this.createEventForm.get('eventStartTime');
      this.eventStartTimeControl.valueChanges.subscribe(value=>{ });

      this.eventEndTimeControl = this.createEventForm.get('eventEndTime');
      this.eventEndTimeControl.valueChanges.subscribe(value=>{ });

      this.eventFeeControl = this.createEventForm.get('eventFee');
      this.eventFeeControl.valueChanges.subscribe(value=>{ });
    };
  
    // Authenticate user by calling login-action from OW
    createEventMethod(){
      this.loading = true;
  
      console.log("hello.. we are in create event method");
      const formValues = Object.assign({},this.createEventForm.value);
  
      //Get values from validated form and generate user object
      const eventData : Event = {
      
        eventName: this.createEventForm.get('eventHolderName').value,
        venue: this.createEventForm.get('venue').value,
        city: this.createEventForm.get('city').value,
        aboutEvent: this.createEventForm.get('aboutEvent').value,
        hobbyTags: this.createEventForm.get('hobbyTags').value,
        createdDate: null,
        eventStartDate: this.createEventForm.get('eventStartDate').value,
        eventEndDate: this.createEventForm.get('eventEndDate').value,
        eventStartTime: this.createEventForm.get('eventStartTime').value,
        eventEndTime: this.createEventForm.get('eventEndTime').value,
        eventFee:  this.createEventForm.get('eventFee').value,
        imageUrl: null,
        host: null

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
      this.http.post('/createEvent', sendData, requestOptions)
        // .map((res: Response) => res)
        .subscribe((res)=>{
          this.loading = false;
          if(res.status == 200){
            this.createEventForm.reset();
  
            this.event = res.json();
            console.log(this.event);
            // this.token = res.headers.get('token')[0];
  
            // this._sharedService.setToken(this.token);
            // this._sharedService.setUser(this.event);
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
