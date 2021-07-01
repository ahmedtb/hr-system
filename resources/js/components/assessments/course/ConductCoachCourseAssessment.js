import axios from 'axios'
import React from 'react'
import ApiEndpoints from '../../utility/ApiEndpoints'
import logError from '../../utility/logError'

export default function ConductAssessment(props) {

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
    React.useEffect(() => {
        axios.get(ApiEndpoints.getTrainingCourses)
            .then((res) => { settrainingcourses(res.data) })
            .catch(err => logError(err))
    }, [trainees_interaction])

    async function submit() {

        try {
            const data = {
                training_course_id:training_course_id,
                trainees_discipline:trainees_discipline,
                trainees_interaction:trainees_interaction,
                congruence_with_content:congruence_with_content,
                trainees_cooperation:trainees_cooperation,
                syllabus_understanding:syllabus_understanding,
                hall_preparation:hall_preparation,
                reception_supervision:reception_supervision,
                hospitality_and_course_breaks:hospitality_and_course_breaks,
                training_department_cooperation:training_department_cooperation,
            }

            const res = await axios.post(ApiEndpoints.createCoachCourseAssessments, data)
            console.log(res.data)
        } catch (error) {
            logError(error)
        }
    }

    return (
        <div className="card">
            <div className="card-header">تقييم دورة تدريبية من قبل مدرب</div>

            <div className="card-body">
                <ul className="list-group">


                    <li className="list-group-item">
                        <label >الدورة</label>
                        <select onChange={(e) => settraining_course_id(e.target.value)} >
                            <option >قائمة الدورات</option>
                            {
                                trainingcourses?.map((course, index) => (
                                    <option key={index} value={course.id}>{course.title}</option>
                                ))
                            }
                        </select>
                    </li>

                    <li className="list-group-item">
                        <label >انضباط المتدربين في الحضور والانصراف</label>
                        <select onChange={(e) => settrainees_discipline({...trainees_discipline, rating: e.target.value})} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input type="text" onChange={(e) => settrainees_discipline({...trainees_discipline, comment: e.target.value})} />
                    </li>

                    <li className="list-group-item">
                        <label >تفاعل المتدربين أثناء المحاضرة</label>
                        <select onChange={(e) => settrainees_interaction({...trainees_interaction, rating: e.target.value})} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input type="text" onChange={(e) => settrainees_interaction({...trainees_interaction, comment: e.target.value})} />
                    </li>

                    <li className="list-group-item">
                        <label >انسجام المتدربين مع مادة الدورة</label>
                        <select onChange={(e) => setcongruence_with_content({...congruence_with_content, rating: e.target.value})} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input type="text" onChange={(e) => setcongruence_with_content({...congruence_with_content, comment: e.target.value})} />
                    </li>

                    <li className="list-group-item">
                        <label >مدى تعاون المتدربين</label>
                        <select onChange={(e) => settrainees_cooperation({...trainees_cooperation, rating: e.target.value})} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input type="text" onChange={(e) => settrainees_cooperation({...trainees_cooperation, comment: e.target.value})} />
                    </li>

                    <li className="list-group-item">
                        <label >استيعاب منهج الدورة</label>
                        <select onChange={(e) => setsyllabus_understanding({...syllabus_understanding, rating: e.target.value})} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input type="text" onChange={(e) => setsyllabus_understanding({...syllabus_understanding, comment: e.target.value})} />
                    </li>

                    <li className="list-group-item">
                        <label >تجهيزات القاعة (الإضاءة؛ التهوية؛ وسائل الإيضاح .. إلخ)</label>
                        <select onChange={(e) => sethall_preparation({...hall_preparation, rating: e.target.value})} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input type="text" onChange={(e) => sethall_preparation({...hall_preparation, comment: e.target.value})} />
                    </li>

                    <li className="list-group-item">
                        <label >الاستقبال والإشراف</label>
                        <select onChange={(e) => setreception_supervision({...reception_supervision, rating: e.target.value})} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input type="text" onChange={(e) => setreception_supervision({...reception_supervision, comment: e.target.value})} />
                    </li>

                    <li className="list-group-item">
                        <label >الضيافة وفترات الراحة بالدورة</label>
                        <select onChange={(e) => sethospitality_and_course_breaks({...hospitality_and_course_breaks, rating: e.target.value})} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input type="text" onChange={(e) => sethospitality_and_course_breaks({...hospitality_and_course_breaks, comment: e.target.value})} />
                    </li>

                    <li className="list-group-item">
                        <label >تعاون وتجاوب إدارة التدريب</label>
                        <select onChange={(e) => settraining_department_cooperation({...training_department_cooperation, rating: e.target.value})} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input type="text" onChange={(e) => settraining_department_cooperation({...training_department_cooperation, comment: e.target.value})} />
                    </li>

                    <li className="list-group-item">
                        <input onClick={submit} type="button" value="تسجيل" />
                    </li>

                </ul>
            </div>
        </div>
    )
}