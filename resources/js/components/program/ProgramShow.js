import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import { useParams } from 'react-router-dom';

export default function ProgramShow(props) {

    const { id } = useParams();
    const [program, setprogram] = React.useState(null)
    React.useEffect(() => {
        axios.get(ApiEndpoints.getProgram.replace(':id', id)).then((response) => {
            setprogram(response.data)
        }).catch((err) => {
            logError(err)
        })
    }, [])

    return (
        <div className="col-md-10">

            <div className="card">
                <div className="card-header">
                    البرنامج رقم {program?.id}
                </div>

                <div className="card-body">
                    <div className="group-list" >
                        <div className="group-list-item" >
                            category {program?.category}
                        </div>
                        <div className="group-list-item" >
                            details {program?.details}
                        </div>
                        <div className="group-list-item" >
                            goals {program?.goals}
                        </div>
                        <div className="group-list-item" >
                            period {program?.period}
                        </div>
                        <div className="group-list-item" >
                            title {program?.title}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}