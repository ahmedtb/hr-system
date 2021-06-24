import React from 'react';

export default function EmailField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange

    if (type == 'render')
        return (
            <>
                email field {field['label']}
                <div class='p-2 border border-1 rounded'>{field['value']}</div>
            </>
        );
}
