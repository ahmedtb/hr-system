import React from 'react';

export default function OptionsField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange
    // console.log(field['options'])

    if (type == 'render')
        return (
            <div className="col m-2">
                <div className="row flex-nowrap">
                    <h5>
                        {field['label']}
                    </h5>

                    <div className="ml-2">
                        {
                            field['options'].map((option, k) => (
                                <div key={k} >
                                    <input type="radio" disabled
                                        checked={field['value'] == option}
                                    />
                                    <label className="ml-2">
                                        {option}
                                    </label>
                                </div>
                            ))
                        }
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
            <div className="col m-2">
                <div className="row flex-nowrap">
                    <h5>
                        {field['label']}
                    </h5>
                    <div className="col ml-3">
                        {
                            field['options'].map((option, index) => (
                                <div key={index} className="form-check">
                                    <input className="form-check-input" type="radio"
                                        checked={field['value'] == option}
                                        onChange={() => changeValue(option)}
                                    />
                                    <label className="form-check-label">
                                        {option}
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}
