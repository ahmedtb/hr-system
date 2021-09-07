import React from 'react';

export default function EmailField(props) {
    const type = props.type
    const field = props.value
    const [fieldValue, setFieldValue] = React.useState(field['value'])

    const index = props.index
    const onChange = props.onChange

    if (type == 'render')
        return (
            <div className="col m-1">
                <div className="row flex-nowrap">
                    <strong className=''>{field['label']}</strong>
                    <input className='border border-dark rounded ml-2' value={field['value'] ?? 'حقل عنوان بريدي'} disabled />
                </div>
            </div>
        );
    else if (type == 'input') {

        function changeValue(e) {
            setFieldValue(e.target.value)
            field['value'] = e.target.value
            // console.log('email field input', field)
            onChange(field)
        }
        return (
            <div className="row p-3">
                <div className="col-6">
                    {field['label']}
                </div>
                <div className="col-6">
                    <input className='border border-dark rounded' type='email' size="25" onChange={changeValue} value={fieldValue ?? ''} />
                </div>
            </div>
        )
    }
}
