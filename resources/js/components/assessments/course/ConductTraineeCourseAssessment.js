import axios from 'axios'
import React from 'react'
import ApiEndpoints from '../../utility/ApiEndpoints'
import logError from '../../utility/logError'

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
    React.useEffect(() => {
        axios.get(ApiEndpoints.getTrainingCourses)
            .then((res) => { settrainingcourses(res.data) })
            .catch(err => logError(err))
    }, [coach_communication])

    async function submit() {

        try {
            const data = {
                training_course_id:training_course_id,
                coach_understanding:coach_understanding,
                coach_communication:coach_communication,
                presentation:presentation,
                coach_cooperation:coach_cooperation,
                program_quality:program_quality,
                technical_preparation:technical_preparation,
                training_hall_preparation:training_hall_preparation,
                reception:reception,
                hospitality_and_course_breaks:hospitality_and_course_breaks,
                training_unit_response:training_unit_response,
            }

            const res = await axios.post(ApiEndpoints.createTraineeCourseAssessments, data)
            console.log(res.data)
        } catch (error) {
            logError(error)
        }
    }

    return (
        <div className="card">
            <div className="card-header">اجراء تقييم مقابلة</div>

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
                        <label >إلمام المدرب بمواضيع البرنامج التدريبي</label>
                        <select onChange={(e) => setcoach_understanding({...coach_understanding, rating: e.target.value})} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input type="text" onChange={(e) => setcoach_understanding({...coach_understanding, comment: e.target.value})} />
                    </li>

                    <li className="list-group-item">
                        <label >قدرة المدرب على توصيل المعلومات</label>
                        <select onChange={(e) => setcoach_communication({...coach_communication, rating: e.target.value})} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input type="text" onChange={(e) => setcoach_communication({...coach_communication, comment: e.target.value})} />
                    </li>

                    <li className="list-group-item">
                        <label >طريقة تنظيم العرض (من حيث الوضوح والكفاية )</label>
                        <select onChange={(e) => setpresentation({...presentation, rating: e.target.value})} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input type="text" onChange={(e) => setpresentation({...presentation, comment: e.target.value})} />
                    </li>

                    <li className="list-group-item">
                        <label >مدى تعاون وتفاعل المدرب مع المتدربين</label>
                        <select onChange={(e) => setcoach_cooperation({...coach_cooperation, rating: e.target.value})} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input type="text" onChange={(e) => setcoach_cooperation({...coach_cooperation, comment: e.target.value})} />
                    </li>

                    <li className="list-group-item">
                        <label >جودة برنامج التدريب</label>
                        <select onChange={(e) => setprogram_quality({...program_quality, rating: e.target.value})} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input type="text" onChange={(e) => setprogram_quality({...program_quality, comment: e.target.value})} />
                    </li>

                    <li className="list-group-item">
                        <label >التجهيزات الفنية للدورة</label>
                        <select onChange={(e) => settechnical_preparation({...technical_preparation, rating: e.target.value})} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input type="text" onChange={(e) => settechnical_preparation({...technical_preparation, comment: e.target.value})} />
                    </li>

                    <li className="list-group-item">
                        <label >القاعة التدريبية  وتجهيزاتها (الإضاءة؛ التهوية؛ وسائل الإيضاح ... إلخ )</label>
                        <select onChange={(e) => settraining_hall_preparation({...training_hall_preparation, rating: e.target.value})} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input type="text" onChange={(e) => settraining_hall_preparation({...training_hall_preparation, comment: e.target.value})} />
                    </li>

                    <li className="list-group-item">
                        <label >الاستقبال و الإجراءات التنظيمية</label>
                        <select onChange={(e) =>  setreception({...reception, rating: e.target.value})} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input type="text" onChange={(e) => setreception({...reception, comment: e.target.value})} />
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
                        <label >تعاون وتجاوب وحدة التدريب</label>
                        <select onChange={(e) => settraining_unit_response({...training_unit_response, rating: e.target.value})} >
                            <option >من 5</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <input type="text" onChange={(e) => settraining_unit_response({...training_unit_response, comment: e.target.value})} />
                    </li>


                    <li className="list-group-item">
                        <input onClick={submit} type="button" value="تسجيل" />
                    </li>

                </ul>
            </div>
        </div>
    )
}