import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'

export default function JobCreate() {
    const [units, setunits] = React.useState([])
    const [employees, setemployees] = React.useState([])

    React.useEffect(() => {
        axios.get(ApiEndpoints.unitIndex).then((response) => {
            setunits(response.data)
            console.log(response.data)
        }).catch((err) => logError(err))
        axios.get(ApiEndpoints.employeeIndex).then((response) => {
            setemployees(response.data)
            console.log(response.data)
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
        } catch (error) {
            logError(error)
        }
    }

    return (
        <div className="card">
            <div className="card-header">انشاء وحدة ادارية جديدة</div>

            <div className="card-body">
                <ul className="list-group">

                <li className="list-group-item">
                        <label >اختر رئيس الوحدة من الموظفيين</label>
                        <select onChange={(e) => sethead_id(e.target.value)} >
                            <option >قائمة الموظفيين</option>
                            {employees.map((employee, index) => (
                                <option key={index} value={employee.id}>{employee.name}</option>
                            ))}
                        </select>
                    </li>

                    <li className="list-group-item">
                        <label >تسمية الوحدة الادارية</label>
                        <input onChange={(e) => setname(e.target.value)} type="text" />
                    </li>

                    <li className="list-group-item">
                        <label >الغرض من الوحدة الادارية</label>
                        <textarea onChange={(e) => setpurpose(e.target.value)} rows="4" cols="50" />
                    </li>


                    <li className="list-group-item">
                        <label >الوحدة الادارية التي تتبعها</label>
                        <select onChange={(e) => setparent_id(e.target.value)} >
                            <option >يجب اختيار الوحدة الادارية العليا</option>
                            {units.map((unit, index) => (
                                <option key={index} value={unit.id}>{unit.name}</option>
                            ))}
                        </select>
                    </li>


                    <li className="list-group-item">
                        <input onClick={submit} type="button" value="تسجيل" />
                    </li>

                </ul>
            </div>
        </div>
    )
}