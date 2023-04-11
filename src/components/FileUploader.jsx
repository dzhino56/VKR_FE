import React, {Component} from 'react';
import axios from "axios";
import {getCookie} from "../functions/functions";

class FileUploader extends Component {

    // On file upload (click the upload button)
    onFileUpload = event => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "file",
            event.target.files[0],
            event.target.files[0].name
        );

        // Request made to the backend api
        // Send formData object
        axios.post(process.env.REACT_APP_BASE_URL + "/api/v1/files", formData, {
            headers: {'X-CSRFToken': getCookie('csrftoken')},
            withCredentials: true
        })
            .catch((error) => {
                switch (error.response.status) {
                    case 403:
                        window.location = '/login'
                        break;
                    default:
                        break
                }
            })
            .then((response) => {
                const file = response['data']['file'];
                this.props.setFiles([...this.props.files, file]);
            });
    };

    // File content to be displayed after
    // file upload is complete

    render() {
        return (
            <div>
                <input type="file" onChange={this.onFileUpload}/>
            </div>
        );
    }
}

export default FileUploader;