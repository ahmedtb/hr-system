import React from 'react';

export default function PhoneNumberField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange

    if (type == 'render')
        return (
            <>
                <div class="row p-3">
                    <div class="col-6">
                        حقل رقم هاتف بعنوان: {field['label']}
                    </div>
                    <div class="col-6">
                        <input class='border border-1 rounded' size="25" value={field['value']} disabled />
                    </div>
                </div>
            </>
        );
}
