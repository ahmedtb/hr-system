import React from 'react'
import { Link } from 'react-router-dom';
import routes from '../utility/routesEndpoints'

export default function TopMenue() {

    return (
        <div className="row justify-content-center">
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    الموظفيين
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link className="dropdown-item" to={routes.employeeIndex}>قائمة الموظفيين</Link>
                    <Link className="dropdown-item" to={routes.createEmployeeForm}>تسجيل موظف</Link>
                </div>
            </div>

            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    المستهدفين
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                    {/* <Link className="dropdown-item" to={routes.targeted}>قائمة المستهدفين</Link> */}

                    <Link className="dropdown-item" to={routes.createTargetedForm}>تسجيل مستهدف</Link>

                </div>
            </div>

            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    نماذج
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link className="dropdown-item" to={routes.showFormsStructures}>قائمة قوالب النماذج</Link>
                    <Link className="dropdown-item" to={routes.createFormStructureForm}>انشاء نوع نماذج جديد</Link>
                    <Link className="dropdown-item" to={routes.showForms}>عرض النماذج المعبئة</Link>
                </div>
            </div>

            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    المدربين
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link className="dropdown-item" to={routes.CoachesList}>قائمة المدربين</Link>
                    <Link className="dropdown-item" to={routes.createCoachForm}>تسجيل مدرب</Link>
                </div>
            </div>

            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    البرامج التدريبية
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link className="dropdown-item" to={routes.programIndex}>قائمة البرامج التدريبية</Link>
                    <Link className="dropdown-item" to={routes.createProgramForm}>تسجيل حقيبة تدريبية</Link>
                </div>
            </div>

            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    الدورات
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link className="dropdown-item" to={routes.courseIndex}>قائمة الدورات</Link>
                    <Link className="dropdown-item" to={routes.createCourse}>تسجيل دورة</Link>
                </div>
            </div>

            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    التقيمات
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link className="dropdown-item" to={routes.AssessmentsIndex}>قائمة التقييمات المعبئة</Link>
                    <Link className="dropdown-item" to={routes.TraineeCourseAssessment}>اجراء تقييم المتدرب لدورة</Link>
                    <Link className="dropdown-item" to={routes.CoachCourseAssessment}>اجراء تقييم مدرب لدورة</Link>
                    <Link className="dropdown-item" to={routes.conductTrialPeriodAssessment}>اجراء تقييم الموظف في الفترة التجريبية</Link>
                    <Link className="dropdown-item" to={routes.conductTrainingPeriodAssessment}>اجراء تقييم الموظف في الفترة التدريب</Link>
                    <Link className="dropdown-item" to={routes.TrialPeriodAssessmentIndex}>قائمة تقييم الموظف في الفترة التدريب</Link>
                    <Link className="dropdown-item" to={routes.interviewAssessmentIndex}>اجراء تقييم مقابلة</Link>

                </div>
            </div>

            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    احصائيات
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                </div>
            </div>

            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    الوحدات الادارية
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link className="dropdown-item" to={routes.unitIndex}>قائمة الوحدات الادارية</Link>
                    <Link className="dropdown-item" to={routes.unitCreate}>انشاء وحدة ادارية</Link>
                    <Link className="dropdown-item" to={routes.jobIndex}>قائمة انواع الوظائف</Link>
                    <Link className="dropdown-item" to={routes.jobCreate}>انشاء نوع وظيفة جديد</Link>

                </div>
            </div>
        </div>
    )
}