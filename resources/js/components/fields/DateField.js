import React from 'react';

export default function DateField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange

    if (type == 'render')
        return (
            <div className='row'>
                {field['label']}
                <input type="date" value={field['value']} disabled />
            </div>
        );
}
