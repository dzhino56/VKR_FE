import React, {useEffect, useState} from 'react';
import axios from "axios";
import MySelect from "./UI/select/MySelect";
import FileUploader from "./FileUploader";

const FileSettings = ({selectedFile, setSelectedFile, setDisabled}) => {
    const [files, setFiles] = useState([])

    const setSelectedFile2 = (e) => {
        const file = files.filter(p => p.id === parseInt(e))[0]
        console.log(file)
        setSelectedFile({id: file.id, name: file.name})
        setDisabled(false)
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URL + '/api/v1/files',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }).then((response) => {
            setFiles(response['data']['files']);
        }).catch(error => {
            switch (error.response.status) {
                case 403:
                    window.location = '/login'
                    break;
                default:
                    break;
            }
        });
    }, []);

    return (
        <div>
            <MySelect
                value={selectedFile.name}
                onChange={setSelectedFile2}
                defaultValue={"Выберите файл"}
                options={files}
            />
            <FileUploader
                files={files}
                setFiles={setFiles}
            />
        </div>
    );
};

export default FileSettings;