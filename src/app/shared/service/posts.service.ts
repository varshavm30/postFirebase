import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost, IpostRes } from '../model/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
BASE_URL:string = environment.BASE_URL;
POST_URL:string = `${this.BASE_URL}/posts.json`;

 private newPostSub$:Subject<Ipost> =new Subject<Ipost>()//createsubject
  newPostsObs$:Observable<Ipost>=this.newPostSub$.asObservable()//dashboard to consume data in dashboard array and push in arry

private removePostSub$ :Subject<string>=new Subject<string>();//remove
removePostObs$:Observable<string> = this.removePostSub$.asObservable();

private editPostSub$ : Subject<Ipost> = new Subject<Ipost>()//edit
editPostObs$:Observable<Ipost> = this.editPostSub$.asObservable()

private updatePostSub$ :Subject<Ipost>=new Subject<Ipost>()//update
updatedPostObs$:Observable<Ipost> = this.updatePostSub$.asObservable()
  constructor(
    private _http:HttpClient
  ) { }

    setNewPost(post:Ipost){
    this.newPostSub$.next(post) //as observer data emit
  }

  setRemovePOstID(id:string){
    this.removePostSub$.next(id)
  }

  setEditPost(post:Ipost){
    this.editPostSub$.next(post)//as observer
  }

  setUpdatePost(post:Ipost){
    this.updatePostSub$.next(post)
  }

  fetchPost():Observable<any>{
   return this._http.get<any>(this.POST_URL)
     .pipe(
       map(obj=>{//nestedobj 
         let postsArr:Array<Ipost> =[];//convert obj into array
         for(const key in obj){
           postsArr.unshift({...obj[key],id:key})
         }
         return postsArr//return array
       })
     )
        
  }
                                //<{name:string}>//interface create
  creatPost(postObj:Ipost):Observable<IpostRes>{
     return this._http.post<any>(this.POST_URL,postObj)//firebase gives obj like "name":"56788" other DB gives same obj as we send them
                      //in post we send  url and body
  }
  //here post <IpostRes> bt here atuall ith gives name:"23456" this problem in firebase it gives data like this in other DB they gives
  //same data as we send in json place holder we use IpostRes not any jsonplaeholder gives same res obj we send 

  updatePost(updatedPost:Ipost):Observable<Ipost>{//when we call it updated fuc itereturn obsevable and when subscribe it gives  obj of type ipost
   let UPDATED_URL:string=`${this.BASE_URL}/posts/${updatedPost.id}.json`
   return this._http.patch<Ipost>(UPDATED_URL,updatedPost)
  }

  removePost(id:string):Observable<string>{
    let REMOVE_URL = `${this.BASE_URL}/posts/${id}.json`
    return this._http.delete<string>(REMOVE_URL)
}
}