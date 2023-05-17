import React from 'react';
import SettingItem from "./SettingItem";

const SettingsList = ({remove, settings}) => {
    return (
        <div>
            {settings.map((setting, index) =>
                <SettingItem remove={remove} number={index + 1} setting={setting} key={setting.id}/>
            )}
        </div>
    );
}
;

export default SettingsList;