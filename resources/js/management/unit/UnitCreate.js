import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import { Redirect } from 'react-router'
import routes from '../utility/routesEndpoints'

export default function JobCreate() {
    const [units, setunits] = React.useState([])
    const [employees, setemployees] = React.useState([])

    React.useEffect(() => {
        axios.get(ApiEndpoints.getUnits).then((response) => {
            setunits(response.data)
            // console.log(response.data)
        }).catch((err) => logError(err))
        axios.get(ApiEndpoints.getEmployees).then((response) => {
            setemployees(response.data)
            // console.log(response.data)
        }).catch((err) => logError(err))
    }, [])

    const [name, setname] = React.useState(null)
    const [parent_id, setparent_id] = React.useState(null)
    const [head_id, sethead_id] = React.useState(null)

    const [purpose, setpurpose] = React.useState(null)

    async function submit() {
        try {
            const data = {
                name: name, parent_id: parent_id,
                purpose: purpose,
                head_id: head_id
            }
            const res = await axios.post(ApiEndpoints.unitCreate, data)
            console.log(res.data)
            setredirect(true)
        } catch (error) {
            logError(error)
        }
    }

    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Redirect to={routes.dashboard} />;
    }
    return (
        <div className="card">
            <h4 className="card-header">انشاء وحدة ادارية جديدة</h4>

            <div className="card-body">
                <div className="row align-items-start justify-content-center">
                    <div className="col-2 p-2 border rounded m-2 text-center">
                        <label className="">اضافة صورة رمزية للوحدة</label>
                        <img height='100' onClick={() => { }} src={'/css/unitIcon.jpg'} />
                    </div>
                    <div className="col-10 row">

                        <div className="col-5 border rounded m-2 p-1">
                            <label >اختر رئيس الوحدة من الموظفيين</label>
                            <select className="form-control" onChange={(e) => sethead_id(e.target.value)} >
                                <option >قائمة الموظفيين</option>
                                {employees.map((employee, index) => (
                                    <option key={index} value={employee.id}>{employee.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-5 border rounded m-2 p-1">
                            <label >تسمية الوحدة الادارية</label>
                            <input className="form-control" onChange={(e) => setname(e.target.value)} type="text" />
                        </div>

                        <div className="col-5 border rounded m-2 p-1">
                            <label >الغرض من الوحدة الادارية</label>
                            <textarea className="form-control" onChange={(e) => setpurpose(e.target.value)} rows="4" cols="50" />
                        </div>


                        <div className="col-5 border rounded m-2 p-1">
                            <label >الوحدة الادارية التي تتبعها</label>
                            <select className="form-control" onChange={(e) => setparent_id(e.target.value)} >
                                <option >يجب اختيار الوحدة الادارية العليا</option>
                                {units.map((unit, index) => (
                                    <option key={index} value={unit.id}>{unit.name}</option>
                                ))}
                            </select>
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