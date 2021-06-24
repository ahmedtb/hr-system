import React from 'react';

export default function OptionsField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange
    // console.log(field['options'])

    if (type == 'render')
        return (
            <div className="row p-3">
                <div className="col-6">
                    حقل اختياري بعنوان: {field['label']}
                </div>

                <div className="col-6">
                    {
                        field['options'].map((option, k) => (
                            <div key={k} className="form-check">
                                <input className="form-check-input" type="radio" disabled
                                    checked={field['value'] == option}
                                />
                                <label className="form-check-label">
                                    {option}
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    else if (type == 'input') {
        function changeValue(value) {
            field['value'] = value
            onChange(field)
        }
        return (
            <div className="row p-3">
                <div className="col-6">
                    حقل اختياري بعنوان: {field['label']}
                </div>
                <div className="col-6">
                    {
                        field['options'].map((option, index) => (
                            <div key={index} className="form-check">
                                <input className="form-check-input" type="radio"
                                    checked={field['value'] == option}
                                    onChange={() => changeValue(option)}
                                />
                                <label className="form-check-label">
                                    {option }
                                </label>
                            </div>
                        ))
                    }
                </div>

            </div>
        )
    }
}
