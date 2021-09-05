import axios from 'axios'
import React from 'react'
import ApiEndpoints from '../../utility/ApiEndpoints'
import logError from '../../utility/logError'
import { Redirect } from 'react-router'
import routes from '../../utility/routesEndpoints'

export default function ConductTraineeCourseAssessment(props) {

    const [training_course_id, settraining_course_id] = React.useState(null)
    const [coach_understanding, setcoach_understanding] = React.useState(null)
    const [coach_communication, setcoach_communication] = React.useState(null)
    const [presentation, setpresentation] = React.useState(null)
    const [coach_cooperation, setcoach_cooperation] = React.useState(null)
    const [program_quality, setprogram_quality] = React.useState(null)
    const [technical_preparation, settechnical_preparation] = React.useState(null)
    const [training_hall_preparation, settraining_hall_preparation] = React.useState(null)
    const [reception, setreception] = React.useState(null)
    const [hospitality_and_course_breaks, sethospitality_and_course_breaks] = React.useState(null)
    const [training_unit_response, settraining_unit_response] = React.useState(null)

    const [trainingcourses, settrainingcourses] = React.useState([])

    function getCourses() {
        axios.get(ApiEndpoints.getTrainingCourses)
            .then((res) => { settrainingcourses(res.data) })
            .catch(err => logError(err))
    }

    React.useEffect(() => {
        getCourses()
        getEmployees()
        getIndividuals()
    }, [])

    const [personname, setpersonname] = React.useState('')

    const [employees, setemployees] = React.useState(null)
    const [individuals, setindividuals] = React.useState(null)
    const [profileChoice, setProfileChoice] = React.useState('')

    const [profile_id, setprofile_id] = React.useState(null)

    function profileChoiceChange(e) {
        setProfileChoice(e.target.value)
    }

    async function getEmployees() {
        try {
            const res = await axios.get(ApiEndpoints.getEmployees)
            setemployees(res.data)

        } catch (err) {
            logError(err)
        }
    }

    async function getIndividuals() {
        try {
            const res = await axios.get(ApiEndpoints.getIndividuals)
            setindividuals(res.data)
        } catch (err) {
            logError(err)
        }
    }

    async function submit() {
        let trainee_type = null
        if (profileChoice == 'employee') {
            trainee_type = 'App\\Models\\Employee'
        } else if (profileChoice == 'targeted') {
            trainee_type = 'App\\Models\\TargetedIndividual'
        }
        try {
            const data = {
                training_course_id: training_course_id,
                person_name: personname,
                trainee_id: profile_id,
                trainee_type: trainee_type,
                coach_understanding: coach_understanding,
                coach_communication: coach_communication,
                presentation: presentation,
                coach_cooperation: coach_cooperation,
                program_quality: program_quality,
                technical_preparation: technical_preparation,
                training_hall_preparation: training_hall_preparation,
                reception: reception,
                hospitality_and_course_breaks: hospitality_and_course_breaks,
                training_unit_response: training_unit_response,
            }

            const res = await axios.post(ApiEndpoints.createTraineeCourseAssessments, data)
            console.log(res.data)
            setredirect(true)
        } catch (error) {
            logError(error)
        }
    }
    const [redirect, setredirect] = React.useState(false)
    if (redirect) {
        return <Redirect to={routes.TraineeCourseAssessmentIndex} />;
    }

    return (
        <div className="card">
            <div className="card-header">اجراء تقييم المتدرب لدورة</div>

            <div className="card-body">
                <div className="row justify-content-center align-items-start">


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
                        <label className="col-4" >اسم الشخص</label>

                        <input className="col-6 form-control" type="text" onChange={(e) => setpersonname(e.target.value)} />
                    </div>
                    <div className="card col-11 mx-auto my-2 p-3">
                        <div className="row justify-content-center">
                            <h4>حدد نوع الفرد</h4>

                            <select
                                className="form-control"
                                value={''}
                                onChange={profileChoiceChange}
                            >
                                <option value=''>اختر نوع الفرد</option>
                                <option value='employee'>موظف</option>
                                <option value='targeted'>مستهدف</option>
                            </select>
                        </div>
                        {(() => {
                            if (profileChoice == 'employee') {
                                return (
                                    <>

                                        <label htmlFor="employee">اختر الموظف</label>
                                        <select
                                            className="form-control"
                                            onChange={(e) => setprofile_id(e.target.value)} id="employee">
                                            <option value=''>قائمة الموظفين المسجلين في الدورة</option>
                                            {
                                                employees?.map((employee, index) => (
                                                    <option key={index} value={employee.id}>{employee.name}</option>
                                                ))
                                            }
                                        </select>

                                    </>
                                )
                            } else if (profileChoice == 'targeted') {
                                return (
                                    <>

                                        <label htmlFor="targeted">اختر المستهدف</label>
                                        <select
                                            className="form-control"
                                            onChange={(e) => setprofile_id(e.target.value)} name="targeted_id">
                                            <option value=''>اسماء المستهدفين المسجلين في الدورة</option>
                                            {
                                                individuals?.map((targeted, index) => (
                                                    <option key={index} value={targeted.id}>{targeted.name}</option>
                                                ))
                                            }
                                        </select>

                                    </>
                                )
                            }
                        })()}

                    </div>

                    <div className="col-8 p-2 border rounded m-2 row align-items-start">
                        <label className="col-4" >إلمام المدرب بمواضيع البرنامج التدريبي</label>
                        <select className="col-2 form-control" onChange={(e) => setcoach_understanding({ ...coach_understanding, rating: e.target.value })} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input className="col-6 form-control" type="text" onChange={(e) => setcoach_understanding({ ...coach_understanding, comment: e.target.value })} />
                    </div>

                    <div className="col-8 p-2 border rounded m-2 row align-items-start">
                        <label className="col-4" >قدرة المدرب على توصيل المعلومات</label>
                        <select className="col-2 form-control" onChange={(e) => setcoach_communication({ ...coach_communication, rating: e.target.value })} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input className="col-6 form-control" type="text" onChange={(e) => setcoach_communication({ ...coach_communication, comment: e.target.value })} />
                    </div>

                    <div className="col-8 p-2 border rounded m-2 row align-items-start">
                        <label className="col-4" >طريقة تنظيم العرض (من حيث الوضوح والكفاية )</label>
                        <select className="col-2 form-control" onChange={(e) => setpresentation({ ...presentation, rating: e.target.value })} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input className="col-6 form-control" type="text" onChange={(e) => setpresentation({ ...presentation, comment: e.target.value })} />
                    </div>

                    <div className="col-8 p-2 border rounded m-2 row align-items-start">
                        <label className="col-4" >مدى تعاون وتفاعل المدرب مع المتدربين</label>
                        <select className="col-2 form-control" onChange={(e) => setcoach_cooperation({ ...coach_cooperation, rating: e.target.value })} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input className="col-6 form-control" type="text" onChange={(e) => setcoach_cooperation({ ...coach_cooperation, comment: e.target.value })} />
                    </div>

                    <div className="col-8 p-2 border rounded m-2 row align-items-start">
                        <label className="col-4" >جودة برنامج التدريب</label>
                        <select className="col-2 form-control" onChange={(e) => setprogram_quality({ ...program_quality, rating: e.target.value })} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input className="col-6 form-control" type="text" onChange={(e) => setprogram_quality({ ...program_quality, comment: e.target.value })} />
                    </div>

                    <div className="col-8 p-2 border rounded m-2 row align-items-start">
                        <label className="col-4" >التجهيزات الفنية للدورة</label>
                        <select className="col-2 form-control" onChange={(e) => settechnical_preparation({ ...technical_preparation, rating: e.target.value })} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input className="col-6 form-control" type="text" onChange={(e) => settechnical_preparation({ ...technical_preparation, comment: e.target.value })} />
                    </div>

                    <div className="col-8 p-2 border rounded m-2 row align-items-start">
                        <label className="col-4" >القاعة التدريبية  وتجهيزاتها (الإضاءة؛ التهوية؛ وسائل الإيضاح ... إلخ )</label>
                        <select className="col-2 form-control" onChange={(e) => settraining_hall_preparation({ ...training_hall_preparation, rating: e.target.value })} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input className="col-6 form-control" type="text" onChange={(e) => settraining_hall_preparation({ ...training_hall_preparation, comment: e.target.value })} />
                    </div>

                    <div className="col-8 p-2 border rounded m-2 row align-items-start">
                        <label className="col-4" >الاستقبال و الإجراءات التنظيمية</label>
                        <select className="col-2 form-control" onChange={(e) => setreception({ ...reception, rating: e.target.value })} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input className="col-6 form-control" type="text" onChange={(e) => setreception({ ...reception, comment: e.target.value })} />
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
                        <label className="col-4" >تعاون وتجاوب وحدة التدريب</label>
                        <select className="col-2 form-control" onChange={(e) => settraining_unit_response({ ...training_unit_response, rating: e.target.value })} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input className="col-6 form-control" type="text" onChange={(e) => settraining_unit_response({ ...training_unit_response, comment: e.target.value })} />
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