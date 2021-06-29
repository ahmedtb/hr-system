import React from 'react';
import ReactDOM from 'react-dom';


function LabelField(props) {
    const setField = props.setField
    let value = ''

    function setConfig() {
        setField({
            class: "App\\FieldsTypes\\LabelField",
            value: value
        })
    }

    React.useEffect(() => {
        setConfig()
    }, [])

    return (
        <>
            Label field <input onChange={(e) => { value = e.target.value; setConfig(); }} />
        </>
    );
}

export default LabelField;

