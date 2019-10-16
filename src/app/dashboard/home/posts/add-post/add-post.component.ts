import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/model/user';
import { ImageService } from 'src/app/config/services/image/image.service';
import { HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Post } from 'src/app/model/post';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent  implements OnInit {

  isVisibleProgressBar: boolean = false;

  progressBarValue: number = 0;

  hint: string;

  isDisiableButton: boolean = true;

  imageName: string;

  private image: File = null;

  params:any;

  postForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddPostComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private imageService: ImageService,
    private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      post: ['']
    });
     this.params={value:this.user.getUsername()};
     
  }

  ngOnInit() {
  }

  public onSubmit(): void {
    if (this.postForm.invalid)
      return;
    if (this.postForm.controls['post'].value == '' && this.image == null)
      return;

    let p: Post = new Post(this.postForm.controls['post'].value, this.user, this.imageName!=null?this.imageName:'');
    this.dialogRef.close(p);
  }

  onNoClick(): void {
    if (this.image != null) {
      this.imageService.delete('posts', this.imageName).subscribe(
        () => {

        });
    }
    this.dialogRef.close();
  }

  public onFileSelected(event) {
    this.image = <File>event.target.files[0];
    this.hint = this.image.name;
    this.onUpload();
  }

  private onUpload() {
    let date = new Date();
    let timestamp = '' + date.getFullYear() + date.getMonth() + date.getDay() + date.getHours() + date.getMinutes() + date.getSeconds();
    this.imageName = `${this.user.getUsername()}_${timestamp}_${this.image.name}`;
    this.isVisibleProgressBar = true;
    this.imageService.upLoad(this.image, 'posts', this.imageName).subscribe(
      response => {
        if (response.type === HttpEventType.UploadProgress) {
          this.progressBarValue = Math.round(response.loaded / response.total * 100);
        }
        else if (response.type === HttpEventType.Response) {

          this.isDisiableButton = false;
        }

      });

  }


}
