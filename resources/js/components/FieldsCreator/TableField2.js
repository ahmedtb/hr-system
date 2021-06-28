import React from 'react';

function TableField2(props) {
    const index = props.index
    const setField = props.setField

    let numberOfRows = 2
    let label = ''
    let columnsTitles = ['','']
    let value = [['',''],['','']]

    React.useEffect(() => {
        setConfig()
    }, [])
    
    function setConfig() {
        setField({
            class: "App\FieldsTypes\TableField2",
            numberOfRows: numberOfRows,
            columnsTitles: columnsTitles,
            label: label,
            value: value
        })
    }

    function addColumn(){}
    function addRow(){}

    return (
        <>
            tabel field 2 render <input onChange={(e) => { label= e.target.value; setConfig(); }} />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"><input onChange={(e) => { columnsTitles[0]= e.target.value; setConfig(); }} /></th>
                        <th scope="col"><input onChange={(e) => { columnsTitles[1]= e.target.value; setConfig(); }} /></th>
                        <th scope="col"><button onClick={addColumn}>
                            add new column
                        </button></th>

                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <th scope="row">
                            <input onChange={(e) => { value[0][0]= e.target.value; setConfig(); }} />
                        </th>
                        <th scope="row">
                            <input onChange={(e) => { value[0][1]= e.target.value; setConfig(); }} />
                        </th>

                    </tr>

                    <tr>

                        <th scope="row">
                            <input onChange={(e) => { value[1][0]= e.target.value; setConfig(); }} />
                        </th>
                        <th scope="row">
                            <input onChange={(e) => { value[1][1]= e.target.value; setConfig(); }} />
                        </th>

                    </tr>


                </tbody>
            </table>
            <button onClick={addRow}>
                add new row
            </button>
        </>
    );
}

export default TableField2;

