import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private isLoadingSub$ :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingObs$:Observable<boolean>=this.isLoadingSub$ .asObservable()//appcomp use as observable api cl start
  constructor() { }

  setLoadingStatus(status:boolean){
    this.isLoadingSub$.next(status)//as observer in>>authInterceptor service as emitter when api call stop
  }
 
}

