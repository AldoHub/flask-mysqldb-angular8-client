import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FlaskapiService } from "../flaskapi.service";
import { Router } from "@angular/router";
import { Post } from "../models/Post";

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  constructor(private flaskApiService: FlaskapiService, private router: Router) { }

  public image:any = null; //list of files
  public busy: boolean;


  public postForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('',  Validators.required),
    cover: new FormControl('',  Validators.required),  
  });

  public handleInput($event: Event){
    //getting the image or files
    this.image = $event.target["files"];
    console.log(this.image);
  }

  public addPost(formData: Post){
    this.busy = true;
    this.flaskApiService.addPost(formData, this.image).subscribe(res => {
      this.busy = false;
      console.log(res);
      this.router.navigate(["/"]);
    });
  }


  ngOnInit() {
  }

}
