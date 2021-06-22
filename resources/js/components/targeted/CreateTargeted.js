import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'

export default function CreateTargeted() {

    async function submit() {

    }

    return (
        <div className="card">
            <div className="card-header">اضافة فرد مستهدف</div>

            <div className="card-body">
                <input type="hidden" name="_token" value={csrf_token} />

                <ul className="list-group">

                    <li className="list-group-item">
                        <label htmlFor="documents[]">مستندات تخص المستهدف</label>
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