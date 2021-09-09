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
                <strong>{field['label']}</strong>
                <textarea className='col-12 border border-1 rounded' rows='4' value={fieldValue ?? 'منطقة النص'} disabled />
            </div>
        );
    else if (type == 'input') {
        function changeValue(e) {
            setFieldValue(e.target.value)
            field['value'] = e.target.value
            onChange(field)
        }
        return (
            <>
                tabel area input: {field['label']}
                <textarea onChange={changeValue} value={fieldValue ?? ''} rows="5"></textarea>
            </>
        )
    }
}
