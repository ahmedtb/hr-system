import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import { Redirect } from 'react-router'
import routes from '../utility/routesEndpoints'
export default function CreateProgram() {
    const [title, setTitle] = React.useState(null)
    const [goals, setGoals] = React.useState(null)
    const [period, setPeriod] = React.useState(null)
    const [category, setcategory] = React.useState(null)
    const [details, setdetails] = React.useState(null)

    const [documents, setdocuments] = React.useState([])

    async function submit() {
        try {
            const data = new FormData()
            if (title) data.append('title', title)
            if (goals) data.append('goals', goals)
            if (period) data.append('period', period)
            if (category) data.append('category', category)
            if (details) data.append('details', details)

            documents.forEach(image => {
                data.append('documents[]', image)
            });

            const res = await axios.post(ApiEndpoints.createProgram, data)
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
            <div className="card-header">تسجيل حقيبة تدريبية</div>

            <div className="card-body row justify-content-center">

                <div className="col-6">
                    <label htmlFor="title">عنوان البرنامج</label>
                    <input className="form-control" onChange={(e) => setTitle(e.target.value)} name="title" type="text" id="title" />
                </div>
                <div className="col-6">
                    <label htmlFor="goals">اهداف البرنامج</label>
                    <input className="form-control" onChange={(e) => setGoals(e.target.value)} name="goals" type="text" id="goals" />
                </div>
                <div className="col-6">
                    <label htmlFor="period">مدة البرنامج بالدقائق</label>
                    <input className="form-control" onChange={(e) => setPeriod(e.target.value)} name="period" type="number" id="period" />
                </div>
                <div className="col-6">
                    <label htmlFor="category">تصنيف</label>
                    <input className="form-control" onChange={(e) => setcategory(e.target.value)} name="category" type="text" id="category" />
                </div>
                <div className="col-6">
                    <label htmlFor="details">تفاصيل حول البرنامج</label>
                    <textarea rows="5" className="form-control" onChange={(e) => setdetails(e.target.value)} name="details" type="text" id="details" />
                </div>

                <div className="col-6">
                    <label htmlFor="documents[]">مستندات البرنامج</label>
                    <input className="form-control" onChange={(e) => {
                        let array = []
                        for (var i = 0; i < e.target.files.length; i++) {
                            let file = e.target.files[i];
                            array.push(file);
                        }
                        setdocuments(array)
                    }} name="documents[]" type="file" accept="image/*" multiple id="documents[]" />
                </div>
                <div className="col-2">
                    <button type="button" className="btn btn-success" onClick={submit} type="button" value="تسجيل">
                        تسجيل
                    </button>
                </div>

            </div>
        </div>
    )
}