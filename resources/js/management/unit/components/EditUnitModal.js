import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../../utility/ApiEndpoints'
import logError from '../../utility/logError'
import CustomModal from '../../components/CustomModal'
import { Redirect } from 'react-router'

export default function EditUnitModal(props) {
    const unit = props.unit
    const change = props.change

    const [units, setunits] = React.useState([])
    const [employees, setemployees] = React.useState([])

    React.useEffect(() => {
        axios.get(ApiEndpoints.getUnits).then((response) => {
            setunits(response.data)
        }).catch((error) => { logError(error) })
        axios.get(ApiEndpoints.getEmployees).then((response) => {
            setemployees(response.data)
        }).catch((error) => { logError(error) })
    }, [])

    const [parent_id, setparent_id] = React.useState('')
    const [name, setname] = React.useState('')
    const [head_id, sethead_id] = React.useState('')
    const [purpose, setpurpose] = React.useState('')

    React.useEffect(() => {
        if (unit) {
            setparent_id(unit?.parent_id)
            setname(unit?.name);
            sethead_id(unit?.head_id);
            setpurpose(unit?.purpose);
        }
    }, [unit])

    async function submit() {
        try {
            const res = await ApiEndpoints.editUnit(unit.id, parent_id, name, head_id, purpose)
            console.log(res.data)
            change()
        } catch (error) {
            logError(error)
        }
    }

    return (
        <>
            <CustomModal buttonClass="btn btn-secondary" label={'تعديل الوحدة'}>

                <div className="row align-items-start justify-content-center">
                    <div className="col-2 p-2 border rounded m-2 text-center">
                        <label className="">اضافة صورة رمزية للوحدة</label>
                        <img height='100' onClick={() => { }} src={'/css/unitIcon.jpg'} />
                    </div>
                    <div className="col-10 row">

                        <div className="col-5 border rounded m-2 p-1">
                            <label >اختر رئيس الوحدة من الموظفيين</label>
                            <select className="form-control" value={head_id ?? ''} onChange={(e) => sethead_id(e.target.value)} >
                                <option >قائمة الموظفيين</option>
                                {employees.map((employee, index) => (
                                    <option key={index} value={employee.id}>{employee.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-5 border rounded m-2 p-1">
                            <label >تسمية الوحدة الادارية</label>
                            <input className="form-control" value={name ?? ''} onChange={(e) => setname(e.target.value)} type="text" />
                        </div>

                        <div className="col-5 border rounded m-2 p-1">
                            <label >الغرض من الوحدة الادارية</label>
                            <textarea className="form-control" value={purpose ?? ''} onChange={(e) => setpurpose(e.target.value)} rows="4" cols="50" />
                        </div>


                        <div className="col-5 border rounded m-2 p-1">
                            <label >الوحدة الادارية التي تتبعها</label>
                            <select className="form-control" value={parent_id ?? ''} onChange={(e) => setparent_id(e.target.value)} >
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

            </CustomModal>
        </>
    )
}