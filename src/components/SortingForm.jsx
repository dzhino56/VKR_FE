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
            <MySelect
                value={sort.column}
                onChange={setSelectedSortingColumn}
                defaultValue={"Выберите столбец для сортировки"}
                arrayOptions={headerOptions}
                style={{width: '50%'}}
            />
            <MySelect
                value={sort.direction}
                onChange={setSelectedSortingValue}
                defaultValue={"Сортировать по"}
                options={[
                    {name: 'По возрастанию', id:'ASC'},
                    {name: 'По убыванию', id:'DESC'},
                ]}
                style={{width: '50%'}}
            />
        </div>
    );
};

export default SortingForm;