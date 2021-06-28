import React from 'react';
import ReactDOM from 'react-dom';


function RatingField(props) {
    const setField = props.setField
    let label = null
    let value = ''

    function setConfig() {
        setField({
            class: "App\FieldsTypes\RatingField",
            label: label,
            value: value
        })
    }
    React.useEffect(() => {
        setConfig()
    }, [])
    return (
        <>
            rating field label <input onChange={(e) => { label = e.target.value; setConfig(); }} />
            <input onChange={(e) => { value = e.target.value; setConfig(); }}  type="hidden" value='' />
        </>
    );
}

export default RatingField;

