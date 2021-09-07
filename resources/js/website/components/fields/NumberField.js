import React from 'react';

export default function NumberField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange

    if (type == 'render')
        return (
            <div className="col m-1">
                <div className="d-flex flex-row flex-nowrap">
                    <h5>
                        {field['label']}
                    </h5>
                    <input className='border border-dark rounded ml-2' value={field['value']} disabled />
                </div>
            </div>
        );
    else if (type == 'input') {


        function changeValue(value) {
            field['value'] = value
            onChange(field)
        }
        return (
            <div className="col m-1">
                <div className='d-flex flex-row flex-nowrap'>
                    <h5>
                        {field['label']}
                    </h5>
                    <input className='border border-dark rounded ml-2' type='number' value={field['value']} onChange={(e) => changeValue(e.target.value)}/>
                </div>
            </div>
        )
    }
}
