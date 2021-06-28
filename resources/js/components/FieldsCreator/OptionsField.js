import React from 'react';


function OptionsField(props) {
    const setField = props.setField
    let label = null
    let value = ''
    let title = ''
    // const [title, setTitle] = React.useState('')
    const [options, setOptions] = React.useState([])
    function addOption() {
        setOptions(pre => [...pre, title])
    }

    React.useEffect(() => {
        setConfig()
    }, [options])
    
    function setConfig() {
        setField({
            class: "App\\FieldsTypes\\OptionsField",
            label: label,
            options: options,
            value: value
        })
    }


    return (
        <>
            <input onChange={(e) => { value = e.target.value; setConfig(); }} type="hidden" value='' />

            options field label <input onChange={(e) => { label = e.target.value; setConfig(); }} />

            {
                options.map((option, index) => (
                    <div key={index}>{option}</div>
                ))
            }

            <input onChange={(e) => title = (e.target.value)} />
            <button type="button" onClick={addOption}>add option</button>
        </>
    );
}

export default OptionsField;

