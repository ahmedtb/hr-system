import React from 'react';
import ReactDOM from 'react-dom';


function PhoneNumberField(props) {
    const setField = props.setField
    let label = null
    let value = ''

    function setConfig() {
        setField({
            class: "App\FieldsTypes\PhoneNumberField",
            label: label,
            value: value
        })
    }

    React.useEffect(() => {
        setConfig()
    }, [])
    return (
        <>
            phone number field label <input onChange={(e) => { label = e.target.value; setConfig(); }} />
            <input onChange={(e) => { value = e.target.value; setConfig(); }} type="hidden" value='' />
        </>
    );
}

export default PhoneNumberField;

