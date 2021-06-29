import React from 'react';


function OptionsField(props) {
    const setField = props.setField
    
    const [label, setlabel] = React.useState('')
    const [value, setvalue] = React.useState('')
    const [options, setOptions] = React.useState([])

    const [title, settitle] = React.useState('')
    function addOption() {
        setOptions(pre => [...pre, title])
    }

    React.useEffect(() => {
        setConfig()
    }, [options, value, label])
    
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
            <input onChange={(e) => { setvalue(e.target.value); }} type="hidden" value='' />

            options field label <input onChange={(e) => { setlabel(e.target.value); }} />

            {
                options.map((option, index) => (
                    <div key={index}>{option}</div>
                ))
            }

            <input onChange={(e) => settitle(e.target.value)} />
            <button type="button" onClick={addOption}>add option</button>
        </>
    );
}

export default OptionsField;

