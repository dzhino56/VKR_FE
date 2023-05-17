import React, {useEffect, useState} from 'react';
import SortingForm from "./SortingForm";
import axios from "axios";
import FileSettings from "./FileSettings";
import MyModal from "./UI/MyModal/MyModal";
import MyButton from "./UI/button/MyButton";
import GroupingItem from "./GroupingItem";

const SettingsForm = ({settings, setSettings, sort, setSort, selectedFile, setSelectedFile}) => {
    const [headerOptions, setHeaderOptions] = useState([])
    const [disabledValue, setDisabledValue] = useState(true)
    const [disabledHeader, setDisabledHeader] = useState(true)

    const [setting, setSetting] = useState({title: '', value: '', uniqueValues: []})

    const addNewSetting = (e) => {
        e.preventDefault()
        const newSetting = {
            ...setting, id: Date.now()
        }
        setSettings([...settings, newSetting])
        setSetting({title: '', value: '', uniqueValues: []})
        setDisabledValue(true)
    }

    const removeSetting = (setting) => {
        setSettings(settings.filter(p => p.id !== setting.id))
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URL + '/api/v1/headers')
            .then((response) => {
                setHeaderOptions(response.data)
            });
    }, []);
    const [visible, setVisible] = useState(false)

    const getModal = (e) => {
        e.preventDefault()
        setVisible(true)
    }


    return (
        <form>
            <MyModal
                visible={visible}
                setVisible={setVisible}
            >
                <FileSettings
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    setDisabled={setDisabledHeader}
                    setVisible={setVisible}
                />
            </MyModal>
            <label>
                {selectedFile.name === '' ? "Файл не выбран" : selectedFile.name}
            </label>
            <MyButton onClick={getModal} style={{marginLeft: '20px'}}>Выбрать файл</MyButton>
            {
                settings.length !== 0 ?
                    settings.map((setting) =>
                        <GroupingItem
                            setting={setting}
                            setSetting={setSetting}
                            addNewSetting={addNewSetting}
                            remove={removeSetting}
                            headerOptions={headerOptions}
                            selectedFile={selectedFile}
                            disabledHeader={false}
                            disabledValue={false}
                            setDisabledValue={setDisabledValue}
                            key={setting.id}
                        />
                    ) : ''

            }
            <GroupingItem
                setting={setting}
                setSetting={setSetting}
                addNewSetting={addNewSetting}
                remove={removeSetting}
                headerOptions={headerOptions}
                selectedFile={selectedFile}
                disabledHeader={disabledHeader}
                disabledValue={disabledValue}
                setDisabledValue={setDisabledValue}
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