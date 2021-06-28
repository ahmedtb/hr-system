import React from 'react';
import ReactDOM from 'react-dom';


function GenderField(props) {
    const setField = props.setField
    let label = null
    let value = null

    function setConfig() {
        setField({
            class: "App\FieldsTypes\GenderField",
            label: label,
            value: value
        })
    }

    React.useEffect(() => {
        setConfig()
    }, [])
    return (
        <>
            gender field label <input onChange={(e) => { label = e.target.value; setConfig(); }} />
            <input onChange={(e) => { value = e.target.value; setConfig(); }} type="hidden" value='' />

        </>
    );
}

export default GenderField;

