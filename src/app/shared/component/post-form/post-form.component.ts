import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../service/posts.service';
import { Observable, Subject } from 'rxjs';
import { Ipost } from '../../model/post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postForm !:FormGroup;
  userIdArr : Array<number> = [1,2,3,4,5,6,7,8,9,10];
  isInEditMode:boolean=false;
  editId!:string//take from edit function//requied in update obj
  constructor(
    private _postService:PostsService
  ) { }

  ngOnInit(): void {
    this.createPostForm();
    this.patchData()
  }

  createPostForm(){//from create here in ts (RF)
    this.postForm = new FormGroup({
      title: new FormControl(null,[Validators.required]),
      content:new FormControl(null,[Validators.required]),
      userId:new FormControl(null,[Validators.required])
    })
  }

onPostAdd(){
    if(this.postForm.valid){
      let post = this.postForm.value //send this obj post to dashboard in array at start by using output deco or subject
       console.log(post);             //so we use subj here, crete in service.ts file
       this._postService.creatPost(post)
          .subscribe({
            next:res=>{ //get id in response  //emit data or response
              console.log(res);
              this.postForm.reset()
              this._postService.setNewPost({...post,id:res.name})//send obj here//in side res there is name key that is id we hv to pass so get it from Bf
              
            },
            error:err =>{
              console.log(err)
            }
          })
       
    }
  }

  patchData(){
    this._postService.editPostObs$.subscribe(data=>{
      this.isInEditMode=true//after getting data form must be in editmode

      this.editId = data.id//for update post 

      this.postForm.patchValue(data)//inRF we directly get patchvalue inTD this.postForm.form.patchvalu()
                                   //after patching value our form used in isInEditMode
      
    })
  }
 
onUpdate(){
  if(this.postForm.valid){
    let UPDATED_POST:Ipost={...this.postForm.value,id:this.editId}
   // console.log(UPDATED_POST)
    this._postService.updatePost(UPDATED_POST)
       .subscribe({
           next:data=>{
            this.postForm.reset()
            this._postService.setUpdatePost(data)
            this.isInEditMode=false
           },error:err=>{
            console.log(err)
           }
       })
       
 }
}
  
}
