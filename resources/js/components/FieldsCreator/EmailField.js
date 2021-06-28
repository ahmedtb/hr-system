import React from 'react';
import ReactDOM from 'react-dom';


function EmailField(props) {
    const setField = props.setField
    let label = null
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
        <>
            email field render <input onChange={(e) => { label = e.target.value; setConfig(); }} />
            <input onChange={(e) => { value = e.target.value; setConfig(); }} type="hidden" value='' />
        </>
    );
}

export default EmailField;

