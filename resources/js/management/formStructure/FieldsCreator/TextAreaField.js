import React from 'react';
import ReactDOM from 'react-dom';


function TextAreaField(props) {
    const setField = props.setField
    const [label, setlable] = React.useState(null)
    let value = ''

    function setConfig() {
        setField({
            class: "App\\FieldsTypes\\TextAreaField",
            label: label,
            value: value
        })
    }

    React.useEffect(() => {
        setConfig()
    }, [label])

    return (
        <div className="text-center">
            {/* <input onChange={(e) => { value = e.target.value; setConfig(); }} type="hidden" value='' /> */}
            <h6 className="row justify-content-center m-2">
                حقل نصي طويل
            </h6>
            <div className="row justify-content-center m-2">
                عنوان الحقل
                <input onChange={(e) => { setlable(e.target.value); setConfig(); }} />
            </div>
            <strong className="row justify-content-center m-2">{label}</strong>
            <textarea className='border border-1 rounded' rows='4' cols='50' disabled />
        </div>
    );
}

export default TextAreaField;

