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
                    <h5>{field['label']}</h5>
                    <input className='border border-dark rounded lm-2' value={field['value'] ?? 'حقل عدد مركب'} disabled />
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
