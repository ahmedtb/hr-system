import React from 'react';


function JobField(props) {
    const setField = props.setField
    let label = null
    let value = null

    function setConfig() {
        setField({
            class: "App\\FieldsTypes\\JobField",
            label: label,
            value: value
        })
    }

    React.useEffect(() => {
        setConfig()
    }, [])
    return (
        <>
            Job field render <input onChange={(e) => { label = e.target.value; setConfig(); }} />
            <input onChange={(e) => { value = e.target.value; setConfig(); }} type="hidden" value='' />
            
        </>
    );
}

export default JobField;

