import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import { useLocation, useParams } from 'react-router'
export default function DocumentCreate() {
    const location = useLocation()
    const { documentable, type } = location.state
    const [name, setname] = React.useState(null)
    const [image, setimage] = React.useState(null)


    async function submit() {
        try {
            const data = new FormData()
            if (name) data.append('name', name)

            if (image)
                data.append('image', image)

            if (documentable)
                data.append('documentable_id', documentable.id)
            if (type)
                data.append('documentable_type', type)

            const res = await axios.post(ApiEndpoints.createDocument, data)
            console.log(res.data)
        } catch (error) {
            logError(error)
        }
    }
    React.useEffect(() => {
    }, [documentable])

    return (
        <div className="card">
            <div className="card-header">الحاق مستند</div>

            <div className="card-body">
                <div className="row align-items-start justify-content-center">
                    <div className="col-2 p-2 border rounded m-2 text-center">
                        <label className="">اضافة المستند</label>
                        <img height='100' src={image ? window.URL.createObjectURL(image) : '/css/DocumentIcon.png'} />
                        <input className="form-control" onChange={(e) => {
                            console.log(e.target.files[0])
                            setimage(e.target.files[0])
                        }} type="file" accept="image/*" />


                    </div>
                    <div className="col-8 row">

                        <div className="col-5 border rounded m-2 p-1">
                            <label >تسمية المستند</label>
                            <input className="form-control" onChange={(e) => setname(e.target.value)} type="text" />
                        </div>
                        <div className="col-5 border rounded m-2 p-1">
                            <strong className="col-12" >الكيان القابل للتوثيق الملحق به</strong>
                            <p className="col-12">
                                نوع الكيان
                                {
                                    (() => {
                                        if (type == "App\\Models\\TrainingProgram")
                                            return ' برنامج تدريبي'
                                    })()
                                }
                            </p>
                            <p className="col-12">رقم الكيان: {documentable.id}</p>
                        </div>
                    </div>


                    <div className="col-12 d-flex justify-content-center">
                        <button onClick={submit} type="button" className="btn btn-success">
                            الحاق
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}