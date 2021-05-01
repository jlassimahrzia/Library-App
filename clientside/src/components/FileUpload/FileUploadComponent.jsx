import React, { Component } from 'react';
import axios, { post } from 'axios';
export default class FileUploadComponent extends Component
{
    constructor(props) {
       super(props);
       this.state ={
         image: ''
       }
       this.onFormSubmit = this.onFormSubmit.bind(this)
       this.onChange = this.onChange.bind(this)
       this.fileUpload = this.fileUpload.bind(this)
     }
     onFormSubmit(e){
       e.preventDefault() 
       this.fileUpload(this.state.image);
     }
     onChange(e) {
       let files = e.target.files || e.dataTransfer.files;
       if (!files.length)
             return;
       this.createImage(files[0]);
     }
     createImage(file) {
       let reader = new FileReader();
       reader.onload = (e) => {
         this.setState({
           image: e.target.result
         })
       };
       reader.readAsDataURL(file);
     }
     fileUpload(image){
       const url = 'http://localhost:8000/api/fileupload';
       const formData = {file: this.state.image}
       return  post(url, formData)
               .then(response => console.log(response))
     }
   
    render()
    {
       return(
 
          <form onSubmit={this.onFormSubmit}>
         <h1>React js Laravel File Upload Tutorial</h1>
         <input type="file"  onChange={this.onChange} />
         <button type="submit">Upload</button>
       </form>
       )
    }
}