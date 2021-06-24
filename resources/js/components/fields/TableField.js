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
            <>
                <div className="row p-3">
                    <div className="col-6">
                        حقل جدول بعنوان: {field['label']}
                    </div>
                    <div className="col-6">
                        عدد الصفوف في الجدول: {field['numberOfRows']}
                    </div>
                </div>

                <table className="table table-striped table-condensed table-bordered">
                    <thead>
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
            </>
        );
    }
    else if (type == 'input') {
        const changeElement = (row,col,value)=>{
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
                                <input onChange={(e)=>changeElement(i,k,e.target.value)} value={element ?? ''} />
                            </th>
                        ))
                    }
                </tr>
        }
        return (
            <>
                <div className="row p-3">
                    <div className="col-6">
                        حقل جدول بعنوان: {field['label']}
                    </div>
                    <div className="col-6">
                        عدد الصفوف في الجدول: {field['numberOfRows']}
                    </div>
                </div>
                <table className="table table-striped table-condensed table-bordered">
                    <thead>
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
            </>
        )
    }


}
