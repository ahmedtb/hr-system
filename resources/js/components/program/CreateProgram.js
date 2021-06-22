import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'

export default function CreateProgram() {
    // const [jobs, setJobs] = React.useState([])
    // React.useEffect(() => {
    //     axios.get(ApiEndpoints.createEmployeeForm).then((response) => {
    //         setJobs(response.data.jobs)
    //     }).catch(() => {
    //     })
    // }, [])

    const [title, setTitle] = React.useState(null)
    const [goals, setGoals] = React.useState(null)
    const [period, setPeriod] = React.useState(null)
    const [category, setcategory] = React.useState(null)
    const [details, setdetails] = React.useState(null)

    const [documents, setdocuments] = React.useState([])

    async function submit() {

    }

    return (
        <div className="card">
            <div className="card-header">اضافة موظف</div>

            <div className="card-body">
                <input type="hidden" name="_token" value={csrf_token} />

                <ul className="list-group">
                    <li className="list-group-item">
                        <label htmlFor="title">عنوان البرنامج</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} name="title" type="text" id="title" />
                    </li>
                    <li className="list-group-item">
                        <label htmlFor="goals">اهداف البرنامج</label>
                        <input value={goals} onChange={(e) => setGoals(e.target.value)} name="goals" type="text" id="goals" />
                    </li>
                    <li className="list-group-item">
                        <label htmlFor="period">مدة البرنامج بالدقائق</label>
                        <input value={period} onChange={(e) => setPeriod(e.target.value)} name="period" type="number" id="period" />
                    </li>
                    <li className="list-group-item">
                        <label htmlFor="category">تصنيف</label>
                        <input value={category} onChange={(e) => setcategory(e.target.value)} name="category" type="text" id="category" />
                    </li>
                    <li className="list-group-item">
                        <label htmlFor="details">تفاصيل</label>
                        <input value={details} onChange={(e) => setdetails(e.target.value)} name="details" type="number" id="details" />
                    </li>

                    <li className="list-group-item">
                        <label htmlFor="documents[]">مستندات البرنامج</label>
                        <input name="documents[]" type="file" accept="image/*" multiple id="documents[]" />
                    </li>
                    <li className="list-group-item">
                        <input onClick={submit} type="button" value="تسجيل" />
                    </li>

                </ul>
            </div>
        </div>
    )
}