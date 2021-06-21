import React from 'react';
import ReactDOM from 'react-dom';


function LabelField(props) {
    const index = props.index
    const fieldindex = 'fields[' + index + ']'
    // const [value, setValue] = React.useState('')
    return (
        <>
            <input onChange={null} name={fieldindex + "[class]"} type="hidden" value="App\FieldsTypes\LabelField" />
            Label field <input name={fieldindex + "[value]"} />
            
        </>
    );
}

export default LabelField;

