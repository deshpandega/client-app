import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class SharedService{
 
  private tokenSource = new Subject<any>();
  tokenValue$ = this.tokenSource.asObservable();

  private userSource = new Subject<any>();
  userValue$ = this.userSource.asObservable();

  setToken(token:any){
    this.tokenSource.next(token);
  }

  setUser(user:any){
    this.userSource.next(user);
  }
}
