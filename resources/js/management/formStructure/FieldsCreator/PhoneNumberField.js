import React from 'react';
import ReactDOM from 'react-dom';


function PhoneNumberField(props) {
    const setField = props.setField
    const [label, setlabel] = React.useState('')
    let value = ''

    function setConfig() {
        setField({
            class: "App\\FieldsTypes\\PhoneNumberField",
            label: label,
            value: value
        })
    }

    React.useEffect(() => {
        setConfig()
    }, [label])
    return (
        <div className="text-center">
            <h6 className="row justify-content-center m-2">
                حقل رقم هاتف
            </h6>
            <div className="row justify-content-center m-2">
                <div className="mr-2">
                    عنوان الحقل
                </div>
                <input className="rounded" onChange={(e) => { setlabel(e.target.value) }} />
            </div>
            <strong className="row justify-content-center m-2">{label}</strong>
            <input size="40" placeholder="حقل رقم هاتف" onChange={(e) => { value = e.target.value; setConfig(); }} disabled />
        </div>
    );
}

export default PhoneNumberField;

