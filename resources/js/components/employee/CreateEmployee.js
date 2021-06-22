import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'

export default function CreateEmployee() {
    const [jobs, setJobs] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.createEmployeeForm).then((response) => {
            setJobs(response.data.jobs)
        }).catch(() => {
        })
    }, [])
    return (
        <div className="card">
            <div className="card-header">اضافة موظف</div>

            <div className="card-body">
                <form method="POST" action={ApiEndpoints.createEmployee} acceptCharset="UTF-8">
                    <input type="hidden" name="_token" value={csrf_token} />

                    <ul className="list-group">
                        <li className="list-group-item">
                            <label for="name">اسم الموظف</label>
                            <input name="name" type="text" id="name" />
                        </li>
                        <li className="list-group-item">
                            <label for="address">عنوان الموظف</label>
                            <input name="address" type="text" id="address" />
                        </li>
                        <li className="list-group-item">
                            <label for="employment_date">تاريخ التوظيف</label>
                            <input name="employment_date" type="date" id="employment_date" />
                        </li>
                        <li className="list-group-item">
                            <label for="basic_salary">مرتب الموظف</label>
                            <input name="basic_salary" type="number" id="basic_salary" />
                        </li>
                        <li className="list-group-item">
                            <label for="phone_number">رقم هاتف الموظف</label>
                            <input name="phone_number" type="number" id="phone_number" />
                        </li>
                        <li className="list-group-item">
                            <label for="job_id">الوظيفة</label>
                            <select id="job_id" name="job_id">
                                {
                                    jobs.map((job, index) => (
                                        <option key={index} value={job.id}>{job.name + ' ' + job.unit.name}</option>
                                    ))
                                }
                            </select>
                        </li>

                        <li className="list-group-item">
                            <label for="email">بريد الكتروني</label>
                            <input name="email" type="email" id="email" />
                        </li>
                        <li className="list-group-item">
                            <label for="documents[]">مستندات الموظف</label>
                            <input name="documents[]" type="file" accept="image/*" multiple="true" id="documents[]" />
                        </li>
                        <li className="list-group-item">
                            <input type="submit" value="تسجيل" />
                        </li>

                    </ul>

                </form>
            </div>
        </div>
    )
}