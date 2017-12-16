import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class SharedService{
 
  public tokenSource = new Subject<any>();
  public tokenValue$ = this.tokenSource.asObservable();

  public userSource = new Subject<any>();
  public userValue$ = this.userSource.asObservable();

  setToken(token:any){
    this.tokenSource.next(token);
  }

  setUser(user:any){
    this.userSource.next(user);
  }

public token:any;
public user:any;

  public storage :any;
  constructor() {}
}
