import React from 'react';

export default function TextAreaField(props) {
    const type = props.type
    const field = props.value
    const [fieldValue, setFieldValue] = React.useState(field['value'])

    const index = props.index
    const onChange = props.onChange


    if (type == 'render')
        return (
            <div className="col-12 m-1">
                <h5>{field['label']}</h5>
                <textarea className='col-12 border border-dark rounded' rows='4' value={fieldValue ?? 'منطقة النص'} disabled />
            </div>
        );
    else if (type == 'input') {
        function changeValue(e) {
            setFieldValue(e.target.value)
            field['value'] = e.target.value
            onChange(field)
        }
        return (
            <div className="col-12 m-1">
                <h5>{field['label']}</h5>
                <textarea className='col-12 border border-dark rounded' rows='4' onChange={changeValue} value={fieldValue ?? ''}></textarea>
            </div>
        )
    }
}
