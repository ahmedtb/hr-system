import React from 'react';


function DateField(props) {
    const setField = props.setField
    let label = null
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
        <>
            date field <input onChange={(e) => { label = e.target.value; setConfig(); }}  />
            <input onChange={(e) => { value = e.target.value; setConfig(); }}  type="hidden" value='' />
            
        </>
    );
}

export default DateField;

