import React from 'react';


function DateField(props) {
    const index = props.index
    const fieldindex = 'fields[' + index + ']'
    return (
        <>
            <input onChange={null} name={fieldindex + "[class]"} type="hidden" value="App\FieldsTypes\DateField" />
            date field <input name={fieldindex + "[label]"} />
            <input onChange={null} name={fieldindex + "[value]"} type="hidden" value='' />
            
        </>
    );
}

export default DateField;

