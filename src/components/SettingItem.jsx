import React from 'react';
import MyButton from "./UI/button/MyButton";

const SettingItem = ({remove, ...props}) => {
    return (
        <div className="setting">
            <div className={"setting__content"}>
                <strong>{props.number}. {props.setting.title}</strong>
                <div>
                    {props.setting.value}
                </div>
            </div>
            <div className="setting__btns">
                <MyButton onClick={() => remove(props.setting)}>
                    Удалить
                </MyButton>
            </div>
        </div>
    );
};

export default SettingItem;