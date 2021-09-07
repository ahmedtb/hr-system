import React from 'react';


function OptionsField(props) {
    const setField = props.setField

    const [label, setlabel] = React.useState('')
    const [value, setvalue] = React.useState('')
    const [options, setOptions] = React.useState([])

    const [title, settitle] = React.useState('')
    function addOption() {
        setOptions(pre => [...pre, title])
    }

    React.useEffect(() => {
        setConfig()
    }, [options, value, label])

    function setConfig() {
        setField({
            class: "App\\FieldsTypes\\OptionsField",
            label: label,
            options: options,
            value: value
        })
    }


    return (

        <div className="text-center">
            <h6 className="row justify-content-center m-2">
                حقل اختيارات
            </h6>
            
            <div className="row justify-content-center m-2">
                <div className="mr-2">
                    عنوان الحقل
                </div>
                <input className="rounded" onChange={(e) => { setlabel(e.target.value) }} />
            </div>

            <strong className="row justify-content-center m-2">{label}</strong>

            {
                options.map((option, index) => (
                    <div key={index} className='row mx-auto w-auto'>
                        <input className="form-check-input col-1" type="radio" disabled />
                        <label className="form-check-label col-5">
                            {option}
                        </label>
                    </div>
                ))
            }

            <input onChange={(e) => settitle(e.target.value)} />
            <button type="button" onClick={addOption}>add option</button>
        </div>

    );
}

export default OptionsField;

