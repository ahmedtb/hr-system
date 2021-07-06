import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'

export default function JobCreate() {
    const [units, setunits] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.unitIndex).then((response) => {
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
                <ul className="list-group">
                    <li className="list-group-item">
                        <label >تسمية الوظيفة</label>
                        <input onChange={(e) => setname(e.target.value)} type="text" />
                    </li>

                    <li className="list-group-item">
                        <label >الغرض من الوظيفة</label>
                        <textarea  onChange={(e) => setpurpose(e.target.value)} rows="4" cols="50" />
                    </li>
                    <li className="list-group-item">
                        <label>وصف الوظيفة</label>
                        <textarea onChange={(e) => setdescription(e.target.value)} rows="4" cols="50" />
                    </li>

                    <li className="list-group-item">
                        <label >الوحدة الادارية التي تتبعها</label>
                        <select onChange={(e) => setunit_id(e.target.value)} >
                            <option >نرجو اختيار الوحدة الادارية</option>
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