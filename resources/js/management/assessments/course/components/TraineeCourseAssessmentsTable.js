import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import routes from '../../../utility/routesEndpoints'

function DataPresentation(row, property) {

    if (property == 'trainee') {
        if (row.trainee_type == 'App\\Models\\Employee') {
            return <Link to={routes.showEmployee.replace(':id', row.trainee_id)}>{row.trainee.name}</Link>

        } else if (row.trainee_type == 'App\\Models\\TargetedIndividual') {
            return <Link to={routes.showTargeted.replace(':id', row.trainee_id)}>{row.trainee.name}</Link>
        } else
            return row.trainee_type
    }
    else if (property == 'training_course') {

        return <Link to={routes.showCourse.replace(':id', row.training_course.id)}>{row.training_course.title}</Link>
    }
    else if (property == 'created_at') {

        return moment(row.created_at).format('yyyy-MM-DD')
    }
    else if (property == 'id') {

        return <Link to={routes.showTraineeCourseAssessment.replace(':id', row.id)}>{row.id}</Link>
    }

    return row[property].rating
}

export default function TraineeCourseAssessmentsTable(props) {
    const traineeCourses = props.traineeCourses
    const [dataShow, setdataShow] = React.useState({
        id: { visiblity: true, label: 'Id', presentation: (row) => DataPresentation(row, 'id') },
        training_course: { visiblity: true, label: 'عنوان البرنامج التدريبي', presentation: (row) => DataPresentation(row, 'training_course') },
        trainee: { visiblity: true, label: 'المتدرب', presentation: (row) => DataPresentation(row, 'trainee') },
        coach_understanding: { visiblity: true, label: 'إلمام المدرب بمواضيع البرنامج التدريبي', presentation: (row) => DataPresentation(row, 'coach_understanding') },
        coach_communication: { visiblity: true, label: 'قدرة المدرب على توصيل المعلومات', presentation: (row) => DataPresentation(row, 'coach_communication') },
        presentation: { visiblity: true, label: 'طريقة تنظيم العرض (من حيث الوضوح والكفاية )', presentation: (row) => DataPresentation(row, 'presentation') },
        coach_cooperation: { visiblity: true, label: 'مدى تعاون وتفاعل المدرب مع المتدربين', presentation: (row) => DataPresentation(row, 'coach_cooperation') },
        program_quality: { visiblity: false, label: 'جودة برنامج التدريب', presentation: (row) => DataPresentation(row, 'program_quality') },
        technical_preparation: { visiblity: false, label: 'التجهيزات الفنية للدورة', presentation: (row) => DataPresentation(row, 'technical_preparation') },
        training_hall_preparation: { visiblity: false, label: 'القاعة التدريبية  وتجهيزاتها (الإضاءة؛ التهوية؛ وسائل الإيضاح ... إلخ )', presentation: (row) => DataPresentation(row, 'training_hall_preparation') },
        reception: { visiblity: false, label: 'لاستقبال و الإجراءات التنظيمية', presentation: (row) => DataPresentation(row, 'reception') },
        hospitality_and_course_breaks: { visiblity: false, label: 'الضيافة وفترات الراحة بالدورة', presentation: (row) => DataPresentation(row, 'hospitality_and_course_breaks') },
        training_unit_response: { visiblity: false, label: 'تعاون وتجاوب وحدة التدريب', presentation: (row) => DataPresentation(row, 'training_unit_response') },
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
                    {traineeCourses?.map((traineeCourse, index) => (
                        <tr key={index}>
                            {
                                Object.entries(dataShow).map((data, index) => (
                                    (data[1].visiblity) ? <td key={index}>{data[1].presentation(traineeCourse)}</td> : null
                                ))
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}