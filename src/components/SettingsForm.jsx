import React, {useEffect, useState} from 'react';
import MySelect from "./UI/select/MySelect";
import MyButton from "./UI/button/MyButton";
import axios from "axios";
import GroupingForm from "./GroupingForm";
import SortingForm from "./SortingForm";

const SettingsForm = ({title, create, sort, setSort}) => {
    const [headerOptions, setHeaderOptions] = useState([])


    useEffect(() => {
        fetch('http://localhost:8000/headers')
            .then(res => res.json())
            .then(data => {
                setHeaderOptions(data);
            });
    }, []);

    return (
        <form>
            <h1>{title}</h1>
            <GroupingForm
                create={create}
                headerOptions={headerOptions}
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