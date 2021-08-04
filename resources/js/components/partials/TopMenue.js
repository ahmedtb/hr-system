import React from 'react'
import { Link } from 'react-router-dom';
import routes from '../utility/routesEndpoints'

export default function TopMenue() {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">منظومة الموارد البشرية</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                                    الموظفيين
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to={routes.employeeIndex}>قائمة الموظفيين</Link>
                                    <Link className="dropdown-item" to={routes.createEmployeeForm}>تسجيل موظف</Link>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                                    المستهدفين
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {/* <Link className="dropdown-item" to={routes.targeted}>قائمة المستهدفين</Link> */}
                                    <Link className="dropdown-item" to={routes.createTargetedForm}>تسجيل مستهدف</Link>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                                    نماذج
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to={routes.showFormsStructures}>قائمة قوالب النماذج</Link>
                                    <Link className="dropdown-item" to={routes.createFormStructureForm}>انشاء نوع نماذج جديد</Link>
                                    <Link className="dropdown-item" to={routes.showForms}>عرض النماذج المعبئة</Link>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                                    المدربين
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to={routes.CoachesList}>قائمة المدربين</Link>
                                    <Link className="dropdown-item" to={routes.createCoachForm}>تسجيل مدرب</Link>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                                    البرامج التدريبية
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to={routes.programIndex}>قائمة البرامج التدريبية</Link>
                                    <Link className="dropdown-item" to={routes.createProgramForm}>تسجيل حقيبة تدريبية</Link>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                                    الدورات
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to={routes.courseIndex}>قائمة الدورات</Link>
                                    <Link className="dropdown-item" to={routes.createCourse}>تسجيل دورة</Link>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                                التقيمات
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to={routes.AssessmentsIndex}>قائمة التقييمات المعبئة</Link>
                                    <Link className="dropdown-item" to={routes.TraineeCourseAssessmentIndex}>تقييمات المتدربيين لدورات</Link>
                                    <Link className="dropdown-item" to={routes.CoachCourseAssessmentIndex}>تقييمات المدربيين للدورات</Link>
                                    <Link className="dropdown-item" to={routes.TrainingPeriodAssessmentIndex}>تقييمات المظفيين في الفترة التدريب</Link>
                                    <Link className="dropdown-item" to={routes.TrialPeriodAssessmentIndex}>تقييمات المظفيين في الفترة التجريبية</Link>
                                    <Link className="dropdown-item" to={routes.interviewAssessmentIndex}>تقييمات المقابلات</Link>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                                    الوحدات الادارية
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to={routes.unitIndex}>قائمة الوحدات الادارية</Link>
                                    <Link className="dropdown-item" to={routes.unitCreate}>انشاء وحدة ادارية</Link>
                                    <Link className="dropdown-item" to={routes.jobIndex}>قائمة انواع الوظائف</Link>
                                    <Link className="dropdown-item" to={routes.jobCreate}>انشاء نوع وظيفة جديد</Link>
                                </ul>
                            </li>



                        </ul>
                    </div>
                </div>
            </nav>


        </>
    )
}