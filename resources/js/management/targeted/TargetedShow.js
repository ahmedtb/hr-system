import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import CustomModal from '../components/CustomModal'
import { useParams, Link, Redirect } from 'react-router-dom';
import RenderDocuments from '../components/RenderDocuments';
import routes from '../utility/routesEndpoints';
import Comments from '../components/Comments'
import { FaDiscourse, FaMoneyCheck, FaMailBulk, FaRegCalendar, FaChalkboardTeacher } from 'react-icons/fa'
import { FiFile, FiFlag, FiPhone } from 'react-icons/fi'
import { GrAnalytics } from 'react-icons/gr'
import { IoMdAnalytics } from 'react-icons/io'
import AllowedLink from '../components/AllowedLink'
import moment from 'moment'
import CoursesTable from '../components/CoursesTable'
import EditIndividualModal from './components/EditIndividualModal'
export default function TargetedShow(props) {

    const { id } = useParams();
    const [individual, setindividual] = React.useState(null)
    const [coach, setcoach] = React.useState(null)
    const [resumedCourses, setresumedCourses] = React.useState([])
    const [doneCourses, setdoneCourses] = React.useState([])
    const [plannedCourses, setplannedCourses] = React.useState([])
    const [canceledCourses, setcanceledCourses] = React.useState([])

    const [traineeCourseAssessments, settraineeCourseAssessments] = React.useState([])
    const [toggleUI, settoggleUI] = React.useState('documents')

    async function getindividualInfo(){
        axios.get(ApiEndpoints.getTargeted.replace(':id', id)).then((response) => {
            setindividual(response.data.individual)
            setcoach(response.data.coach)
            setresumedCourses(response.data.resumedCourses)
            setdoneCourses(response.data.doneCourses)
            setplannedCourses(response.data.plannedCourses)
            setcanceledCourses(response.data.canceledCourses)

            settraineeCourseAssessments(response.data.traineeCourseAssessments)
            console.log('TargetedShow', response.data)
        }).catch((err) => { logError(err) })
    }

    React.useEffect(() => {
        getindividualInfo()
    }, [])

    async function deleteindividual() { 
        try {
            const response = await axios.delete(ApiEndpoints.deleteIndividual.replace(':id', individual.id))
            console.log('individualShow delete', response.data)
            setredirect(true)
        } catch (error) { logError(error) }
    }
    const [redirect, setredirect] = React.useState(false)

    if (redirect) {
        return <Redirect to={routes.individualIndex} />;
    }
    return (
        <div className="col-12">

            <div className="card">
                <div className="card-header row justify-content-between">
                    <h4>مستهدف رقم {individual?.id}</h4>
                    <div>
                        <CustomModal buttonClass="btn btn-info mr-2" label={'حدف المستهدف من السجلات'} >
                            <div>
                                هل تود فعلا حدف المستهدف من السجل بشكل دائما؟
                            </div>
                            <button className="btn btn-secondary" onClick={deleteindividual} data-dismiss="modal">نعم</button>
                            <button className='btn btn-success' data-dismiss="modal">لا</button>

                        </CustomModal>
                        <EditIndividualModal individual={individual} change={getindividualInfo} />
                    </div>
                </div>

                <div className="card-body">
                    <div className="row">

                        <div className="border rounded p-2">
                            {individual?.profile_image ? <img height='150' src={'data:image/png;base64,' + individual?.profile_image} /> : null}
                        </div>
                        <div className="col-10 row warp">

                            <div className="col">
                                <div className="m-2 text-center row">
                                    <FiFlag size={25} className="mx-1" />
                                    <h5 className="mx-1">
                                        الاسم
                                    </h5>
                                    {individual?.name}
                                </div>

                                <div className="m-2 text-center row">
                                    <FaRegCalendar size={25} className="mx-1" />
                                    <h5 className="mx-1">
                                        تاريخ التسجيل
                                    </h5>
                                    {moment(individual?.created_at).format('yyyy-MM-DD')}
                                </div>
                                <div className="m-2 text-center row">
                                    <FiPhone size={25} className="mx-1" />
                                    <h5 className="mx-1">
                                        رقم الهاتف
                                    </h5>
                                    {individual?.phone_number}
                                </div>
                            </div>
                            <div className="col">

                                <div className="m-2 text-center row">
                                    <FaDiscourse size={25} className="mx-1" />
                                    <h5 className="mx-1">
                                        عنوان المستهدف:
                                    </h5>
                                    {individual?.address}
                                </div>
                                <div className="m-2 text-center row">
                                    <FaMailBulk size={25} className="mx-1" />
                                    <h5 className="mx-1">
                                        ايميله
                                    </h5>
                                    {individual?.email}
                                </div>
                                <div className="m-2 text-center row">
                                    <FiFile size={25} className="mx-1" />
                                    <h5 className="mx-1">
                                        اسم المستخدم (username)
                                    </h5>
                                    {individual?.username}
                                </div>
                            </div>

                            <div className="col-12 row">

                                <div className="m-2 text-center row">
                                    <FiFile size={25} className="mx-1" />
                                    <h5 className="mx-1">
                                        وصف المستهدف
                                    </h5>
                                    {individual?.description}
                                </div>

                            </div>

                            {
                                coach ? (
                                    <div className="m-2 text-center row">
                                        المستهدف كمدرب
                                        <Link to={routes.showCoach.replace(':id', coach.id)} >{coach?.profile?.name}</Link>
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>

                </div>

            </div>

            <div className="row justify-content-around">
                <div onClick={() => settoggleUI('documents')} className={"bg-light p-2"}>المستندات</div>
                <div onClick={() => settoggleUI('courses')} className={"bg-light p-2"}> الدورات</div>
                <div onClick={() => settoggleUI('notes')} className={"bg-light p-2"}>ملاحظات</div>
            </div>
            {

                toggleUI == 'documents' ?
                    <div className="card">
                        <div className="card-header row justify-content-between">
                            <h4>المستندات الملحق بالمستهدف</h4>
                            <AllowedLink to={{
                                pathname: routes.attachDocument, state: { documentable: individual, documentable_type: 'App\\Models\\TargetedIndividual' }
                            }}>الحاق مستند جديد</AllowedLink>
                        </div>

                        <div className="card-body">
                            <div className="row">

                                <RenderDocuments
                                    documentable_id={id}
                                    documentable_type='App\Models\TargetedIndividual'
                                />

                            </div>

                        </div>
                    </div > : null
            }
            {
                toggleUI == 'courses' && resumedCourses.length ? (
                    <div className="card">

                        <div className="card-header">
                            <h4>دورات المستهدف المستانفة</h4>
                        </div>

                        <div className="card-body">
                            <div className="row justify-content-center warp">
                                <CoursesTable courses={resumedCourses} />
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                toggleUI == 'courses' ? (
                    <div className="card-body row">
                        <div className="col-4 d-flex flex-row p-2">
                            <FaChalkboardTeacher className="mr-2" size={30} />
                            <Link to={routes.coursesBrowser + '?resumed=true&individual_id=' + id}>
                                الدورات الجارية المسجل بها {resumedCourses.length}
                            </Link>
                        </div>
                        <div className="col-4 d-flex flex-row p-2">
                            <FaChalkboardTeacher className="mr-2" size={30} />
                            <Link to={routes.coursesBrowser + '?done=true&individual_id=' + id}>
                                الدورات المنتهية المسجل بها {doneCourses.length}
                            </Link>
                        </div>
                        <div className="col-4 d-flex flex-row p-2">
                            <FaChalkboardTeacher className="mr-2" size={30} />
                            <Link to={routes.coursesBrowser + '?canceled=true&individual_id=' + id}>
                                الدورات الملغية المسجل بها {canceledCourses.length}
                            </Link>
                        </div>
                        <div className="col-4 d-flex flex-row p-2">
                            <FaChalkboardTeacher className="mr-2" size={30} />
                            <Link to={routes.coursesBrowser + '?planned=true&individual_id=' + id}>
                                الدورات المخطط له المسجل بها {plannedCourses.length}
                            </Link>
                        </div>
                        <div className="col-4 d-flex flex-row p-2">
                                <GrAnalytics className="mr-2" size={30} />
                                <Link to={routes.TraineeCourseAssessmentIndex + '?individual_id=' + id}>
                                    تقييمات المستهدف للدورات التي مر بها {traineeCourseAssessments.length}
                                </Link>
                            </div>
                    </div>
                ) : null
            }

            {
                toggleUI == 'notes' ?

                    <div className="col-12">
                        <div className="card-header ">
                            <div className="row justify-content-between">
                                <h4>ملاحظات حول ملف المستهدف</h4>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="col-12" >
                                <Comments commentable_id={id} type={'individual'} />
                            </div>
                        </div>
                    </div> : null
            }
        </div >
    )
}