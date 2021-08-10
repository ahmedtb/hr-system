import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'

export default function DocumentCreate() {
    React.useEffect(() => {

    }, [])

    const [name, setname] = React.useState(null)
    const [image, setimage] = React.useState(null)
    const [documentable_id, setdocumentable_id] = React.useState(null)
    const [documentable_type, setdocumentable_type] = React.useState(null)

    async function submit() {
        try {
            const data = {
                name: name, image: image,
                documentable_id: documentable_id, documentable_type: documentable_type,
            }
            const res = await axios.post(ApiEndpoints.createDocument, data)
            console.log(res.data)
        } catch (error) {
            logError(error)
        }
    }

    return (
        <div className="card">
            <div className="card-header">الحاق مستند</div>

            <div className="card-body">
                <div className="row align-items-start justify-content-center">
                    <div className="col-2 p-2 border rounded m-2 text-center">
                        <label className="">اضافة المستند</label>
                        <img height='100' onClick={() => { }} src={'/css/DocumentIcon.png'} />
                    </div>
                    <div className="col-10 row">

                        <div className="col-5 border rounded m-2 p-1">
                            <label >تسمية المستند</label>
                            <input className="form-control" onChange={(e) => setname(e.target.value)} type="text" />
                        </div>
                        <div className="col-5 border rounded m-2 p-1">
                            <label >الوحدة الادارية التي تتبعها</label>
                            <select className="form-control" onChange={(e) => setimage(e.target.value)} >
                                <option >نرجو اختيار الوحدة الادارية</option>
                                {/* {units.map((unit, index) => (
                                    <option key={index} value={unit.id}>{unit.name}</option>
                                ))} */}
                            </select>
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