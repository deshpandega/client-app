import {Component, OnInit} from "@angular/core";
import {SharedService} from "../shared/shared.service";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import { Card } from "../shared/card.model";

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit{

  paymentForm: FormGroup;

  cardNameControl;
  cardNumberControl;
  cardMonthControl;
  cardYearControl;
  cardCCVControl;


  loading:Boolean = false;
  card:Card;

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
      this.addPaymentMethod();
    }
  }

  // Builds the form for client side validation
  buildForm(){
    this.paymentForm=this.formBuilder.group({
      cardHolderName: this.formBuilder.control('', Validators.required),
      cardNumber: this.formBuilder.control('', Validators.required),
      cardMonth: this.formBuilder.control('', Validators.required),
      cardYear: this.formBuilder.control('', Validators.required),
      cardCVV: this.formBuilder.control('', Validators.required),
      remember: this.formBuilder.group({
        rememberMe: this.formBuilder.control(false)
      })
    });

    this.cardNameControl = this.paymentForm.get('cardHolderName');
    this.cardNameControl.valueChanges.subscribe(value=>{ });

    this.cardNumberControl = this.paymentForm.get('cardNumber');
    this.cardNumberControl.valueChanges.subscribe(value=>{ });

    this.cardMonthControl = this.paymentForm.get('cardMonth');
    this.cardMonthControl.valueChanges.subscribe(value=>{ });

    this.cardYearControl = this.paymentForm.get('cardYear');
    this.cardYearControl.valueChanges.subscribe(value=>{ });

    this.cardCCVControl = this.paymentForm.get('cardCVV');
    this.cardCCVControl.valueChanges.subscribe(value=>{ });
  };

  // Authenticate user by calling login-action from OW
  addPaymentMethod(){
    this.loading = true;

console.log("hello.. we are in add payment method");
    const formValues = Object.assign({},this.paymentForm.value);

    //Get values from validated form and generate user object
    const cardData : Card = {
      cardHolderName: this.paymentForm.get('cardHolderName').value,
      cardNumber: this.paymentForm.get('cardNumber').value,
      cardMonth: this.paymentForm.get('cardMonth').value,
      cardYear: this.paymentForm.get('cardYear').value,
      cardCVV: this.paymentForm.get('cardCVV').value,
      createdDate: null
    };

    //Construct data to be sent to backend because in login-action,
    // we take user out from parameters and then take individual properties of this user
    const sendData = {
      "card": cardData
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({headers: headers});

    //Check proxy file for correct API call
    this.http.post('/payment', sendData, requestOptions)
      // .map((res: Response) => res)
      .subscribe((res)=>{
        this.loading = false;
        if(res.status == 200){
          this.paymentForm.reset();

          this.card = res.json();
          console.log(this.card);
          // this.token = res.headers.get('token')[0];

          // this._sharedService.setToken(this.token);
          // this._sharedService.setUser(this.card);
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
