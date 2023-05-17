import classes from "./MySelect.module.css";

const MySelect = ({options, arrayOptions, defaultValue, value, onChange, disabled=false, ...props}) => {
    return (
        <select {...props}
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
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))
            }
        </select>
    );
};

export default MySelect;