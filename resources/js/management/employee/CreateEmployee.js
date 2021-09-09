import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import { Redirect } from 'react-router'
import routes from '../utility/routesEndpoints'

export default function CreateEmployee() {
    const [jobs, setJobs] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.createEmployeeForm).then((response) => {
            setJobs(response.data.jobs)
        }).catch(() => {
        })
    }, [])

    const [name, setname] = React.useState([])
    const [address, setaddress] = React.useState([])
    const [employment_date, setemployment_date] = React.useState([])
    const [basic_salary, setbasic_salary] = React.useState([])
    const [phone_number, setphone_number] = React.useState([])
    const [job_id, setjob_id] = React.useState()
    const [email, setemail] = React.useState([])
    const [documents, setdocuments] = React.useState([])

    async function submit() {

        try {
            const data = new FormData()
            if (name) data.append('name', name)
            if (address) data.append('address', address)
            if (employment_date) data.append('employment_date', employment_date)
            if (basic_salary) data.append('basic_salary', basic_salary)
            if (phone_number) data.append('phone_number', phone_number)
            if (job_id) data.append('job_id', job_id)
            if (email) data.append('email', email)
            documents.forEach(image => {
                data.append('documents[]', image)
            });

            const res = await axios.post(ApiEndpoints.createEmployee, data)
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
            <h3 className="card-header">اضافة موظف</h3>

            <div className="card-body row">

                <div className="col-2 p-2 border rounded m-2 text-center">
                    <label className="">صورة الموظف</label>
                    <img height='100' onClick={()=>{}} src={'/css/profile.png'} />
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
                        <input className="col-8 form-control" value={phone_number} onChange={(e) => setphone_number(e.target.value)} name="phone_number" type="number" />
                    </div>

                    
                    
                    <div className="col-5 p-2 border rounded m-2 row">

                        <label className="col-4">الوظيفة</label>
                        <select className="col-8 form-control" onChange={(e) => setjob_id(e.target.value)} >
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

                    <div className="col-5 p-2 border rounded m-2 row">
                        <label className="col-4">ارفاق مستندات الموظف</label>
                        <input className="col-8 form-control" onChange={(e) => {
                            let array = []
                            for (var i = 0; i < e.target.files.length; i++) {
                                let file = e.target.files[i];
                                array.push(file);
                            }
                            console.log(array)
                            setdocuments(array)
                        }} type="file" accept="image/*" multiple />
                    </div>
                </div>
                <div className="col-12 p-2 m-2 d-flex justify-content-center">
                    <input onClick={submit} type="button" value="تسجيل" />
                </div>

            </div>
        </div>
    )
}