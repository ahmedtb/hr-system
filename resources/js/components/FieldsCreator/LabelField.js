import React from 'react';
import ReactDOM from 'react-dom';


function LabelField(props) {
    const setField = props.setField
    let label = null
    let value = ''

    function setConfig() {
        setField({
            class: "App\\FieldsTypes\\LabelField",
            label: label,
            value: value
        })
    }

    React.useEffect(() => {
        setConfig()
    }, [])

    return (
        <>
            Label field <input onChange={(e) => { label = e.target.value; setConfig(); }} />
        </>
    );
}

export default LabelField;

