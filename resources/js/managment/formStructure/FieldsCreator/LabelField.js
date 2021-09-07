import React from 'react';
import ReactDOM from 'react-dom';


function LabelField(props) {
    const setField = props.setField
    const [value, setvalue] = React.useState('')

    function setConfig() {
        setField({
            class: "App\\FieldsTypes\\LabelField",
            value: value
        })
    }

    React.useEffect(() => {
        setConfig()
    }, [label])

    return (
        <div className="text-center">
            <h6 className="row justify-content-center m-2">
                نص توضيحي
            </h6>
            <div className="row justify-content-center m-2">
                <div className="mr-2">
                    النص
                </div>
                <input className="rounded" onChange={(e) => { setvalue(e.target.value) }} />

            </div>
            <div className="col-12 m-1">
                <div className="row justify-content-center">
                    <h5>{value}</h5>
                </div>
            </div>
        </div>
    );
}

export default LabelField;

