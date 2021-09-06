import axios from 'axios'
import React from 'react'
import ApiEndpoints from '../../utility/ApiEndpoints'
import logError from '../../utility/logError'
import { Redirect } from 'react-router'
import routes from '../../utility/routesEndpoints'

export default function ConductInterViewAssessment(props) {

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
            <h3 className="card-header">اجراء تقييم مقابلة</h3>

            <div className="card-body">
                <div className="row justify-content-center">

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">الاسم</label>
                        <input className="col-8 form-control" type="name" onChange={(e) => setname(e.target.value)} />
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">المظهر</label>
                        <select className="col-8 form-control" onChange={(e) => setlook(e.target.value)} >
                            <option >اختر</option>
                            <option value="1">ممتاز</option>
                            <option value="2">جيد</option>
                            <option value="3">متوسط</option>
                            <option value="4">ضعيف</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">تعريفه لنفسه</label>
                        <select className="col-8 form-control" onChange={(e) => setself_introduction(e.target.value)} >
                            <option >اختر</option>
                            <option value="1">ممتاز</option>
                            <option value="2">جيد</option>
                            <option value="3">متوسط</option>
                            <option value="4">ضعيف</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">الشخصية</label>
                        <select className="col-8 form-control" onChange={(e) => setpersonality(e.target.value)} >
                            <option >اختر</option>
                            <option value="1">ممتاز</option>
                            <option value="2">جيد</option>
                            <option value="3">متوسط</option>
                            <option value="4">ضعيف</option>
                        </select>
                    </div>


                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">اللغة الانجليزية</label>
                        <select className="col-8 form-control" onChange={(e) => setenglish(e.target.value)} >
                            <option >اختر</option>
                            <option value="1">ممتاز</option>
                            <option value="2">جيد</option>
                            <option value="3">متوسط</option>
                            <option value="4">ضعيف</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">الثقافة</label>
                        <select className="col-8 form-control" onChange={(e) => setculture(e.target.value)} >
                            <option >اختر</option>
                            <option value="1">ممتاز</option>
                            <option value="2">جيد</option>
                            <option value="3">متوسط</option>
                            <option value="4">ضعيف</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">اللغة العربية</label>
                        <select className="col-8 form-control" onChange={(e) => setarabic(e.target.value)} >
                            <option >اختر</option>
                            <option value="1">ممتاز</option>
                            <option value="2">جيد</option>
                            <option value="3">متوسط</option>
                            <option value="4">ضعيف</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">المبادرة</label>
                        <select className="col-8 form-control" onChange={(e) => setinitiative(e.target.value)} >
                            <option >اختر</option>
                            <option value="1">ممتاز</option>
                            <option value="2">جيد</option>
                            <option value="3">متوسط</option>
                            <option value="4">ضعيف</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">مهارات المشاركة</label>
                        <select className="col-8 form-control" onChange={(e) => setsharing_skills(e.target.value)} >
                            <option >اختر</option>
                            <option value="1">ممتاز</option>
                            <option value="2">جيد</option>
                            <option value="3">متوسط</option>
                            <option value="4">ضعيف</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">الاستيعاب</label>
                        <select className="col-8 form-control" onChange={(e) => setcomprehension(e.target.value)} >
                            <option >اختر</option>
                            <option value="1">ممتاز</option>
                            <option value="2">جيد</option>
                            <option value="3">متوسط</option>
                            <option value="4">ضعيف</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">اتخاد القرار</label>
                        <select className="col-8 form-control" onChange={(e) => setdecision_making(e.target.value)} >
                            <option >اختر</option>
                            <option value="1">ممتاز</option>
                            <option value="2">جيد</option>
                            <option value="3">متوسط</option>
                            <option value="4">ضعيف</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">ملائمة المؤهل العلمي لمتطلبات الوظيفة</label>
                        <select className="col-8 form-control" onChange={(e) => setcompatibility_of_education(e.target.value)} >
                            <option >اختر</option>
                            <option value="1">ممتاز</option>
                            <option value="2">جيد</option>
                            <option value="3">متوسط</option>
                            <option value="4">ضعيف</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">ملائمة الخبرات العلمية لمتطلبات الوظيفة</label>
                        <select className="col-8 form-control" onChange={(e) => setcompatibility_of_experiance(e.target.value)} >
                            <option >اختر</option>
                            <option value="1">ممتاز</option>
                            <option value="2">جيد</option>
                            <option value="3">متوسط</option>
                            <option value="4">ضعيف</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">ملائمة المهارات المكتسبة لمتطلبات الوظيفة</label>
                        <select className="col-8 form-control" onChange={(e) => setcompatibility_of_skills(e.target.value)} >
                            <option >اختر</option>
                            <option value="1">ممتاز</option>
                            <option value="2">جيد</option>
                            <option value="3">متوسط</option>
                            <option value="4">ضعيف</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">مدى استطاعته لحل المشاكل</label>
                        <select className="col-8 form-control" onChange={(e) => setproblem_solving_skills(e.target.value)} >
                            <option >اختر</option>
                            <option value="1">ممتاز</option>
                            <option value="2">جيد</option>
                            <option value="3">متوسط</option>
                            <option value="4">ضعيف</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">مدى تعامله مع الضغط والتوتر الوظيفي</label>
                        <select className="col-8 form-control" onChange={(e) => setstress_handling(e.target.value)} >
                            <option >اختر</option>
                            <option value="1">ممتاز</option>
                            <option value="2">جيد</option>
                            <option value="3">متوسط</option>
                            <option value="4">ضعيف</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">الشجاعة الأدبية والثقة بالنفس</label>
                        <select className="col-8 form-control" onChange={(e) => setmoral_courage_self_confidence(e.target.value)} >
                            <option >اختر</option>
                            <option value="1">ممتاز</option>
                            <option value="2">جيد</option>
                            <option value="3">متوسط</option>
                            <option value="4">ضعيف</option>
                        </select>
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">مجري المقابلة</label>
                        <select className="col-8 form-control" onChange={(e) => setinterviewer_id(e.target.value)} >
                            <option >قائمة الموظفيين</option>
                            {
                                employees?.map((employee, index) => (
                                    <option key={index} value={employee.id}>{employee.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4">تاريخ المقابلة</label>
                        <input className="col-8 form-control" type="date" onChange={(e) => setinterview_date(e.target.value)} />
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