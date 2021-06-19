import React from 'react';
import ReactDOM from 'react-dom';


function RatingField(props) {
    const index = props.index
    const fieldindex = 'fields[' + index + ']'
    return (
        <>
            <input onChange={null} name={fieldindex + "[class]"} type="hidden" value="App\FieldsTypes\RatingField" />     
            rating field label <input name={fieldindex + "[label]"} />
            <input onChange={null} name={fieldindex + "[value]"} type="hidden" value='' />
        </>
    );
}

export default RatingField;

