import React, {useState} from 'react';
import MySelect from "./UI/select/MySelect";
import MyButton from "./UI/button/MyButton";
import axios from "axios";

const GroupingItem = ({setting, setSetting, addNewSetting, remove, headerOptions, selectedFile, disabledHeader, disabledValue, setDisabledValue, ...props}) => {
    const [valueOptions, setValueOptions] = useState(setting.uniqueValues)

    const setSelectedHeader = async (column) => {
        const uniqueValues = await axios.get(
            "http://localhost:8000/api/v1/values?column=" + column + '&fileId=' + selectedFile.id
        )
        const newSetting = {...setting, title: column, uniqueValues: uniqueValues.data}
        setSetting(newSetting)
        setValueOptions(uniqueValues.data)
        setDisabledValue(false)
    }

    const setSelectedValue = (e) => {
        setSetting({...setting, value: e})
        console.log(e)
    }

    return (
        <div>
            <MySelect
                value={setting.title}
                onChange={setSelectedHeader}
                defaultValue={"Выберите столбец для группировки"}
                arrayOptions={headerOptions}
                disabled={disabledHeader}
                style={{width: "40%"}}
            />
            <MySelect
                value={setting.value}
                onChange={setSelectedValue}
                defaultValue={"Выберите значение для группировки"}
                disabled={disabledValue}
                arrayOptions={valueOptions}
                style={{width: "40%"}}
            />
            <MyButton
                onClick={addNewSetting}
                style={{width: "7.5%", marginLeft: '5%'}}
            >
                +
            </MyButton>
            <MyButton style={{width: "7.5%"}} onClick={() => remove(setting)}>X</MyButton>
        </div>
    );
};

export default GroupingItem;