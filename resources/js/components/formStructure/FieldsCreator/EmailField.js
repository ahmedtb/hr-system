import React from 'react';
import ReactDOM from 'react-dom';


function EmailField(props) {
    const setField = props.setField
    const [label, setlabel] = React.useState('')
    let value = null

    function setConfig() {
        setField({
            class: "App\\FieldsTypes\\EmailField",
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
                حقل بريد الكتروني
            </h6>
            <div className="row justify-content-center m-2">
                <div className="mr-2">
                    عنوان الحقل
                </div>
                <input className="rounded" onChange={(e) => { setlabel(e.target.value); setConfig(); }} />
            </div>
            <strong className="row justify-content-center m-2">{label}</strong>
            <input size="30" placeholder="حقل بريد الكتروني" disabled />
        </div>
    );
}

export default EmailField;

