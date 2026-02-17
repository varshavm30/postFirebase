import { Component, Input, OnInit } from '@angular/core';
import { Ipost } from '../../model/post';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetconfirmComponent } from '../getconfirm/getconfirm.component';
import { filter, switchMap } from 'rxjs';
import { PostsService } from '../../service/posts.service';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
 @Input()postObj !: Ipost
  constructor(
    private _matDialog:MatDialog,
    private _postService:PostsService
    
  ) { }

  ngOnInit(): void {
    
  }


  onRemove(){
    let matConfig = new MatDialogConfig();
    matConfig.data = `Are you sure you want to remove obj with id ${this.postObj.id}`;
    matConfig.disableClose=true;
    let matDialogRef = this._matDialog.open(GetconfirmComponent,matConfig)

     matDialogRef.afterClosed()//true only do api call to remove obj //here we not sub to afterclose dirctly use pipe 
        .pipe(//use pipe which take observable  and return another observable by changing data
          filter(res => {
            return res===true
          }),//pipbele operator filter conditionalyy saying ress is true
        //  filter(Boolean), or we can use
          switchMap(()=>{
          return this._postService.removePost(this.postObj.id)//return obsrvable of removePost
           
          })
        )
        .subscribe({
          next:data=>{
            console.log(data);
            this._postService.setRemovePOstID(this.postObj.id)
          },
          error:err=>{
            console.log(err);
            
          }
        })
  }

  onEdit(){
    console.log(this.postObj);//send obj in formcom using subject
    this._postService.setEditPost(this.postObj)//emit data
    
  }

}
