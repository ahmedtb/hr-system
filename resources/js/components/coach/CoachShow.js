import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import { Redirect } from 'react-router-dom';
import Pagination from '../utility/Pagination'
import CoursesTable from '../partials/CoursesTable'
import AllowedLink from '../components/AllowedLink';
import CustomModal from '../components/CustomModal';
import EditCoachModal from './components/EditCoachModal';
export default function CoachShow(props) {
    const { id } = useParams();
    const [coach, setcoach] = React.useState(null)
    const [courses, setcourses] = React.useState(null)
    const [courseslinks, setcourseslinks] = React.useState(null)

    async function getCoachCourses(link = ApiEndpoints.courseIndex, params = null) {
        try {
            const response = await axios.get(link, { params: { ...params, coach_id: id, page_size: 5 } })
            setcourses(response.data.data)
            setcourseslinks(response.data.links)
            // console.log(response.data)
        } catch (error) { logError(error) }

    }

    async function getCoach() {
        try {
            const response = await axios.get(ApiEndpoints.getCoach.replace(':id', id))
            setcoach(response.data)
            // console.log(response.data)
        } catch (error) { logError(error) }

    }

    React.useEffect(() => {
        getCoach()
        getCoachCourses()
    }, [])

    async function deleteCoach() {
        try {
            const response = await axios.delete(ApiEndpoints.deleteCoach.replace(':id', id))
            // console.log('deleteCoach',response.data)
            setredirect(true)
        } catch (error) { logError(error) }
    }
    const [redirect, setredirect] = React.useState(false)
    if(redirect){
        return <Redirect to={routes.CoachesList} />
    }
    

    return (
        <div className="col-md-12">
            <div className="card">
                <div className="card-header d-flex flex-row justify-content-between">
                    <h3>مدرب {id}</h3>
                    <div>
                        <CustomModal buttonClass="btn btn-info mr-2" label={'حدف'} >
                            <div>
                                هل تود فعلا حدف المدرب من السجل بشكل دائما؟
                            </div>
                            <button className="btn btn-secondary" onClick={deleteCoach} data-dismiss="modal">نعم</button>
                            <button className='btn btn-success' data-dismiss="modal">لا</button>

                        </CustomModal>
                        <EditCoachModal coach={coach} />
                    </div>
                </div>
                <div className="card-body">

                    <div className="row justify-content-center warp">


                        {
                            coach?.profile ? (
                                <div className="col-5 border border-dark rounded m-2 text-center">
                                    الملف الشخصي للمدرب المدرب {
                                        <AllowedLink to={
                                            coach?.profile_type == 'App/Models/Employee' ?
                                                routes.showEmployee.replace(':id', coach?.profile_id) :
                                                routes.showTargeted.replace(':id', coach?.profile_id)
                                        }>
                                            {coach?.profile?.name}
                                        </AllowedLink>
                                    }
                                </div>
                            ) : null
                        }

                        <div className="col-5 border border-dark rounded m-2 text-center">
                            تخصص المدرب {coach?.speciality}
                        </div>



                        <div className="col-12 border border-dark rounded m-2 text-center">
                            السيرة الذاتية للمدرب {coach?.CV}
                        </div>

                    </div>

                </div>
            </div>

            <div className="card">
                <h4 className="card-header">الدورات التي يقدمها المدرب</h4>
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

