import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authService:AuthService) {}

  intercept(
    request: HttpRequest<unknown>,//FE req get here in 1st parameter we modify that req
     next: HttpHandler//that modified req send to BE by next parameter
    ): Observable<HttpEvent<unknown>> {
      console.log('Intercept')
  //API call start>>strat spinner>>emit value here >>true
  this._authService.setLoadingStatus(true)//api call start
    const modifiedreq = request.clone({
      setHeaders:{
        "Auth":"Token From LS"
      }
    })
    return next.handle(modifiedreq)
      .pipe(
         finalize(()=>{//this operator tells that res got
          //res get >>stop spinner >> emit false value here
          
          this._authService.setLoadingStatus(false)//api call end

         })
      )
  }
}
