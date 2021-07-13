import React from 'react';
import ReactDOM from 'react-dom';


function GenderField(props) {
    const setField = props.setField
    const [label, setlabel] = React.useState('')
    let value = null

    function setConfig() {
        setField({
            class: "App\\FieldsTypes\\GenderField",
            label: label,
            value: value
        })
    }

    React.useEffect(() => {
        setConfig()
    }, [])
    return (

        <div className="text-center">
            <h6 className="row justify-content-center m-2">
                حقل تحديد الجنس
            </h6>
            <div className="row justify-content-center m-2">
                <div className="mr-2">
                    عنوان الحقل
                </div>
                <input className="rounded" onChange={(e) => { setlabel(e.target.value); setConfig(); }} />
            </div>
            <strong className="row justify-content-center m-2">{label}</strong>
            <div className="form-check">
                <input className="form-check-input" type="radio" disabled
                    checked={value == 'married'} />
                <label className="form-check-label">
                    ذكر
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio"
                    checked={value == 'single'} disabled />
                <label className="form-check-label">
                    انثى
                </label>
            </div>
        </div>
    );
}

export default GenderField;

