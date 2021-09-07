import React from 'react';

export default function GenderField(props) {
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
                </div>
            </div>
        );
    else if (type == 'input') {
        function changeValue(value) {
            field['value'] = value
            onChange(field)
        }
        return (
            <div className="col m-1">
                <div className="d-flex flex-row flex-nowrap">
                    <h5>
                        {field['label']}
                    </h5>
                    <div className="col ml-3">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" onChange={() => changeValue('male')} checked={field['value'] == 'male'} />
                            <label className="form-check-label">
                                ذكر
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" onChange={() => changeValue('female')} checked={field['value'] == 'female'} />
                            <label className="form-check-label">
                                انثى
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
