import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'

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
                        <label htmlFor="title">عنوان البرنامج</label>
                        <input onChange={(e) => setTitle(e.target.value)} name="title" type="text" id="title" />
                    </li>
                    <li className="list-group-item">
                        <label htmlFor="goals">اهداف البرنامج</label>
                        <input onChange={(e) => setGoals(e.target.value)} name="goals" type="text" id="goals" />
                    </li>
                    <li className="list-group-item">
                        <label htmlFor="period">مدة البرنامج بالدقائق</label>
                        <input onChange={(e) => setPeriod(e.target.value)} name="period" type="number" id="period" />
                    </li>
                    <li className="list-group-item">
                        <label htmlFor="category">تصنيف</label>
                        <input onChange={(e) => setcategory(e.target.value)} name="category" type="text" id="category" />
                    </li>
                    <li className="list-group-item">
                        <label htmlFor="details">تفاصيل</label>
                        <input onChange={(e) => setdetails(e.target.value)} name="details" type="text" id="details" />
                    </li>

                    <li className="list-group-item">
                        <label htmlFor="documents[]">مستندات البرنامج</label>
                        <input onChange={(e) => {
                            let array = []
                            for (var i = 0; i < e.target.files.length; i++) {
                                let file = e.target.files[i];
                                array.push(file);
                            }
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