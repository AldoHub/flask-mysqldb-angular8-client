import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlaskapiService } from "../flaskapi.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { Post } from "../models/Post";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  constructor(private flaskApiService: FlaskapiService, private route: ActivatedRoute, private router: Router) { }

  public currentId: any = this.route.snapshot.paramMap.get("id");
  public postSubscription: Subscription;
  public editSubscription: Subscription;
  public post: Post;
  public editMode: boolean = false;
  public image: any;
  public busy: boolean;

  public editForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('',  Validators.required),
    oldcover: new FormControl('',  Validators.required),  
    id: new FormControl('', Validators.required),
    covername: new FormControl('', Validators.required)
  });


  public handleInput($event: Event){
    //getting the image or files
    this.image = $event.target["files"];
    console.log(this.image);
  }


  public enableEdit(){
    this.editMode = !this.editMode;
  }


  public editPost(formData: Post){
    this.busy = true;
    this.editSubscription = this.flaskApiService.editPost(formData, this.image).subscribe(res => {
      this.busy = false;
      console.log(res)
    })
  }


  public getPostById(){
    this.postSubscription = this.flaskApiService.getPost(this.currentId).subscribe( res => {
      this.post = res["data"];
      console.log(this.post)
      this.editForm.setValue({
        title: this.post[1],
        content: this.post[2],
        id: this.post[0],
        oldcover: this.post[3],
        covername: this.post[4]
      })
    })
  }


  public deletePost(postId: any){
    this.flaskApiService.deletePost(postId).subscribe(res => {
      console.log(res);
      this.router.navigate(["/"]);
    })
  }




  ngOnInit() {
    this.getPostById();
  }

  ngOnDestroy(){
    this.postSubscription.unsubscribe();
  }

}
