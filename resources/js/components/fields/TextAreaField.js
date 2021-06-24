import React from 'react';

export default function TextAreaField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange


    if (type == 'render')
        return (
            <>
                {field['label']}
                <div className='p-5 border border-1 rounded'>{field['value']}</div>
            </>
        );
    else if (type == 'input'){
        function changeValue(e){
            field['value'] = e.target.value
            onChange(field)
        }
        return (
            <>
                tabel area input: {field['label']}
                <textarea onChange={changeValue} value={field['value']??''} rows="5"></textarea>
            </>
        )
    }
}
