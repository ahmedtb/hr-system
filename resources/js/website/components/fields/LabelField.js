import React from 'react';

export default function LabelField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange
    // console.log(field['options'])

    if (type == 'render')
        return (

            <div className="col-12 m-1">
                <div className="row justify-content-center">
                    <h5>
                        {field['value']}
                    </h5>
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
