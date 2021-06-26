import React from 'react';

export default function StringField(props) {
    const type = props.type
    const field = props.value
    const [fieldValue, setFieldValue] = React.useState(field['value'])
    const index = props.index
    const onChange = props.onChange

    if (type == 'render')
        return (
            <div className="row p-3">
                <div className="col-6">
                    حقل نص عادي بعنوان: {field['label']}
                </div>
                <div className="col-6">
                    <input className='border border-1 rounded' size="25" value={fieldValue ?? ''} disabled />
                </div>
            </div>

        );
    else if (type == 'input'){
        function changeValue(e){
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
