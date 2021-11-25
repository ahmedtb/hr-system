import React from 'react';

export default function TableField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange


    if (type == 'render') {
        const Rows = []
        for (let i = 0; i < field.numberOfRows; i++) {
            Rows[i] = <tr key={i}>
                {
                    field['value'][i].map((element, k) => (
                        <th key={k} scope="row">{element}</th>
                    ))
                }
            </tr>
        }

        return (
            <div className="col-12">
                <strong className="mr-3">{field['label']}</strong>
                <strong className="mr-3">عدد الصفوف في الجدول: {field['numberOfRows']}</strong>

                <table className="table table-striped table-condensed table-bordered">
                    <thead className="thead-light">
                        <tr>
                            {field['columnsTitles'].map((title, k) => (
                                <th key={k} scope="col">{title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Rows}
                    </tbody>
                </table>
            </div>
        );
    }
    else if (type == 'input') {
        const changeElement = (row, col, value) => {
            field['value'][row][col] = value
            onChange(field)
        }
        const Rows = []
        for (let i = 0; i < field.numberOfRows; i++) {
            Rows[i] =
                <tr key={i}>
                    {
                        field['value'][i].map((element, k) => (
                            <th key={k} scope="row">
                                <input onChange={(e) => changeElement(i, k, e.target.value)} value={element ?? ''} />
                            </th>
                        ))
                    }
                </tr>
        }
        return (
            <div className="col-12 my-1">

                <h5 className="mr-3">
                    {field['label']}
                </h5>
                <table className="table table-striped table-condensed table-bordered">
                    <thead className="thead-light">
                        <tr>
                            {
                                field.columnsTitles.map((title, index) => (
                                    <th key={index} scope="col">{title}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {Rows}
                    </tbody>
                </table>
            </div>
        )
    }


}
