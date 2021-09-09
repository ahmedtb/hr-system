import axios from 'axios'
import React from 'react'
import ApiEndpoints from '../../utility/ApiEndpoints'
import logError from '../../utility/logError'
import { Redirect } from 'react-router'
import routes from '../../utility/routesEndpoints'

export default function ConductCoachCourseAssessment(props) {

    const [training_course_id, settraining_course_id] = React.useState(null)
    const [trainees_discipline, settrainees_discipline] = React.useState(null)
    const [trainees_interaction, settrainees_interaction] = React.useState(null)
    const [congruence_with_content, setcongruence_with_content] = React.useState(null)
    const [trainees_cooperation, settrainees_cooperation] = React.useState(null)
    const [syllabus_understanding, setsyllabus_understanding] = React.useState(null)
    const [hall_preparation, sethall_preparation] = React.useState(null)
    const [reception_supervision, setreception_supervision] = React.useState(null)
    const [hospitality_and_course_breaks, sethospitality_and_course_breaks] = React.useState(null)
    const [training_department_cooperation, settraining_department_cooperation] = React.useState(null)

    const [trainingcourses, settrainingcourses] = React.useState([])
    function getCourses(){
        axios.get(ApiEndpoints.getTrainingCourses)
            .then((res) => { settrainingcourses(res.data) })
            .catch(err => logError(err))
    }
    const [coaches, setcoaches] = React.useState([])
    const [coach_id, setcoach_id] = React.useState(null)

    function getCoaches(){
        axios.get(ApiEndpoints.getCoaches)
            .then((res) => { 
                // console.log('ConductCoachCourseAssessment',res.data)
                setcoaches(res.data) 
            })
            .catch(err => logError(err))
    }
    React.useEffect(() => {
        getCourses()
        getCoaches()
    }, [])

    async function submit() {

        try {
            const data = {
                training_course_id: training_course_id,
                coach_id: coach_id,
                trainees_discipline: trainees_discipline,
                trainees_interaction: trainees_interaction,
                congruence_with_content: congruence_with_content,
                trainees_cooperation: trainees_cooperation,
                syllabus_understanding: syllabus_understanding,
                hall_preparation: hall_preparation,
                reception_supervision: reception_supervision,
                hospitality_and_course_breaks: hospitality_and_course_breaks,
                training_department_cooperation: training_department_cooperation,
            }

            const res = await axios.post(ApiEndpoints.createCoachCourseAssessments, data)
            console.log(res.data)
            setredirect(true)
        } catch (error) {
            logError(error)
        }
    }

    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Redirect to={routes.dashboard} />;
    }
    return (
        <div className="card">
            <h3 className="card-header">تقييم دورة تدريبية من قبل مدرب</h3>

            <div className="card-body">
                <div className="row justify-content-center">


                    <div className="col-8 p-2 border rounded m-2 row align-items-start">
                        <label className="col-4" >الدورة</label>
                        <select className="col-6 form-control" onChange={(e) => settraining_course_id(e.target.value)} >
                            <option >قائمة الدورات</option>
                            {
                                trainingcourses?.map((course, index) => (
                                    <option key={index} value={course.id}>{course.title}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-8 p-2 border rounded m-2 row align-items-start">
                        <label className="col-4" >المدرب</label>
                        <select className="col-6 form-control" onChange={(e) => setcoach_id(e.target.value)} >
                            <option >قائمة المدربيين</option>
                            {
                                coaches?.map((coach, index) => (
                                    <option key={index} value={coach.id}>{coach.profile.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-8 p-2 border rounded m-2 row align-items-start">
                        <label className="col-4" >انضباط المتدربين في الحضور والانصراف</label>
                        <select className="col-2 form-control" onChange={(e) => settrainees_discipline({ ...trainees_discipline, rating: e.target.value })} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input className="col-6 form-control" type="text" onChange={(e) => settrainees_discipline({ ...trainees_discipline, comment: e.target.value })} />
                    </div>

                    <div className="col-8 p-2 border rounded m-2 row align-items-start">
                        <label className="col-4" >تفاعل المتدربين أثناء المحاضرة</label>
                        <select className="col-2 form-control" onChange={(e) => settrainees_interaction({ ...trainees_interaction, rating: e.target.value })} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input className="col-6 form-control" type="text" onChange={(e) => settrainees_interaction({ ...trainees_interaction, comment: e.target.value })} />
                    </div>

                    <div className="col-8 p-2 border rounded m-2 row align-items-start">
                        <label className="col-4" >انسجام المتدربين مع مادة الدورة</label>
                        <select className="col-2 form-control" onChange={(e) => setcongruence_with_content({ ...congruence_with_content, rating: e.target.value })} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input className="col-6 form-control" type="text" onChange={(e) => setcongruence_with_content({ ...congruence_with_content, comment: e.target.value })} />
                    </div>

                    <div className="col-8 p-2 border rounded m-2 row align-items-start">
                        <label className="col-4" >مدى تعاون المتدربين</label>
                        <select className="col-2 form-control" onChange={(e) => settrainees_cooperation({ ...trainees_cooperation, rating: e.target.value })} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input className="col-6 form-control" type="text" onChange={(e) => settrainees_cooperation({ ...trainees_cooperation, comment: e.target.value })} />
                    </div>

                    <div className="col-8 p-2 border rounded m-2 row align-items-start">
                        <label className="col-4" >استيعاب منهج الدورة</label>
                        <select className="col-2 form-control" onChange={(e) => setsyllabus_understanding({ ...syllabus_understanding, rating: e.target.value })} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input className="col-6 form-control" type="text" onChange={(e) => setsyllabus_understanding({ ...syllabus_understanding, comment: e.target.value })} />
                    </div>

                    <div className="col-8 p-2 border rounded m-2 row align-items-start">
                        <label className="col-4" >تجهيزات القاعة (الإضاءة؛ التهوية؛ وسائل الإيضاح .. إلخ)</label>
                        <select className="col-2 form-control" onChange={(e) => sethall_preparation({ ...hall_preparation, rating: e.target.value })} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input className="col-6 form-control" type="text" onChange={(e) => sethall_preparation({ ...hall_preparation, comment: e.target.value })} />
                    </div>

                    <div className="col-8 p-2 border rounded m-2 row align-items-start">
                        <label className="col-4" >الاستقبال والإشراف</label>
                        <select className="col-2 form-control" onChange={(e) => setreception_supervision({ ...reception_supervision, rating: e.target.value })} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input className="col-6 form-control" type="text" onChange={(e) => setreception_supervision({ ...reception_supervision, comment: e.target.value })} />
                    </div>

                    <div className="col-8 p-2 border rounded m-2 row align-items-start">
                        <label className="col-4" >الضيافة وفترات الراحة بالدورة</label>
                        <select className="col-2 form-control" onChange={(e) => sethospitality_and_course_breaks({ ...hospitality_and_course_breaks, rating: e.target.value })} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input className="col-6 form-control" type="text" onChange={(e) => sethospitality_and_course_breaks({ ...hospitality_and_course_breaks, comment: e.target.value })} />
                    </div>

                    <div className="col-8 p-2 border rounded m-2 row align-items-start">
                        <label className="col-4" >تعاون وتجاوب إدارة التدريب</label>
                        <select className="col-2 form-control" onChange={(e) => settraining_department_cooperation({ ...training_department_cooperation, rating: e.target.value })} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input className="col-6 form-control" type="text" onChange={(e) => settraining_department_cooperation({ ...training_department_cooperation, comment: e.target.value })} />
                    </div>

                    <div className="col-12 d-flex justify-content-center">
                        <button onClick={submit} type="button" className="btn btn-success">
                            تخزين
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}