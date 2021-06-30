import axios from 'axios'
import React from 'react'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'

export default function ConductAssessment(props) {

    const [name, setname] = React.useState('')
    const [look, setlook] = React.useState('')
    const [self_introduction, setself_introduction] = React.useState('')
    const [personality, setpersonality] = React.useState('')
    const [english, setenglish] = React.useState('')
    const [culture, setculture] = React.useState('')
    const [arabic, setarabic] = React.useState('')
    const [initiative, setinitiative] = React.useState('')
    const [sharing_skills, setsharing_skills] = React.useState('')
    const [comprehension, setcomprehension] = React.useState('')
    const [decision_making, setdecision_making] = React.useState('')
    const [compatibility_of_education, setcompatibility_of_education] = React.useState('')
    const [compatibility_of_experiance, setcompatibility_of_experiance] = React.useState('')
    const [compatibility_of_skills, setcompatibility_of_skills] = React.useState('')
    const [problem_solving_skills, setproblem_solving_skills] = React.useState('')
    const [stress_handling, setstress_handling] = React.useState('')
    const [moral_courage_self_confidence, setmoral_courage_self_confidence] = React.useState('')
    const [interviewer_id, setinterviewer_id] = React.useState('')
    const [interview_date, setinterview_date] = React.useState('')

    const [employees, setemployees] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.getEmployees)
            .then((res) => { setemployees(res.data) })
            .catch(err => logError(err))
    }, [])

    async function submit() {

        try {
            const data = new FormData()
            if (name) data.append('name', name)
            if (look) data.append('look', look)
            if (self_introduction) data.append('self_introduction', self_introduction)
            if (personality) data.append('personality', personality)
            if (english) data.append('english', english)
            if (culture) data.append('culture', culture)
            if (arabic) data.append('arabic', arabic)
            if (initiative) data.append('initiative', initiative)
            if (sharing_skills) data.append('sharing_skills', sharing_skills)
            if (comprehension) data.append('comprehension', comprehension)
            if (decision_making) data.append('decision_making', decision_making)
            if (compatibility_of_education) data.append('compatibility_of_education', compatibility_of_education)
            if (compatibility_of_experiance) data.append('compatibility_of_experiance', compatibility_of_experiance)
            if (compatibility_of_skills) data.append('compatibility_of_skills', compatibility_of_skills)
            if (problem_solving_skills) data.append('problem_solving_skills', problem_solving_skills)
            if (stress_handling) data.append('stress_handling', stress_handling)
            if (moral_courage_self_confidence) data.append('moral_courage_self_confidence', moral_courage_self_confidence)
            if (interviewer_id) data.append('interviewer_id', interviewer_id)
            if (interview_date) data.append('interview_date', interview_date)

            const res = await axios.post(ApiEndpoints.createInterview, data)
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
                        <label >الاسم</label>
                        <input type="name" onChange={(e) => setname(e.target.value)} />
                    </li>

                    <li className="list-group-item">
                        <label >المظهر</label>
                        <select onChange={(e) => setlook(e.target.value)} >
                            <option >احتر</option>
                            <option value="excellent">ممتاز</option>
                            <option value="good">جيد</option>
                            <option value="medium">متوسط</option>
                            <option value="weak">ضعيف</option>
                        </select>
                    </li>

                    <li className="list-group-item">
                        <label >تعريفه لنفسه</label>
                        <select onChange={(e) => setself_introduction(e.target.value)} >
                            <option >احتر</option>
                            <option value="excellent">ممتاز</option>
                            <option value="good">جيد</option>
                            <option value="medium">متوسط</option>
                            <option value="weak">ضعيف</option>
                        </select>
                    </li>

                    <li className="list-group-item">
                        <label >الشخصية</label>
                        <select onChange={(e) => setpersonality(e.target.value)} >
                            <option >احتر</option>
                            <option value="excellent">ممتاز</option>
                            <option value="good">جيد</option>
                            <option value="medium">متوسط</option>
                            <option value="weak">ضعيف</option>
                        </select>
                    </li>


                    <li className="list-group-item">
                        <label >اللغة الانجليزية</label>
                        <select onChange={(e) => setenglish(e.target.value)} >
                            <option >احتر</option>
                            <option value="excellent">ممتاز</option>
                            <option value="good">جيد</option>
                            <option value="medium">متوسط</option>
                            <option value="weak">ضعيف</option>
                        </select>
                    </li>

                    <li className="list-group-item">
                        <label >الثقافة</label>
                        <select onChange={(e) => setculture(e.target.value)} >
                            <option >احتر</option>
                            <option value="excellent">ممتاز</option>
                            <option value="good">جيد</option>
                            <option value="medium">متوسط</option>
                            <option value="weak">ضعيف</option>
                        </select>
                    </li>

                    <li className="list-group-item">
                        <label >اللغة العربية</label>
                        <select onChange={(e) => setarabic(e.target.value)} >
                            <option >احتر</option>
                            <option value="excellent">ممتاز</option>
                            <option value="good">جيد</option>
                            <option value="medium">متوسط</option>
                            <option value="weak">ضعيف</option>
                        </select>
                    </li>

                    <li className="list-group-item">
                        <label >المبادرة</label>
                        <select onChange={(e) => setinitiative(e.target.value)} >
                            <option >احتر</option>
                            <option value="excellent">ممتاز</option>
                            <option value="good">جيد</option>
                            <option value="medium">متوسط</option>
                            <option value="weak">ضعيف</option>
                        </select>
                    </li>

                    <li className="list-group-item">
                        <label >مهارات المشاركة</label>
                        <select onChange={(e) => setsharing_skills(e.target.value)} >
                            <option >احتر</option>
                            <option value="excellent">ممتاز</option>
                            <option value="good">جيد</option>
                            <option value="medium">متوسط</option>
                            <option value="weak">ضعيف</option>
                        </select>
                    </li>

                    <li className="list-group-item">
                        <label >الاستيعاب</label>
                        <select onChange={(e) => setcomprehension(e.target.value)} >
                            <option >احتر</option>
                            <option value="excellent">ممتاز</option>
                            <option value="good">جيد</option>
                            <option value="medium">متوسط</option>
                            <option value="weak">ضعيف</option>
                        </select>
                    </li>

                    <li className="list-group-item">
                        <label >اتخاد القرار</label>
                        <select onChange={(e) => setdecision_making(e.target.value)} >
                            <option >احتر</option>
                            <option value="excellent">ممتاز</option>
                            <option value="good">جيد</option>
                            <option value="medium">متوسط</option>
                            <option value="weak">ضعيف</option>
                        </select>
                    </li>

                    <li className="list-group-item">
                        <label >ملائمة المؤهل العلمي لمتطلبات الوظيفة</label>
                        <select onChange={(e) => setcompatibility_of_education(e.target.value)} >
                            <option >احتر</option>
                            <option value="excellent">ممتاز</option>
                            <option value="good">جيد</option>
                            <option value="medium">متوسط</option>
                            <option value="weak">ضعيف</option>
                        </select>
                    </li>

                    <li className="list-group-item">
                        <label >ملائمة الخبرات العلمية لمتطلبات الوظيفة</label>
                        <select onChange={(e) => setcompatibility_of_experiance(e.target.value)} >
                            <option >احتر</option>
                            <option value="excellent">ممتاز</option>
                            <option value="good">جيد</option>
                            <option value="medium">متوسط</option>
                            <option value="weak">ضعيف</option>
                        </select>
                    </li>

                    <li className="list-group-item">
                        <label >ملائمة المهارات المكتسبة لمتطلبات الوظيفة</label>
                        <select onChange={(e) => setcompatibility_of_skills(e.target.value)} >
                            <option >احتر</option>
                            <option value="excellent">ممتاز</option>
                            <option value="good">جيد</option>
                            <option value="medium">متوسط</option>
                            <option value="weak">ضعيف</option>
                        </select>
                    </li>

                    <li className="list-group-item">
                        <label >مدى استطاعته لحل المشاكل</label>
                        <select onChange={(e) => setproblem_solving_skills(e.target.value)} >
                            <option >احتر</option>
                            <option value="excellent">ممتاز</option>
                            <option value="good">جيد</option>
                            <option value="medium">متوسط</option>
                            <option value="weak">ضعيف</option>
                        </select>
                    </li>

                    <li className="list-group-item">
                        <label >مدى تعامله مع الضغط والتوتر الوظيفي</label>
                        <select onChange={(e) => setstress_handling(e.target.value)} >
                            <option >احتر</option>
                            <option value="excellent">ممتاز</option>
                            <option value="good">جيد</option>
                            <option value="medium">متوسط</option>
                            <option value="weak">ضعيف</option>
                        </select>
                    </li>

                    <li className="list-group-item">
                        <label >الشجاعة الأدبية والثقة بالنفس</label>
                        <select onChange={(e) => setmoral_courage_self_confidence(e.target.value)} >
                            <option >احتر</option>
                            <option value="excellent">ممتاز</option>
                            <option value="good">جيد</option>
                            <option value="medium">متوسط</option>
                            <option value="weak">ضعيف</option>
                        </select>
                    </li>

                    <li className="list-group-item">
                        <label >مجري المقابلة</label>
                        <select onChange={(e) => setinterviewer_id(e.target.value)} >
                            <option >قائمة الموظفيين</option>
                            {
                                employees?.map((employee, index) => (
                                    <option key={index} value={employee.id}>{employee.name}</option>
                                ))
                            }
                        </select>
                    </li>
                    <li className="list-group-item">
                        <label >تاريخ المقابلة</label>
                        <input type="date" onChange={(e) => setinterview_date(e.target.value)} />
                    </li>

                    <li className="list-group-item">
                        <input onClick={submit} type="button" value="تسجيل" />
                    </li>

                </ul>
            </div>
        </div>
    )
}