import React from 'react';

export default function GenderField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange

    if (type == 'render')
        return (
            <div class="row p-3">
                <div class="col-6">
                    حقل تحديد نوع الوظيفة بعنوان: {field['label']}
                </div>
                <div class="col-6">
                    {

                        (field['value']) ?
                            <div class='p-1 border border-1 rounded'>اسم الوظيفة المحدد افتراضيا {field['value']}</div>
                            :
                            <input class='border border-1 rounded' size="25" value="" disabled />
                    }
                </div>
            </div>
        );
}
