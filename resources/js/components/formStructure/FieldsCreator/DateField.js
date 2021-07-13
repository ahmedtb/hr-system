import React from 'react';


function DateField(props) {
    const setField = props.setField
    const [label, setlabel] = React.useState('')
    let value = null

    function setConfig() {
        setField({
            class: "App\\FieldsTypes\\DateField",
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
                حقل تاريخ
            </h6>
            <div className="row justify-content-center m-2">
                <div className="mr-2">
                    عنوان الحقل
                </div>
                <input className="rounded" onChange={(e) => { setlabel(e.target.value); setConfig(); }} />
            </div>
            <strong className="row justify-content-center m-2">{label}</strong>
            <input size="40" placeholder="حقل تاريخ" disabled />
        </div>
    );
}

export default DateField;

