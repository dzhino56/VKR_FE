import React from 'react';
import SettingItem from "./SettingItem";

const SettingsList = ({remove, settings, title}) => {
    return (
        <div>
            <h1 style={{textAlign: "center"}}>
                {title}
            </h1>
            {settings.map((setting, index) =>
                <SettingItem remove={remove} number={index + 1} setting={setting} key={setting.id}/>
            )}
        </div>
    );
}
;

export default SettingsList;