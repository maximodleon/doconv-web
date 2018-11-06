import React, { Component } from 'react';
import { saveAs } from 'file-saver'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = { selectedFile: null, loaded: 0 }
    this.hadnleSelectedFile = this.hadnleSelectedFile.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
 }

 hadnleSelectedFile(event) {
         console.log('selectedFile', event.target.files[0])
         this.setState({
                 selectedFile: event.target.files[0],
                 loaded: 0
         })
 } 

  handleUpload() {
    const data = new FormData()
    data.append('file', this.state.selectedFile,
            this.state.selectedFile.name)

    fetch('http://localhost:8080/upload?from=pdf&to=pdf', {
      method: 'POST',
      body: data
    })
                  .then((data) => { 
                          console.log('data', data.headers)
                         return data.blob() 
                  
    })
    .then((blob) => saveAs(blob, 'thisfile.pdf'))
    .catch((error) => console.log('error', error))
  }

  render() {
    return (
        <React.Fragment>
            <input type="file" name="filepond" id="filepond" onChange={this.hadnleSelectedFile}/>
            <button onClick={this.handleUpload}>Upload </button>
         </React.Fragment>
        
    );
  }
}

export default App;
