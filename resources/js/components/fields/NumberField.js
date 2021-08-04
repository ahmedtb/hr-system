import React from 'react';

export default function NumberField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange

    if (type == 'render')
        return (
            <div className="col m-1">
                <div className="row flex-nowrap d-flex">
                    <strong>
                        {field['label']}
                    </strong>
                    <input className='border border-1 rounded ml-2' value={field['value']} disabled />
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
