import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import { Link } from 'react-router-dom';
import Pagination from '../utility/Pagination'
import CoursesTable from '../partials/CoursesTable'
export default function CoachShow(props) {
    const { id } = useParams();
    const [coach, setcoach] = React.useState(null)
    const [courses, setcourses] = React.useState(null)
    const [courseslinks, setcourseslinks] = React.useState(null)

    async function getCoachCourses(link = ApiEndpoints.courseIndex, params = null) {
        try {
            const response = await axios.get(link, { params: { ...params, coach_id: id, page_size:5 } })
            setcourses(response.data.data)
            setcourseslinks(response.data.links)
            console.log(response.data)
        } catch (error) { logError(error) }

    }

    async function getCoach() {
        try {
            const response = await axios.get(ApiEndpoints.getCoach.replace(':id', id))
            setcoach(response.data)
            console.log(response.data)
        } catch (error) { logError(error) }

    }

    React.useEffect(() => {
        getCoach()
        getCoachCourses()
    }, [])
    return (
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">مدرب {id}</div>
                <div className="card-body">

                    <div className="row justify-content-center warp">

                        <div className="col-12 border border-dark rounded m-2 text-center">
                            السيرة الذاتية للمدرب {coach?.CV}
                        </div>

                        <div className="col-5 border border-dark rounded m-2 text-center">
                            تخصص المدرب {coach?.speciality}
                        </div>

                        {
                            coach?.profile ? (
                                <div className="col-5 border border-dark rounded m-2 text-center">
                                    الملف الشخصي للمدرب المدرب {
                                        <Link to={
                                            coach?.profile_type == 'App/Models/Employee' ?
                                                routes.showEmployee.replace(':id', coach?.profile_id) :
                                                routes.showTargeted.replace(':id', coach?.profile_id)
                                        }>
                                            {coach?.profile?.name}
                                        </Link>
                                    }
                                </div>
                            ) : null
                        }


                    </div>

                </div>
            </div>

            <div className="card">
                <div className="card-header">الدورات التي يقدمها المدرب</div>
                <div className="card-body">


                    <Pagination
                        fetchPage={getCoachCourses}
                        links={courseslinks}
                    />
                    <CoursesTable courses={courses} />

                </div>
            </div>

        </div>
    );
}

