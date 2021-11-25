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



    function addColumn() {
        setcolumnsTitles(pre => [...pre, '']);
        let newrows = []
        value.forEach(row => {
            newrows.push([...row, ''])
        })
        setvalue(newrows)
    }
    function addRow() {

        let row = []
        columnsTitles.forEach(element => {
            row.push('')
        });

        setvalue(pre => {
            return [...pre, row]
        })
        setnumberOfRows(pre => pre + 1)
    }

    return (
        <div className="text-center">
            <h6 className="row justify-content-center m-2">
                جدول
            </h6>
            <div className="row justify-content-center m-2">
                عنوان الجدول
                <input onChange={(e) => { setlabel(e.target.value); }} />
            </div>
            <table className="table table-striped mx-auto w-auto">
                <thead className="thead-light">
                    <tr>
                        {
                            columnsTitles.map((title, index) => (
                                <th key={index} scope="col">
                                    <input
                                        onChange={(e) => {
                                            let newArray = [...columnsTitles]
                                            newArray[index] = e.target.value;
                                            setcolumnsTitles(newArray)
                                        }}
                                        placeholder="عنوان العمود (مطلوب)"
                                    />
                                </th>
                            ))
                        }
                        <th scope="col">
                            <button className="btn btn-info" onClick={addColumn}>
                                اضف عمود
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        value.map((row, rowindex) => (
                            <tr key={rowindex}>

                                {
                                    columnsTitles.map((title, index) => (
                                        <th key={index} scope="row">
                                            <input
                                                onChange={(e) => {
                                                    let newArray = [...value]
                                                    newArray[rowindex][index] = e.target.value;
                                                    setvalue(newArray)
                                                }}
                                                placeholder="النص افتراضي للخلية (اختياري)"

                                            />
                                        </th>
                                    ))
                                }

                            </tr>

                        ))
                    }



                </tbody>
            </table>
            <button className="btn btn-info" onClick={addRow}>
                اضف صف
            </button>
        </div>
    );
}

export default TableField2;

