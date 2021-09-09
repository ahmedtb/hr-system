import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import { useLocation, useParams } from 'react-router'
import { FaFileWord, FaFilePdf } from 'react-icons/fa'

export default function DocumentCreate() {
    const location = useLocation()
    const { documentable, documentable_type } = location.state
    const [name, setname] = React.useState(null)
    const [content, setcontent] = React.useState(null)
    const [type, settype] = React.useState(null)


    async function submit() {
        try {
            const data = new FormData()
            if (name) data.append('name', name ?? content?.name)

            if (content) {
                data.append('content', content)
                data.append('type', type)
            }

            if (documentable)
                data.append('documentable_id', documentable.id)
            if (documentable_type)
                data.append('documentable_type', documentable_type)

            const res = await axios.post(ApiEndpoints.createDocument, data)
            console.log(res.data)
        } catch (error) {
            logError(error)
        }
    }
    React.useEffect(() => {
        console.log('documentCreate documentalbe', documentable)
    }, [documentable])

    React.useEffect(() => {
        settype((/[.]/.exec(content?.name)) ? /[^.]+$/.exec(content?.name) : undefined)
    }, [content])

    return (
        <div className="card">
            <div className="card-header">الحاق مستند</div>

            <div className="card-body">
                <div className="row align-items-start justify-content-center">
                    <div className="col-2 p-2 border rounded m-2 text-center">
                        <label className="">اضافة المستند</label>
                        {(() => {
                            if (type == 'jpg' || type == 'png') {
                                return <>
                                    <img height='100' src={content ? window.URL.createObjectURL(content) : '/css/DocumentIcon.png'} />
                                    <div>{content?.name}</div>
                                </>
                            } else if (type == 'docx') {
                                return <>
                                    <FaFileWord size={50} />
                                    <div>{content?.name}</div>
                                </>
                            } else if (type == 'pdf') {
                                return <>
                                    <FaFilePdf size={50} />
                                    <div>{content?.name}</div>
                                </>
                            }
                        })()}
                        <input className="form-control" onChange={(e) => {
                            // console.log(e.target.files[0])
                            setcontent(e.target.files[0])
                        }} type="file" accept=".jpg,.png,.docx,.pdf" />


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
                                        if (documentable_type == "App\\Models\\TrainingProgram")
                                            return ' برنامج تدريبي'
                                        else if (documentable_type == "App\\Models\\Employee")
                                            return ' موظف'
                                        else if (documentable_type == "App\\Models\\TargetedIndividual")
                                            return ' مستهدف'

                                        else if (documentable_type == "App\\Models\\TrainingCourse")
                                            return ' دورة'
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