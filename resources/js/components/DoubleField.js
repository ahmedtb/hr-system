import React from 'react';

function DoubleField(props) {
    const index = props.index
    const fieldindex = 'fields[' + index + ']'
    // const [value, setValue] = React.useState('')
    return (
        <>
            <input onChange={null} name={fieldindex + "[class]"} type="hidden" value="App\FieldsTypes\DoubleField" />
            double field render <input name={fieldindex + "[label]"} />
            <input onChange={null} name={fieldindex + "[value]"} type="hidden" value='' />
            
        </>
    );
}

export default DoubleField;

