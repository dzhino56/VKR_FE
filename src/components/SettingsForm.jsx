import React, {useEffect, useState} from 'react';
import MySelect from "./UI/select/MySelect";
import GroupingForm from "./GroupingForm";
import SortingForm from "./SortingForm";
import axios from "axios";
import FileSettings from "./FileSettings";

const SettingsForm = ({title, create, sort, setSort, selectedFile, setSelectedFile}) => {
    const [headerOptions, setHeaderOptions] = useState([])


    useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URL + '/api/v1/headers')
            .then((response) => {
                setHeaderOptions(response.data)
            });
    }, []);


    const [disabled, setDisabled] = useState(true)
    return (
        <form>
            <FileSettings
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setDisabled={setDisabled}
            />
            <h1>{title}</h1>
            <GroupingForm
                create={create}
                headerOptions={headerOptions}
                selectedFile={selectedFile}
                disabled={disabled}
            />
            <SortingForm
                headerOptions={headerOptions}
                sort={sort}
                setSort={setSort}
            />
        </form>
    );
};

export default SettingsForm;