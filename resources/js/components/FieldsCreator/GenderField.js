import React from 'react';
import ReactDOM from 'react-dom';


function GenderField(props) {
    const index = props.index
    const fieldindex = 'fields[' + index + ']'
    // const [value, setValue] = React.useState('')
    return (
        <>
            <input onChange={null} name={fieldindex + "[class]"} type="hidden" value="App\FieldsTypes\GenderField" />
            gender field label <input name={fieldindex + "[label]"} />
            <input onChange={null} name={fieldindex + "[value]"} type="hidden" value='' />
            
        </>
    );
}

export default GenderField;

