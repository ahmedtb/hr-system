import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../../utility/ApiEndpoints'
import logError from '../../utility/logError'
import CustomModal from '../../components/CustomModal'
import { Redirect } from 'react-router'

export default function EditEmployeeModal(props) {
    const employee = props.employee
    const change = props.change

    const [jobs, setJobs] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.createEmployeeForm).then((response) => {
            setJobs(response.data.jobs)
        }).catch((error) => { logError(error) })
    }, [])

    const [name, setname] = React.useState('')
    const [address, setaddress] = React.useState('')
    const [employment_date, setemployment_date] = React.useState('')
    const [basic_salary, setbasic_salary] = React.useState('')
    const [phone_number, setphone_number] = React.useState('')
    const [job_id, setjob_id] = React.useState('')
    const [email, setemail] = React.useState('')

    React.useEffect(() => {
        if (employee) {
            setname(employee?.name)
            setaddress(employee?.address);
            setemployment_date(employee?.employment_date);
            setbasic_salary(employee?.basic_salary);
            setphone_number(employee?.phone_number);
            setjob_id(employee?.job_id);
            setemail(employee?.email);
        }
    }, [employee])

    async function submit() {
        try {
            const res = await axios.put(ApiEndpoints.editEmployee.replace(':id', employee.id), {
                id: employee.id,
                name: name,
                address: address,
                employment_date: employment_date,
                basic_salary: basic_salary,
                phone_number: phone_number,
                job_id: job_id,
                email: email
            })
            console.log(res.data)
            change()
        } catch (error) {
            logError(error)
        }
    }

    return (
        <>
            <CustomModal buttonClass="btn btn-secondary" label={'تعديل ملف الموظف'}>

                <div className="row">
                    <div className="col-2 p-2 border rounded m-2 text-center">
                        <label className="">صورة الموظف</label>
                        <img height='100' onClick={() => { }} src={'/css/profile.png'} />
                    </div>

                    <div className="col-10 row">

                        <div className="col-5 p-2 border rounded m-2 row ">
                            <label className="col-4">اسم الموظف</label>
                            <input className="col-8 form-control" value={name} onChange={(e) => setname(e.target.value)} type="text" />
                        </div>
                        <div className="col-5 p-2 border rounded m-2 row">
                            <label className="col-4">عنوان الموظف</label>
                            <input className="col-8 form-control" value={address} onChange={(e) => setaddress(e.target.value)} type="text" />
                        </div>
                        <div className="col-5 p-2 border rounded m-2 row">
                            <label className="col-4">تاريخ التوظيف</label>
                            <input className="col-8 form-control" value={employment_date} onChange={(e) => setemployment_date(e.target.value)} type="date" />
                        </div>
                        <div className="col-5 p-2 border rounded m-2 row">
                            <label className="col-4">مرتب الموظف</label>
                            <input className="col-8 form-control" value={basic_salary} onChange={(e) => setbasic_salary(e.target.value)} type="number" />
                        </div>
                    </div>
                    <div className="col-12 row">

                        <div className="col-5 p-2 border rounded m-2 row">
                            <label className="col-4">رقم هاتف الموظف</label>
                            <input className="col-8 form-control" value={phone_number} onChange={(e) => setphone_number(e.target.value)} type="text" />
                        </div>



                        <div className="col-5 p-2 border rounded m-2 row">

                            <label className="col-4">الوظيفة</label>
                            <select className="col-8 form-control" value={job_id} onChange={(e) => setjob_id(e.target.value)} >
                                <option >نرجو اختيار نوع الوظيفة</option>

                                {
                                    jobs.map((job, index) => (
                                        <option key={index} value={job.id}>{job.name + '--' + job.unit.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col-5 p-2 border rounded m-2 row">
                            <label className="col-4">بريد الكتروني</label>
                            <input className="col-8 form-control" value={email} onChange={(e) => setemail(e.target.value)} type="email" name="email" />
                        </div>

                    </div>
                    <div className="col-12 p-2 m-2 d-flex justify-content-center">
                        <input onClick={submit} type="button" value="تعديل" />
                    </div>
                </div>

            </CustomModal>
        </>
    )
}