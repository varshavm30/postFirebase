import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../service/posts.service';
import { Ipost } from '../../model/post';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
  postsArr:Array<Ipost>=[]
  constructor(
    private _postService:PostsService,
    private _snackbar:SnackbarService
  ) { }

  trackById(index:number,post:Ipost){
    return post.id
  }
  ngOnInit(): void {
    this.getPost()
   this.onUpdate()
   this.onAdd()
   this.onRemove()

  }
  
  onUpdate(){
   this._postService.updatedPostObs$
     .subscribe(post=>{//data replace with array obj update ui
       let getIndex = this.postsArr.findIndex(p=>p.id===post.id)
       this.postsArr[getIndex] = post
       this._snackbar.showSuccsess(`the object with id ${post.id}is updated successfully`)
     })
  }

  onAdd(){
    this._postService.newPostsObs$//as observer s we emit data from form in dasboards inonit
      .subscribe(data=>{//subscribe here 
        this.postsArr.unshift(data)
        this._snackbar.showSuccsess(`the object with  ${data.content}is added successfully`)
      })
  }

  getPost(){
    this._postService.fetchPost()
        .subscribe({
          next:data=>{
            console.log(data)
            this.postsArr = data
          },
          error:err=>{
            console.log(err);
            
          }
        })
  }

  onRemove(){
      
      this._postService.removePostObs$
        .subscribe(id=>{
          let getIndex = this.postsArr.findIndex(p=>p.id===id)
          this.postsArr.splice(getIndex,1)  
          this._snackbar.showSuccsess(`the object with id ${id}is removed successfully`)
          //removed element we can show by snackbar
        })
  }

}
