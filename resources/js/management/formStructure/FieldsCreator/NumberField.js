import React from 'react';
import ReactDOM from 'react-dom';


function NumberField(props) {
    const setField = props.setField
    const [label, setlabel] = React.useState('')
    let value = ''

    function setConfig() {
        setField({
            class: "App\\FieldsTypes\\NumberField",
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
                حقل عددي
            </h6>
            <div className="row justify-content-center m-2">
                <div className="mr-2">
                    عنوان الحقل
                </div>
                <input className="rounded" onChange={(e) => { setlabel(e.target.value) }} />
            </div>
            <strong className="row justify-content-center m-2">{label}</strong>
            <input size="40" placeholder="حقل عددي" disabled />
        </div>



    );
}

export default NumberField;

