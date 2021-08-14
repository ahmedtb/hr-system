import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import { useParams, Link } from 'react-router-dom';
import Pagination from '../utility/Pagination';
import CoursesTable from '../partials/CoursesTable';
import routes from '../utility/routesEndpoints';
import RenderDocuments from '../components/RenderDocuments'

export default function ProgramShow(props) {

    const { id } = useParams();
    const [program, setprogram] = React.useState(null)

    async function getProgram() {
        axios.get(ApiEndpoints.getProgram.replace(':id', id)).then((response) => {
            setprogram(response.data)
        }).catch((err) => {
            logError(err)
        })
    }


    const [courses, setcourses] = React.useState([])
    const [links, setlinks] = React.useState([])

    async function fetchCourses(link = ApiEndpoints.courseIndex, params = { training_program_id: id }) {
        axios.get(link, { params: { ...params, page_size: 5 } }).then((response) => {
            setcourses(response.data.data)
            if (response.data.links) { setlinks(response.data.links) } else setlinks(null)
        }).catch((error) => logError(error))
    }

    React.useEffect(() => {
        getProgram();
        fetchCourses();
    }, [])

    return (
        <div className="col-md-12">

            <div className="card">
                <div className="card-header">
                    البرنامج رقم {program?.id}
                </div>

                <div className="card-body">
                    <div className="row justify-content-center warp">

                        <div className="col-5 border border-dark rounded m-2 text-center">
                            تصنيف البرنامج {program?.category}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            تفاصيل البرنامج {program?.details}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            اهداف البرنامج {program?.goals}
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            مدة البرنامج زمنياً {program?.period} دقيقة
                        </div>
                        <div className="col-5 border border-dark rounded m-2 text-center">
                            عنوان البرنامج {program?.title}
                        </div>

                    </div>
                </div>

            </div>

            <div className="card">
                <div className="card-header row">
                    <div>المستندات الملحق بالبرنامج</div>
                    <Link to={{
                        pathname: routes.attachDocument, state: { documentable: program, type: 'App\\Models\\TrainingProgram' }
                    }}>الحاق مستند جديد</Link>
                </div>

                <div className="card-body">
                    <div className="row">

                        <RenderDocuments
                            documentable_id={id}
                            documentable_type='App\Models\TrainingProgram'
                        />

                    </div>

                </div>
            </div >

            <div className="card">
                <div className="card-header">
                    الدورات التي تتبع البرنامج
                </div>

                <div className="card-body">
                    <Pagination
                        fetchPage={fetchCourses}
                        links={links}
                    />
                    <CoursesTable courses={courses} />
                </div>
            </div>


        </div >
    )
}