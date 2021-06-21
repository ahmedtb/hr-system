import React from 'react';


function OptionsField(props) {
    const index = props.index
    const fieldindex = 'fields[' + index + ']'

    const [title, setTitle] = React.useState('')
    const [options, setOptions] = React.useState([])
    function addOption() {
        setOptions(old => [...old, title])
    }
    return (
        <>
            <input onChange={null} name={fieldindex + "[class]"} type="hidden" value="App\FieldsTypes\OptionsField" />
            <input onChange={null} name={fieldindex + "[value]"} type="hidden" value='' />

            options field label <input name={fieldindex + "[label]"} />
            <input onChange={null} name={fieldindex + "[options]"} type="hidden" value={options} />

            {
                options.map((option, index) => (
                    <>
                        <input onChange={null} name={fieldindex + "[options][" + index + "]"} type="hidden" value={option} />

                        <div key={index}>{option}</div>
                    </>
                ))
            }

            <input onChange={(e) => setTitle(e.target.value)} />
            <button type="button" onClick={addOption}>add option</button>
        </>
    );
}

export default OptionsField;

