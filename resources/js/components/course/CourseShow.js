import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import routes from '../utility/routesEndpoints'

import { useParams, Link } from 'react-router-dom';

export default function CourseShow(props) {

    const { id } = useParams();
    const [course, setcourse] = React.useState(null)
    React.useEffect(() => {
        axios.get(ApiEndpoints.getCourse.replace(':id', id)).then((response) => {
            setcourse(response.data)
            console.log(response.data)
        }).catch((err) => {
            logError(err)
        })
    }, [])

    return (
        <div className="col-md-10">

            <div className="card">
                <div className="card-header">
                    الدورة رقم {course?.id}
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        <div className="group-list" >
                            <div className="group-list-item" >
                                start_date {course?.start_date}
                            </div>
                            <div className="group-list-item" >
                                title {course?.title}
                            </div>
                            <div className="group-list-item" >
                                status {course?.status}
                            </div>
                            <div className="group-list-item" >
                                program <Link to={routes.showProgram.replace(':id', course?.training_program.id)}>{course?.training_program.title}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}