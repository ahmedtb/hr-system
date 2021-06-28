import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'

export default function CreateTargeted() {
    const [documents, setdocuments] = React.useState([])

    async function submit() {
        try {
            const data = new FormData()
            documents.forEach(image => {
                data.append('documents[]',image)
            });

            const res = await axios.post(ApiEndpoints.createTargeted, data)
            console.log(res.data)
        } catch (error) {
            logError(error)
        }
    }

    return (
        <div className="card">
            <div className="card-header">اضافة فرد مستهدف</div>

            <div className="card-body">

                <ul className="list-group">

                    <li className="list-group-item">
                        <label>مستندات تخص المستهدف</label>
                        <input onChange={(e) => {
                            let array = []
                            for( var i = 0; i < e.target.files.length; i++ ){
                                let file = e.target.files[i];
                                array.push(file);
                            }
                            setdocuments(array)
                        }} type="file" accept="image/*" multiple />
                    </li>
                    <li className="list-group-item">
                        <input onClick={submit} type="button" value="تسجيل" />
                    </li>

                </ul>
            </div>
        </div>
    )
}