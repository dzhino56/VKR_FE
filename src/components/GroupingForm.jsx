import React, {useState} from 'react';
import MySelect from "./UI/select/MySelect";
import MyButton from "./UI/button/MyButton";
import axios from "axios";

const GroupingForm = ({create, headerOptions}) => {

    const [disabledValue, setDisabledValue] = useState(true)
    const [valueOptions, setValueOptions] = useState([])
    const [setting, setSetting] = useState({title: '', value: ''})

    const addNewSetting = (e) => {
        e.preventDefault()
        const newSetting = {
            ...setting, id: Date.now()
        }
        create(newSetting)
        setSetting({title: '', value: ''})
        setDisabledValue(true)
    }

    const setSelectedHeader = async (column) => {
        setSetting({...setting, title: column})
        const uniqueValues = await axios.get(
            "http://localhost:8000/values?column=" + column
        )
        setValueOptions(uniqueValues.data)
        setDisabledValue(false)
    }

    const setSelectedValue = (e) => {
        setSetting({...setting, value: e})
    }

    return (
        <div>
            <h1>Настройки группировки</h1>
            <MySelect
                value={setting.title}
                onChange={setSelectedHeader}
                defaultValue={"Выберите столбец для группировки"}
                arrayOptions={headerOptions}
            />
            <MySelect
                value={setting.value}
                onChange={setSelectedValue}
                defaultValue={"Выберите значение для группировки"}
                disabled={disabledValue}
                arrayOptions={valueOptions}
            />
            <MyButton onClick={addNewSetting}>Создать группировку</MyButton>
        </div>
    );
};

export default GroupingForm;