import React from 'react';

export default function LabelField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange
    // console.log(field['options'])

    if (type == 'render')
        return (

            <div class="row p-3">
                <div class="col-6">
                    نص ارشادي: {field['value']}
                </div>

            </div>
        );
}
