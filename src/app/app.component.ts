import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'postFirebase';
  isLoading:boolean=false

 private authService = inject(AuthService)//can also inject like this way
    ngOnInit(): void {
    this.authService.isLoadingObs$
      .subscribe(status=>{
        this.isLoading=status
      })
  }
}
