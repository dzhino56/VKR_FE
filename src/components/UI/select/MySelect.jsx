import React, {useEffect, useState} from 'react';
import classes from "./MySelect.module.css";

const MySelect = ({options, arrayOptions, defaultValue, value, onChange, disabled=false}) => {
    return (
        <select
            value={value}
            className={classes.mySelect}
            onChange={event => onChange(event.target.value)}
            disabled={disabled}
        >
            <option disabled value="">{defaultValue}</option>
            {typeof arrayOptions !== 'undefined'
                ?
                arrayOptions.map(header => (
                <option key={header} value={header}>
                    {header}
                </option>
            ))
            :
                options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))
            }
        </select>
    );
};

export default MySelect;