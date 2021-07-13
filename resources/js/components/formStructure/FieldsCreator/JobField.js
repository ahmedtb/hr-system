import React from 'react';


function JobField(props) {
    const setField = props.setField
    const [label, setlabel] = React.useState('')
    let value = null

    function setConfig() {
        setField({
            class: "App\\FieldsTypes\\JobField",
            label: label,
            value: value
        })
    }

    React.useEffect(() => {
        setConfig()
    }, [])
    return (
        <div className="text-center">
            <h6 className="row justify-content-center m-2">
                حقل تحديد الوظيفة
            </h6>
            <div className="row justify-content-center m-2">
                <div className="mr-2">
                    عنوان الحقل
                </div>
                <input className="rounded" onChange={(e) => { setlabel(e.target.value); setConfig(); }} />
            </div>
            <strong className="row justify-content-center m-2">{label}</strong>
            <div className="row justify-content-center m-2">

                <label className="mr-2">الوظيفة</label>
                <select className="col-4" disabled >
                    <option >نرجو اختيار نوع الوظيفة</option>
                    <option >aaaaaaaaaaaa</option>
                </select>
            </div>
        </div>
    );
}

export default JobField;

