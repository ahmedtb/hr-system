import React from 'react';
import ReactDOM from 'react-dom';


function StringField(props) {
    const setField = props.setField
    let label = null
    let value = ''

    function setConfig() {
        setField({
            class: "App\\FieldsTypes\\StringField",
            label: label,
            value: value
        })
    }
    React.useEffect(() => {
        setConfig()
    }, [])
    return (
        <>
            string Field <input onChange={(e) => { label = e.target.value; setConfig(); }} />
            <input onChange={(e) => { value = e.target.value; setConfig(); }} type="hidden" value='' />            
        </>
    );
}

export default StringField;

