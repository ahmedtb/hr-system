import React from 'react';

export default function NumberField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange

    if (type == 'render')
        return (
            <div class="row p-3">
                <div class="col-6">
                    حقل عددي بعنوان: {field['label']}
                </div>
                <div class="col-6">
                    <input class='border border-1 rounded' size="25" value={field['value']} disabled />
                </div>
            </div>
        );
}
