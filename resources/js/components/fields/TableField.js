import React from 'react';

export default function TableField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange

    const Rows = []
    for (let i = 0; i < field.numberOfRows; i++) {
        Rows[i] = <tr key={i}>
            {
                field['value'][i].map((element, k) => (
                    <th key={k}  scope="row">{element}</th>
                ))
            }
        </tr>
    }

    if (type == 'render')
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
