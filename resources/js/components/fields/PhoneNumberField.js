import React from 'react';

export default function PhoneNumberField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange

    if (type == 'render')
        return (
            <>
                <div className="row p-3">
                    <div className="col-6">
                        حقل رقم هاتف بعنوان: {field['label']}
                    </div>
                    <div className="col-6">
                        <input className='border border-1 rounded' size="25" value={field['value'] ?? ''} disabled />
                    </div>
                </div>
            </>
        );
        else if (type == 'input'){
            function changeValue(e){
                field['value'] = e.target.value
                onChange(field)
            }
            return (
                <div className="row p-3">
                    <div className="col-6">
                        {field['label']}
                    </div>
                    <div className="col-6">
                        <input className='border border-1 rounded' size="25" onChange={changeValue} type="number" value={field['value'] ?? ''} />
                    </div>
                </div>
            )
        }
}
