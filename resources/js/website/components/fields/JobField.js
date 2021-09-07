import React from 'react';

export default function GenderField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange

    if (type == 'render')
        return (
            <div className="col m-1">
                <div className="row d-flex flex-nowrap">
                    <strong>
                        {field['label']}
                    </strong>
                    {
                        (field['value']) ?
                            <div className='p-1 border border-1 rounded  ml-2'>اسم الوظيفة المحدد افتراضيا {field['value']}</div>
                            :
                            <input className='border border-1 rounded  ml-2' size="25" value="حقل تحديد وظيفة" disabled />
                    }
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
