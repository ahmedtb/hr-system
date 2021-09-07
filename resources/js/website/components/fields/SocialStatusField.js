import React from 'react';

export default function SocialStatusField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange

    if (type == 'render')
        return (
            <div className="col m-1">
                <strong>
                    {field['label']}
                </strong>
                <div className="col m-1">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" disabled
                            checked={field['value'] == 'married'} />
                        <label className="form-check-label">
                            married
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio"
                            checked={field['value'] == 'single'} disabled />
                        <label className="form-check-label">
                            single
                        </label>
                    </div>
                </div>
            </div>
        );
    else if (type == 'input') {
        function changeValue(value) {
            field['value'] = value
            onChange(field)
        }
        return (
            <>
                social status: {field['label']}
                <div className="form-check">
                    <input className="form-check-input" type="radio" onChange={() => changeValue('married')}
                        checked={field['value'] == 'married'} />
                    <label className="form-check-label">
                        married
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio"
                        checked={field['value'] == 'single'} onChange={() => changeValue('single')} />
                    <label className="form-check-label">
                        single
                    </label>
                </div>
            </>
        )
    }

}
