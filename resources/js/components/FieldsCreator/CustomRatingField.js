import React from 'react';
import ReactDOM from 'react-dom';


function CustomRatingField(props) {
    const setField = props.setField
    const[label,setlabel] = React.useState('')
    const[max,setmax] = React.useState('')
    const[value,setvalue] = React.useState('')


    function setConfig() {
        setField({
            class: "App\\FieldsTypes\\CustomRatingField",
            label: label,
            max: max,
            value: value
        })
    }
    React.useEffect(() => {
        setConfig()
    }, [label,max,value])
    return (
        <>
            custom rating field label <input onChange={(e) => { setlabel(e.target.value) }} />
            custom rating field max rating <input type="number" onChange={(e) => { setmax(e.target.value) }} />

            <input onChange={(e) => {  setvalue(e.target.value) }}  type="hidden" value='' />
        </>
    );
}

export default CustomRatingField;

