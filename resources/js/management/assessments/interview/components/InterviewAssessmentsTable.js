import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import routes from '../../../utility/routesEndpoints'


function DataPresentation(row, property) {

    if (property == 'training_course') {

        return <Link to={routes.showCourse.replace(':id', row.training_course.id)}>{row.training_course.title}</Link>
    }
    else if (property == 'created_at') {

        return moment(row.created_at).format('yyyy-MM-DD')
    }
    else if (property == 'id') {

        return <Link to={routes.showInterviewAssessment.replace(':id', row.id)}>{row.id}</Link>
    }
    return row[property]
}

export default function InterviewAssessmetsTable(props) {
    const interviews = props.interviews
    
    const [dataShow, setdataShow] = React.useState({
        id: { visiblity: true, label: 'Id', presentation: (row) => DataPresentation(row, 'id') },
        name: { visiblity: true, label: 'اسم الشخص', presentation: (row) => DataPresentation(row, 'name') },
        look: { visiblity: true, label: 'حسن المظهر', presentation: (row) => DataPresentation(row, 'look') },
        self_introduction: { visiblity: true, label: 'تفديمه لنفسه', presentation: (row) => DataPresentation(row, 'self_introduction') },
        personality: { visiblity: true, label: 'الشخصية', presentation: (row) => DataPresentation(row, 'personality') },
        english: { visiblity: true, label: 'اللغة', presentation: (row) => DataPresentation(row, 'english') },
        culture: { visiblity: false, label: 'الثقافة', presentation: (row) => DataPresentation(row, 'culture') },
        arabic: { visiblity: false, label: 'اللغة العربية', presentation: (row) => DataPresentation(row, 'arabic') },
        initiative: { visiblity: false, label: 'المبادة', presentation: (row) => DataPresentation(row, 'initiative') },
        sharing_skills: { visiblity: false, label: 'مهارات المشاركة', presentation: (row) => DataPresentation(row, 'sharing_skills') },
        comprehension: { visiblity: false, label: 'الاستيعاب', presentation: (row) => DataPresentation(row, 'comprehension') },
        decision_making: { visiblity: false, label: 'اتخاد القرار', presentation: (row) => DataPresentation(row, 'decision_making') },
        compatibility_of_education: { visiblity: false, label: 'ملائمة المؤهل العلمي لمتطلبات الوظيفة', presentation: (row) => DataPresentation(row, 'compatibility_of_education') },
        compatibility_of_experiance: { visiblity: false, label: 'ملائمة الخبرات العلمية لمتطلبات الوظيفة', presentation: (row) => DataPresentation(row, 'compatibility_of_experiance') },
        compatibility_of_skills: { visiblity: false, label: 'ملائمة المهارات المكتسبة لمتطلبات الوظيفة', presentation: (row) => DataPresentation(row, 'compatibility_of_skills') },
        problem_solving_skills: { visiblity: false, label: 'مدى استطاعته لحل المشاكل', presentation: (row) => DataPresentation(row, 'problem_solving_skills') },
        stress_handling: { visiblity: false, label: 'مدى تعامله مع الضغط والتوتر الوظيفي', presentation: (row) => DataPresentation(row, 'stress_handling') },
        moral_courage_self_confidence: { visiblity: false, label: 'الشجاعة الأدبية والثقة بالنفس', presentation: (row) => DataPresentation(row, 'moral_courage_self_confidence') },
        interviewer_id: { visiblity: false, label: 'اسم مجري المقابلة', presentation: (row) => DataPresentation(row, 'interviewer_id') },
        interview_date: { visiblity: false, label: 'تاريخ المقابلة', presentation: (row) => DataPresentation(row, 'interview_date') },
        created_at: { visiblity: false, label: 'تاريخ الانشاء', presentation: (row) => DataPresentation(row, 'created_at') },
    })

    function toggleDataShow(e) {
        setdataShow(pre => ({
            ...pre,
            [e.target.value]: { ...pre[e.target.value], visiblity: e.target.checked }
        }))
    }
    return (
        <div>
            <div>
                <a className="btn btn-primary" data-toggle="collapse" href="#collapseShowColumns" role="button" aria-expanded="false" aria-controls="collapseShowColumns">
                    عرض البيانات في الجدول
                </a>
                <div className="collapse" id="collapseShowColumns">
                    <div className="row">

                        {
                            Object.entries(dataShow).map((data, index) => (
                                <div key={index} className="border rounded d-flex align-items-center mr-2 my-2 p-1">
                                    <input className="mr-2" readOnly checked={data[1].visiblity} type="checkbox" value={data[0]} onClick={(e) => toggleDataShow(e)} />
                                    <label className="" >
                                        {data[1].label}
                                    </label>
                                </div>
                            ))
                        }


                    </div>
                </div>
            </div>
            <table className="table table-light table-bordered table-condensed">
                <thead className="thead-light">
                    <tr>
                        {
                            Object.entries(dataShow).map((data, index) => (
                                (data[1].visiblity) ? <td key={index}>{data[1].label}</td> : null
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {interviews?.map((interview, index) => (
                        <tr key={index}>
                            {
                                Object.entries(dataShow).map((data, index) => (
                                    (data[1].visiblity) ? <td key={index}>{data[1].presentation(interview)}</td> : null
                                ))
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}