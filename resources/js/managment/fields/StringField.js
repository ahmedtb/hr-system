import React from 'react';

export default function StringField(props) {
    const type = props.type
    const field = props.value
    const [fieldValue, setFieldValue] = React.useState(field['value'])
    const index = props.index
    const onChange = props.onChange

    if (type == 'render')
        return (
            <div className="col m-1">
                <div className="row ">
                    <strong>{field['label']}</strong>
                    <input className='border border-1 rounded ml-2' size="25" value={fieldValue ?? 'حقل نصي'} disabled />
                </div>
            </div>

        );
    else if (type == 'input') {
        function changeValue(e) {
            setFieldValue(e.target.value)
            field['value'] = e.target.value
            onChange(field)
        }
        return (
            <div className="row p-3">
                <div className="col-6">
                    {field['label']}
                </div>
                <div className="col-6">
                    <input className='border border-1 rounded' size="25" onChange={changeValue} value={fieldValue ?? ''} />
                </div>
            </div>
        )
    }
}
