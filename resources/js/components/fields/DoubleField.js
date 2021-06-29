import React from 'react';

export default function DoubleField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange

    if (type == 'render')
        return (
            <div className="col m-1">
                <div className="row flex-nowrap">
                    <strong>{field['label']}</strong>
                    <input class='border border-1 rounded lm-2' value={field['value'] ?? 'حقل عدد مركب'} disabled />
                </div>
            </div>

        );
    else if (type == 'input')
        return (
            <div className='row'>
                {field['class']}
            </div>
        )
}
