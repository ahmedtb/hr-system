import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'

export default function JobCreate() {
    const [units, setunits] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.getUnits).then((response) => {
            setunits(response.data)
            console.log(response.data)
        }).catch((err) => {
            logError(err)
        })
    }, [])

    const [name, setname] = React.useState(null)
    const [unit_id, setunit_id] = React.useState(null)
    const [purpose, setpurpose] = React.useState(null)
    const [description, setdescription] = React.useState(null)

    async function submit() {
        try {
            const data = {
                name: name, unit_id: unit_id,
                purpose: purpose, description: description,
            }
            const res = await axios.post(ApiEndpoints.jobCreate, data)
            console.log(res.data)
        } catch (error) {
            logError(error)
        }
    }

    return (
        <div className="card">
            <div className="card-header">تسجيل نوع وظايف جديد</div>

            <div className="card-body">
                <div className="row align-items-start justify-content-center">
                    <div className="col-2 p-2 border rounded m-2 text-center">
                        <label className="">اضافة صورة رمزية للوظيفة</label>
                        <img height='100' onClick={() => { }} src={'/css/jobIcon.png'} />
                    </div>
                    <div className="col-10 row">

                        <div className="col-5 border rounded m-2 p-1">
                            <label >تسمية الوظيفة</label>
                            <input className="form-control" onChange={(e) => setname(e.target.value)} type="text" />
                        </div>
                        <div className="col-5 border rounded m-2 p-1">
                            <label >الوحدة الادارية التي تتبعها</label>
                            <select className="form-control" onChange={(e) => setunit_id(e.target.value)} >
                                <option >نرجو اختيار الوحدة الادارية</option>
                                {units.map((unit, index) => (
                                    <option key={index} value={unit.id}>{unit.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-5 border rounded m-2 p-1">
                            <label >الغرض من الوظيفة</label>
                            <textarea className="form-control" onChange={(e) => setpurpose(e.target.value)} rows="4" cols="50" />
                        </div>
                        <div className="col-5 border rounded m-2 p-1">
                            <label>وصف الوظيفة</label>
                            <textarea className="form-control" onChange={(e) => setdescription(e.target.value)} rows="4" cols="50" />
                        </div>
                    </div>


                    <div className="col-12 d-flex justify-content-center">
                        <button onClick={submit} type="button" className="btn btn-success">
                            تسجيل
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}