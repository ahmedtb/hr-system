import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import routes from '../utility/routesEndpoints'
import { useParams, Link } from 'react-router-dom';
import EmployeesTable from '../partials/EmployeesTable'
import TargetedIndividualsTable from '../partials/TargetedIndividualsTable'
export default function CourseShow(props) {

    const { id } = useParams();
    const [course, setcourse] = React.useState(null)
    React.useEffect(() => {
        axios.get(ApiEndpoints.getCourse.replace(':id', id)).then((response) => {
            setcourse(response.data)
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
                        <ul className="list-group" >
                            <li className="list-group-item" >
                                start_date {course?.start_date}
                            </li>
                            <li className="list-group-item" >
                                title {course?.title}
                            </li>
                            <li className="list-group-item" >
                                status {course?.status}
                            </li>
                            <li className="list-group-item" >
                                program <Link to={routes.showProgram.replace(':id', course?.training_program.id)}>{course?.training_program.title}</Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            <div className="card">
                <div className="card-header">
                    المسجلين بالدورة
                </div>

                <div className="card-body">
                    <ul className="list-group" >
                        <li className="list-group-item" >
                            موظفيين
                            <EmployeesTable employees={course?.employees} />
                        </li>
                        <li className="list-group-item" >
                            مستهدفيين
                            <TargetedIndividualsTable individuals={course?.targeted_individuals} />
                        </li>

                    </ul>
                </div>

            </div>


        </div>
    )
}