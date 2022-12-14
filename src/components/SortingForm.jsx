import React from 'react';
import MySelect from "./UI/select/MySelect";

const SortingForm = ({sort, setSort, headerOptions}) => {

    const setSelectedSortingValue = (e) => {
        setSort({...sort, direction: e})
    }

    const setSelectedSortingColumn = (e) => {
        console.log(e)
        setSort({...sort, column: e})
    }

    return (
        <div>
            <h1>Настройки сортировки</h1>
            <MySelect
                value={sort.column}
                onChange={setSelectedSortingColumn}
                defaultValue={"Выберите столбец для сортировки"}
                arrayOptions={headerOptions}
            />
            <MySelect
                value={sort.direction}
                onChange={setSelectedSortingValue}
                defaultValue={"Сортировать по"}
                options={[
                    {name: 'По возрастанию', value:'ASC'},
                    {name: 'По убыванию', value:'DESC'},
                ]}
            />
        </div>
    );
};

export default SortingForm;