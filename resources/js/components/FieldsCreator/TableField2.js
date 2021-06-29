import React from 'react';

function TableField2(props) {
    const index = props.index
    const setField = props.setField

    const [numberOfRows, setnumberOfRows] = React.useState(2)
    const [label, setlabel] = React.useState('')
    const [columnsTitles, setcolumnsTitles] = React.useState(['', ''])
    const [value, setvalue] = React.useState([['', ''], ['', '']])

    React.useEffect(() => {
        setConfig()
    }, [numberOfRows, label, columnsTitles, value])

    function setConfig() {
        setField({
            class: "App\\FieldsTypes\\TableField2",
            numberOfRows: numberOfRows,
            columnsTitles: columnsTitles,
            label: label,
            value: value
        })
    }

    function addColumn() { }
    function addRow() { }

    return (
        <>
            tabel field 2 render <input onChange={(e) => { setlabel(e.target.value); }} />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"><input onChange={(e) => {
                            let newArray = [...columnsTitles]
                            newArray[0] = e.target.value;
                            setcolumnsTitles(newArray)
                        }} /></th>
                        <th scope="col"><input onChange={(e) => {
                            let newArray = [...columnsTitles]
                            newArray[1] = e.target.value;
                            setcolumnsTitles(newArray)
                        }} /></th>
                        <th scope="col"><button onClick={addColumn}>
                            add new column
                        </button></th>

                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <th scope="row">
                            <input onChange={(e) => {
                                let newArray = [...value]
                                newArray[0][0] = e.target.value;
                                setvalue(newArray)
                            }} />
                        </th>
                        <th scope="row">
                            <input onChange={(e) => {
                                let newArray = [...value]
                                newArray[0][1] = e.target.value;
                                setvalue(newArray)
                            }} />
                        </th>

                    </tr>

                    <tr>

                        <th scope="row">
                            <input onChange={(e) => {
                                let newArray = [...value]
                                newArray[1][0] = e.target.value;
                                setvalue(newArray)
                            }} />
                        </th>
                        <th scope="row">
                            <input onChange={(e) => {
                                let newArray = [...value]
                                newArray[1][1] = e.target.value;
                                setvalue(newArray)
                            }} />
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

