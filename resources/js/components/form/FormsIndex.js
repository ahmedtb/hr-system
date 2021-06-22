import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'

export default function FormsIndex() {
    const [forms, setForms] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.showForms).then((response) => {
            setForms(response.data)
        }).catch(() => {

        })
    }, [])
    return (
        <div class="col-md-10">
            <div class="card">
                <div class="card-header">النماذج المعبئة</div>

                <div class="card-body">

                    {/* @include('partials.FormsTable',['forms'=>$forms]) */}

                </div>

            </div>
        </div>
    )
}