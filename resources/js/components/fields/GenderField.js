import React from 'react';

export default function GenderField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange

    if (type == 'render')
        return (
            <>
                number field {field['label']}
                <div className="form-check">
                    <input className="form-check-input" type="radio" checked={field['value'] == 'male'} disabled />
                    <label className="form-check-label">
                        male
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" checked={field['value'] == 'female'} disabled />
                    <label className="form-check-label">
                        female
                    </label>
                </div>
            </>
        );
}
