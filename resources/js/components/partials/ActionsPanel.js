import React from 'react'
import routes from '../utility/routesEndpoints'
import { Link } from 'react-router-dom';

export default function ActionsPanel() {

    return (
        <div className="card">
            <div className="card-header">
                طلبات متاحة
            </div>
            <div className="card-body">
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to={routes.createEmployeeForm}>تسجيل موظف</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={routes.createTargetedForm}>تسجيل مستهدف</Link>
                    </li>

                    <li className="list-group-item">
                        <Link to={routes.showFormsStructures}>عرض النماذج المتاحة</Link>
                    </li>

                    <li className="list-group-item">
                        <Link to={routes.showForms}>عرض النماذج المعبئة</Link>
                    </li>

                    <li className="list-group-item">
                        <Link to={routes.createFormStructureForm}>انشاء نوع نماذج جديد</Link>
                    </li>

                    <li className="list-group-item">
                        <Link to={routes.createCoachForm}>تسجيل مدرب</Link>
                    </li>

                    <li className="list-group-item">
                        <Link to={routes.createProgramForm}>انشاء حقيبة تدريبية</Link>
                    </li>

                    <li className="list-group-item">
                        <Link to={routes.conductInterviewAssessment}>اجراء تقييم المقابلة</Link>
                    </li>

                    <li className="list-group-item">
                        <Link to={routes.conductTrialPeriodAssessment}>تقييم الموظف في الفترة التجريبية</Link>
                    </li>

                    <li className="list-group-item">
                        <Link to={routes.conductTrainingPeriodAssessment}>تقييم الموظف في الفترة التدريب</Link>
                    </li>

                    
                    <li className="list-group-item">
                        <Link to={routes.TraineeCourseAssessment}>تقييم المتدرب لدورة</Link>
                    </li>

                    <li className="list-group-item">
                        <Link to={routes.CoachCourseAssessment}>تقييم مدرب لدورة</Link>
                    </li>

                </ul>
            </div>
        </div>
    )
}