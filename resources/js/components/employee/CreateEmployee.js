import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'

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
                data.append('documents[]',image)
            });

            const res = await axios.post(ApiEndpoints.createEmployee, data)
            console.log(res.data)
        } catch (error) {
            logError(error)
        }
    }

    return (
        <div className="card">
            <div className="card-header">اضافة موظف</div>

            <div className="card-body">
                <ul className="list-group">
                    <li className="list-group-item">
                        <label htmlFor="name">اسم الموظف</label>
                        <input value={name} onChange={(e) => setname(e.target.value)} name="name" type="text" id="name" />
                    </li>
                    <li className="list-group-item">
                        <label htmlFor="address">عنوان الموظف</label>
                        <input value={address} onChange={(e) => setaddress(e.target.value)} name="address" type="text" id="address" />
                    </li>
                    <li className="list-group-item">
                        <label htmlFor="employment_date">تاريخ التوظيف</label>
                        <input value={employment_date} onChange={(e) => setemployment_date(e.target.value)} name="employment_date" type="date" id="employment_date" />
                    </li>
                    <li className="list-group-item">
                        <label htmlFor="basic_salary">مرتب الموظف</label>
                        <input value={basic_salary} onChange={(e) => setbasic_salary(e.target.value)} name="basic_salary" type="number" id="basic_salary" />
                    </li>
                    <li className="list-group-item">
                        <label htmlFor="phone_number">رقم هاتف الموظف</label>
                        <input value={phone_number} onChange={(e) => setphone_number(e.target.value)} name="phone_number" type="number" id="phone_number" />
                    </li>
                    <li className="list-group-item">
                        <label htmlFor="job_id">الوظيفة</label>
                        <select onChange={(e) => setjob_id(e.target.value)} id="job_id" name="job_id">
                            <option >نرجو اختيار نوع الوظيفة</option>

                            {
                                jobs.map((job, index) => (
                                    <option key={index} value={job.id}>{job.name + '--' + job.unit.name}</option>
                                ))
                            }
                        </select>
                    </li>

                    <li className="list-group-item">
                        <label htmlFor="email">بريد الكتروني</label>
                        <input value={email} onChange={(e) => setemail(e.target.value)} name="email" type="email" id="email" />
                    </li>
                    <li className="list-group-item">
                        <label htmlFor="documents[]">مستندات الموظف</label>
                        <input onChange={(e) => {
                            let array = []
                            for( var i = 0; i < e.target.files.length; i++ ){
                                let file = e.target.files[i];
                                array.push(file);
                            }
                            console.log(array)
                            setdocuments(array)
                        }} name="documents[]" type="file" accept="image/*" multiple id="documents[]" />
                    </li>
                    <li className="list-group-item">
                        <input onClick={submit} type="button" value="تسجيل" />
                    </li>

                </ul>
            </div>
        </div>
    )
}