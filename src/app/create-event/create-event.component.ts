import {Component} from "@angular/core";
import {SharedService} from "../shared/shared.service";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import { Event } from "../shared/event.model";

@Component({
  selector: 'create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})

export class CreateEventComponent{
  createEventForm: FormGroup;

  nameControl;
  venueControl;
  descriptionControl;
  hobbiesControl;
  dateControl;
  startTimeControl;
  endTimeControl;
  entryFeeControl;
  bannerControl;
  hostControl;
  attendeeControl;
  ratingControl;
  commentsControl;

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
        name:this.formBuilder.control('', Validators.required),
        venue:this.formBuilder.control('', Validators.required),
        description:this.formBuilder.control('', Validators.required),
        hobbies:this.formBuilder.control('', Validators.required),
        date:this.formBuilder.control('', Validators.required),
        duration:this.formBuilder.control('', Validators.required),
        entryFee:this.formBuilder.control('', Validators.required),
        banner:this.formBuilder.control('', Validators.required),
        host:this.formBuilder.control('', Validators.required),
        attendee:this.formBuilder.control('', Validators.required),
        rating:this.formBuilder.control('', Validators.required),
        comments:this.formBuilder.control('', Validators.required),
      });

      this.nameControl = this.createEventForm.get('eventName');
      this.nameControl.valueChanges.subscribe(value=>{ });

      this.venueControl = this.createEventForm.get('venue');
      this.venueControl.valueChanges.subscribe(value=>{ });

      this.descriptionControl = this.createEventForm.get('aboutEvent');
      this.descriptionControl.valueChanges.subscribe(value=>{ });

      this.hobbiesControl = this.createEventForm.get('hobbytags');
      this.hobbiesControl.valueChanges.subscribe(value=>{ });

      this.dateControl = this.createEventForm.get('eventStartDate');
      this.dateControl.valueChanges.subscribe(value=>{ });

      this.startTimeControl = this.createEventForm.get('eventStartTime');
      this.startTimeControl.valueChanges.subscribe(value=>{ });

      this.endTimeControl = this.createEventForm.get('eventEndTime');
      this.endTimeControl.valueChanges.subscribe(value=>{ });

      this.entryFeeControl = this.createEventForm.get('eventFee');
      this.entryFeeControl.valueChanges.subscribe(value=>{ });
    };

    // Authenticate user by calling login-action from OW
    createEventMethod(){
      this.loading = true;

      console.log("hello.. we are in create event method");
      const formValues = Object.assign({},this.createEventForm.value);
      //Get values from validated form and generate event object

      console.log("----------------->"+this.createEventForm.get('hobbyTags').value);

      const eventData : Event = {
        eid:"",
        name: this.createEventForm.get('eventName').value,
        venue: this.createEventForm.get('venue').value,
        description: this.createEventForm.get('aboutEvent').value,
        hobbies: this.createEventForm.get('hobbyTags').value,
        date: this.createEventForm.get('date').value,
        duration: this.createEventForm.get('eventStartTime').value+"to"+this.createEventForm.get('eventEndTime'),
        entryFee:  this.createEventForm.get('eventFee').value,
        banner: null,
        host: null,
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
