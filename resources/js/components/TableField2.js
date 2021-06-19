import React from 'react';
import ReactDOM from 'react-dom';


function TableField2(props) {
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
            <input name="fields[1][class]" type="hidden" value="App\FieldsTypes\TableField2" />                <input type='hidden' value='App\FieldsTypes\StringField' />
            tabel field 2 render <input name="fields[1][label]" />
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col"><input name="fields[1][columnsTitles][0]" /></th>
                        <th scope="col"><input name="fields[1][columnsTitles][1]" /></th>
                        <button onClick={addColumn}>
                            add new column
                        </button>
                    </tr>
                </thead>
                <input name="fields[1][numberOfRows]" type="hidden" value="2" />
                <tbody>
                    <tr>

                        <th scope="row">
                            <input name="fields[1][value][0][0]" />
                        </th>
                        <th scope="row">
                            <input name="fields[1][value][0][1]" />
                        </th>

                    </tr>

                    <tr>

                        <th scope="row">
                            <input name="fields[1][value][1][0]" />
                        </th>
                        <th scope="row">
                            <input name="fields[1][value][1][1]" />
                        </th>

                    </tr>
                    <button onClick={addRow}>
                        add new row
                    </button>
                </tbody>
            </table>
        </>
    );
}

export default TableField2;

