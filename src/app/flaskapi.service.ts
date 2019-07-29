import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Post } from "./models/Post";

@Injectable({
  providedIn: 'root'
})
export class FlaskapiService {

  constructor(private httpClient: HttpClient) { }

  public server:string = "http://localhost:5000/api/";

  public getPosts(){
    return this.httpClient.get<Post>(this.server + "posts");
  }

  public getPost(postId: string){
    return this.httpClient.get<Post>(this.server + `post/${postId}`)
  }


  public addPost(postObj: Post, image: any){

    console.log(image)

     const {title, content} = postObj;
     const formData: FormData = new FormData();

     formData.append("title", title);
     formData.append("content", content);
     formData.append("cover", image[0], image["filename"]);
  
     return this.httpClient.post<Post>(this.server + "addpost", formData)
  }


  public editPost(postObj: Post, image: any){
    const {title, content, id, oldcover, covername} = postObj;
    const formData: FormData = new FormData();

    formData.append("id", id);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("oldcover", oldcover);
    formData.append("covername", covername);

    if(image !== undefined){
      formData.append("cover", image[0], image["filename"]);
      return this.httpClient.put<Post>(this.server + `editfullpost/${id}`, formData);
    }else{
      return this.httpClient.put<Post>(this.server + `editpost/${id}`, formData)
    }

  }



  public deletePost(postId: any){
    const formData: FormData = new FormData();
    formData.append("id", postId);

    return this.httpClient.request("delete", this.server + `deletepost/${postId}`, {body: formData})

  }


}
