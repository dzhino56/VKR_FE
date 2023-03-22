import React, {useEffect, useState} from 'react';
import axios from "axios";
import MySelect from "./UI/select/MySelect";

const FileSettings = (selectedFile, setSelectedFile, setDisabled) => {
    const [files, setFiles] = useState([])

    const setSelectedFile2 = (e) => {
        setSelectedFile(files.filter(p => p.id === parseInt(e))[0])
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
        </div>
    );
};

export default FileSettings;