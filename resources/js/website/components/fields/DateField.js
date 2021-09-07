import React from 'react';

export default function DateField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange

    if (type == 'render')
        return (
            <div className="col m-1">
                <div className="row flex-nowrap">
                    <h5>
                        {field['label']}
                    </h5>
                    <input type="date" value={field['value'] ?? 'حقل تاريخ'} disabled />
                </div>
            </div>

        );
    else if (type == 'input') {
        function changeValue(e) {
            field['value'] = e.target.value
            onChange(field)
        }
        return (
            <div className='col m-1'>
                <strong>
                    {field['label']}
                </strong>
                <input className='border border-dark rounded ml-2' type="date" onChange={changeValue} value={field['value'] ?? ''} />
            </div>
        )
    }
}
