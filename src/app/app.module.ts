import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostDashboardComponent } from './shared/component/post-dashboard/post-dashboard.component';
import { PostFormComponent } from './shared/component/post-form/post-form.component';
import { PostCardComponent } from './shared/component/post-card/post-card.component';
import { GetconfirmComponent } from './shared/component/getconfirm/getconfirm.component';
import { MaterialModule } from './material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthInterceptor } from './shared/service/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PostDashboardComponent,
    PostFormComponent,
    PostCardComponent,
    GetconfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
