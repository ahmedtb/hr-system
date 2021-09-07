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
    else if (property == 'note') {

        return row[property]
    }
    else if (property == 'id') {

        return <Link to={routes.showCoachCourseAssessment.replace(':id', row.id)}>{row.id}</Link>

    }


    return row[property].rating
}

export default function CoachCourseAssessmentsTable(props) {
    const coachCourses = props.coachCourses
    const [dataShow, setdataShow] = React.useState({
        id: { visiblity: true, label: 'ID', presentation: (row) => DataPresentation(row, 'id') },
        training_course: { visiblity: true, label: 'عنوان البرنامج التدريبي', presentation: (row) => DataPresentation(row, 'training_course') },
        trainees_discipline: { visiblity: true, label: 'انضباط المتدربين في الحضور والانصراف  ', presentation: (row) => DataPresentation(row, 'trainees_discipline') },
        trainees_interaction: { visiblity: true, label: 'تفاعل المتدربين أثناء المحاضرة', presentation: (row) => DataPresentation(row, 'trainees_interaction') },
        congruence_with_content: { visiblity: true, label: 'انسجام المتدربين مع مادة الدورة', presentation: (row) => DataPresentation(row, 'congruence_with_content') },
        trainees_cooperation: { visiblity: true, label: 'مدى تعاون المتدربين', presentation: (row) => DataPresentation(row, 'trainees_cooperation') },
        syllabus_understanding: { visiblity: false, label: 'استيعاب منهج الدورة', presentation: (row) => DataPresentation(row, 'syllabus_understanding') },
        hall_preparation: { visiblity: false, label: 'تجهيزات القاعة (الإضاءة؛ التهوية؛ وسائل الإيضاح .. إلخ)', presentation: (row) => DataPresentation(row, 'hall_preparation') },
        reception_supervision: { visiblity: false, label: 'القاعة التدريبية  وتجهيزاتها (الإضاءة؛ التهوية؛ وسائل الإيضاح ... إلخ )', presentation: (row) => DataPresentation(row, 'reception_supervision') },
        reception_supervision: { visiblity: false, label: 'الاستقبال والإشراف', presentation: (row) => DataPresentation(row, 'hospitality_and_course_breaks') },
        hospitality_and_course_breaks: { visiblity: false, label: 'الضيافة وفترات الراحة بالدورة', presentation: (row) => DataPresentation(row, 'training_department_cooperation') },
        training_department_cooperation: { visiblity: false, label: 'تعاون وتجاوب وحدة التدريب', presentation: (row) => DataPresentation(row, 'note') },
        note: { visiblity: false, label: 'ملاحظة التقييم', presentation: (row) => DataPresentation(row, 'note') },
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
            <table className="table table-bordered table-condensed">
                <thead>
                    <tr>
                        {
                            Object.entries(dataShow).map((data, index) => (
                                (data[1].visiblity) ? <td key={index}>{data[1].label}</td> : null
                            ))
                        }
                    </tr>
                </thead>
                <tbody>

                    {coachCourses?.map((coachCourse, index) => (
                        <tr key={index}>
                            {
                                Object.entries(dataShow).map((data, index) => (
                                    (data[1].visiblity) ? <td key={index}>{data[1].presentation(coachCourse)}</td> : null
                                ))
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}