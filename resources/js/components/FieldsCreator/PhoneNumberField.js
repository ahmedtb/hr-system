import React from 'react';
import ReactDOM from 'react-dom';


function PhoneNumberField(props) {
    const index = props.index
    const fieldindex = 'fields[' + index + ']'
    return (
        <>
            <input onChange={null} name={fieldindex + "[class]"} type="hidden" value="App\FieldsTypes\PhoneNumberField" />     
            phone number field label <input name={fieldindex + "[label]"} />
            <input onChange={null} name={fieldindex + "[value]"} type="hidden" value='' />
        </>
    );
}

export default PhoneNumberField;

