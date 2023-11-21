import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template:`
  Tek Dosya
  <input type="file" (change)="getFile1($event)">
  <hr>
  Birden fazla dosya
  <input type="file" (change)="getFile2($event)" multiple>
  <hr>
  Property ve Tek Dosya
  <input type="file" (change)="getFile3($event)">
  <hr>
  Property ve Birden Fazla Dosya
  <input type="file" (change)="getFile4($event)" multiple>
  
  `
})
export class AppComponent {

  file: any ;
  files: any[] = [];
 

  constructor(private http:HttpClient){}

  getFile1(event:any){
    this.file = event.target.files[0];
    this.save1();
  }

  getFile2(event:any){
    this.files = event.target.files;
    this.save2();
  }
  getFile3(event: any){    
    this.file = event.target.files[0]
    
    this.save3();
  }

  getFile4(event: any){
    this.files = event.target.files;
    
    this.save4();
  }

  save1(){
    const formData = new FormData();
    formData.append("file",this.file,this.file.name);
    this.http.post("https://localhost:7277/api/Home/SaveFile",formData)
    .subscribe(res=>{

    })
  }

  save2(){
    
    const formData = new FormData();
    for(let file of this.files ){
      formData.append("file",file,file.name);
     
    }
    this.http.post("https://localhost:7277/api/Home/SaveFiles",formData)
    .subscribe(res=>{
    })
  }

  save3(){
    const formData = new FormData();
    formData.append("id", "1");
    formData.append("file", this.file, this.file.name); 

    this.http.post("https://localhost:7277/api/Home/SaveWithFile",formData)
    .subscribe(res=> {

    })
  }
  save4(){
    const formData = new FormData();
    formData.append("id", "1");
    for(let file of this.files){
      formData.append("files", file, file.name);
    }   

    this.http.post("https://localhost:7277/api/Home/SaveWithFiles",formData)
    .subscribe(res=> {

    })
  }
}
