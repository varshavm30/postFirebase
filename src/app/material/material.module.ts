import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
const matArr = [
  MatButtonModule,MatDialogModule,MatIconModule,MatSnackBarModule,MatProgressSpinnerModule,MatCardModule
]
@NgModule({
  declarations: [],
  imports: [...matArr],
  exports:[...matArr]
})
export class MaterialModule { }
