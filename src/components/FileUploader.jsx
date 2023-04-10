import React, {Component} from 'react';
import axios from "axios";
import {getCookie} from "../functions/functions";

class FileUploader extends Component {
    state = {

        // Initially, no file is selected
        selectedFile: null
    };

    // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        this.setState({selectedFile: event.target.files[0]});

    };

    // On file upload (click the upload button)
    onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file
        console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        axios.post(process.env.REACT_APP_BASE_URL + "/api/v1/files", formData, {headers: {'X-CSRFToken': getCookie('csrftoken')}, withCredentials: true})
            .catch((error) => {
                switch (error.response.status) {
                    case 403:
                        window.location = '/login'
                        break;
                    default:
                        break
                }
            });
    };

    // File content to be displayed after
    // file upload is complete

    render() {


        return (
            <div>
                <h3>
                    File Upload using React!
                </h3>
                <div>
                    <input type="file" onChange={this.onFileChange}/>
                    <button onClick={this.onFileUpload}>
                        Upload!
                    </button>
                </div>
            </div>
        );
    }
}

export default FileUploader;