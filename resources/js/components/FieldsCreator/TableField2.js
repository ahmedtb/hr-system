import React from 'react';
import ReactDOM from 'react-dom';


function TableField2(props) {
    const index = props.index
    const fieldindex = 'fields[' + index + ']'
    const fieldClass = props.fieldClass
    const [rows, setRows] = React.useState(2)
    const [cols, setCols] = React.useState(2)

    function addRow() {
        // setRows(rows+1)
    }

    function addColumn() {
        // setCols(cols+1)
    }

    return (
        <>
            <input name={fieldindex + "[class]"} type="hidden" value="App\FieldsTypes\TableField2" />                <input type='hidden' value='App\FieldsTypes\StringField' />
            <input name={fieldindex + "[numberOfRows]"} type="hidden" value="2" />
            tabel field 2 render <input name={fieldindex + "[label]"} />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"><input name={fieldindex + "[columnsTitles][0]"} /></th>
                        <th scope="col"><input name={fieldindex + "[columnsTitles][1]"} /></th>
                        <th scope="col"><button onClick={addColumn}>
                            add new column
                        </button></th>

                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <th scope="row">
                            <input name={fieldindex + "[value][0][0]"} />
                        </th>
                        <th scope="row">
                            <input name={fieldindex + "[value][0][1]"} />
                        </th>

                    </tr>

                    <tr>

                        <th scope="row">
                            <input name={fieldindex + "[value][1][0]"} />
                        </th>
                        <th scope="row">
                            <input name={fieldindex + "[value][1][1]"} />
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

