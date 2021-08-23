import React from 'react'
import { Link } from 'react-router-dom';
import routes from '../utility/routesEndpoints'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'

function AuthComponent(props) {

    async function isLoggedIn() {
        try {
            const response = await axios.get('/api/user')
            props.refreshUser(response.data)
            // console.log('/api/user',response.data)
        } catch (error) {
            logError(error)
        }
    }

    async function logout() {
        try {
            axios.defaults.headers.common['Accept'] = 'application/json';
            const response = await axios.post('/logout')
            // console.log('logout', (response.data));
            props.refreshUser(null)

        } catch (error) {
            logError(error)
        }
    }

    React.useEffect(() => {
        if (props.user == null)
            isLoggedIn()
        // console.log('top menue', props.user)
    }, [props.user])

    return (
        <>
            {
                props.user ? (
                    <>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {props.user.name}
                            </a>

                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" onClick={logout}>
                                    {'تسجيل الخروج'}
                                </a>
                            </div>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <AllowedLink hide={true} className="nav-link" to={routes.loginPage}>{'تسجيل الدخول'}</AllowedLink>
                        </li >

                        {/* <li className="nav-item">
                            <a className="nav-link" href="{{ route('register') }}">{'تسجيل'}</a>
                        </li> */}
                    </>
                )
            }

        </>
    )
}


import AllowedLink from '../components/AllowedLink';


function TopMenue(props) {
    const allowedRoutes = props.allowedRoutes

    function AllowedMenue(props) {
        const label = props.label
        const links = props.links
        const [FilteredLinks, setFilteredLinks] = React.useState([])

        function isPathAllowed(path) {
            if (allowedRoutes.length) {
                for (let i = 0; i < allowedRoutes.length; i++) {
                    if (allowedRoutes[i].path == path) {
                        return true
                    }
                }
                return false
            } else
                return false
        }

        React.useEffect(() => {
            let filteredlinks = []
            for (let i = 0; i < links.length; i++) {
                if (isPathAllowed(links[i].to)) {
                    filteredlinks.push(links[i])
                }
            }
            setFilteredLinks(filteredlinks)
            // console.log('FilteredLinks',filteredlinks)
        }, [links])

        return (

            FilteredLinks.length ?
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                        {label}
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        {
                            FilteredLinks.map((link, index) => {
                                return (
                                    <Link key={index} className="dropdown-item" to={link.to}>{link.label}</Link>
                                )
                            })
                        }
                    </ul>
                </li> : null
        )
    }


    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div className="container-fluid">
                    <AllowedLink hide={true} className="navbar-brand" to={routes.dashboard}>منظومة الموارد البشرية</AllowedLink>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto mb-2 mb-lg-0">

                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                                    الموظفيين
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.employeeIndex}>قائمة الموظفيين</AllowedLink>
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.createEmployeeForm}>تسجيل موظف</AllowedLink>
                                </ul>
                            </li> */}
                            <AllowedMenue
                                label={'الموظفيين'}
                                links={[
                                    { label: 'قائمة الموظفيين', to: routes.employeeIndex },
                                    { label: 'تسجيل موظف', to: routes.createEmployeeForm },
                                ]}
                            />

                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                                    المستهدفين
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.individualIndex}>قائمة المستهدفين</AllowedLink>
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.createTargetedForm}>تسجيل مستهدف</AllowedLink>
                                </ul>
                            </li> */}
                            <AllowedMenue
                                label={'المستهدفين'}
                                links={[
                                    { label: 'قائمة المستهدفين', to: routes.individualIndex },
                                    { label: 'تسجيل مستهدف', to: routes.createTargetedForm },
                                ]}
                            />

                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                                    نماذج
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.showFormsStructures}>قائمة قوالب النماذج</AllowedLink>
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.createFormStructureForm}>انشاء نوع نماذج جديد</AllowedLink>
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.showForms}>عرض النماذج المعبئة</AllowedLink>
                                </ul>
                            </li> */}
                            <AllowedMenue
                                label={'نماذج'}
                                links={[
                                    { label: 'قائمة قوالب النماذج', to: routes.showFormsStructures },
                                    { label: 'انشاء نوع نماذج جديد', to: routes.createFormStructureForm },
                                    { label: 'عرض النماذج المعبئة', to: routes.showForms },
                                ]}
                            />

                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                                    المدربين
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.CoachesList}>قائمة المدربين</AllowedLink>
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.createCoachForm}>تسجيل مدرب</AllowedLink>
                                </ul>
                            </li> */}
                            <AllowedMenue
                                label={'المدربين'}
                                links={[
                                    { label: 'قائمة المدربين', to: routes.CoachesList },
                                    { label: 'تسجيل مدرب', to: routes.createCoachForm },
                                ]}
                            />

                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                                    البرامج التدريبية
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.programIndex}>قائمة البرامج التدريبية</AllowedLink>
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.createProgramForm}>تسجيل حقيبة تدريبية</AllowedLink>
                                </ul>
                            </li> */}
                            <AllowedMenue
                                label={'البرامج التدريبية'}
                                links={[
                                    { label: 'قائمة البرامج التدريبية', to: routes.programIndex },
                                    { label: 'تسجيل حقيبة تدريبية', to: routes.createProgramForm },
                                ]}
                            />

                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                                    الدورات
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.courseIndex}>قائمة الدورات</AllowedLink>
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.createCourse}>تسجيل دورة</AllowedLink>
                                </ul>
                            </li> */}
                            <AllowedMenue
                                label={'الدورات'}
                                links={[
                                    { label: 'قائمة الدورات', to: routes.courseIndex },
                                    { label: 'تسجيل دورة', to: routes.createCourse },
                                ]}
                            />

                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                                    التقيمات
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.TraineeCourseAssessmentIndex}>تقييمات المتدربيين لدورات</AllowedLink>
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.CoachCourseAssessmentIndex}>تقييمات المدربيين للدورات</AllowedLink>
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.TrainingPeriodAssessmentIndex}>تقييمات المظفيين في الفترة التدريب</AllowedLink>
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.TrialPeriodAssessmentIndex}>تقييمات المظفيين في الفترة التجريبية</AllowedLink>
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.interviewAssessmentIndex}>تقييمات المقابلات</AllowedLink>
                                </ul>
                            </li>  */}
                            <AllowedMenue
                                label={'التقيمات'}
                                links={[
                                    { label: 'تقييمات المتدربيين لدورات', to: routes.TraineeCourseAssessmentIndex },
                                    { label: 'تقييمات المدربيين للدورات', to: routes.CoachCourseAssessmentIndex },
                                    { label: 'تقييمات المظفيين في الفترة التدريب', to: routes.TrainingPeriodAssessmentIndex },
                                    { label: 'تقييمات المظفيين في الفترة التجريبية', to: routes.TrialPeriodAssessmentIndex },
                                    { label: 'تقييمات المقابلات', to: routes.interviewAssessmentIndex },

                                ]}
                            />

                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                                    الوحدات الادارية
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.unitIndex}>قائمة الوحدات الادارية</AllowedLink>
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.unitCreate}>انشاء وحدة ادارية</AllowedLink>
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.jobIndex}>قائمة انواع الوظائف</AllowedLink>
                                    <AllowedLink hide={true} className="dropdown-item" to={routes.jobCreate}>انشاء نوع وظيفة جديد</AllowedLink>
                                </ul>
                            </li> */}
                            <AllowedMenue
                                label={'الوحدات الادارية'}
                                links={[
                                    { label: 'قائمة الوحدات الادارية', to: routes.unitIndex },
                                    { label: 'انشاء وحدة ادارية', to: routes.unitCreate },
                                    { label: 'قائمة انواع الوظائف', to: routes.jobIndex },
                                    { label: 'انشاء نوع وظيفة جديد', to: routes.jobCreate },

                                ]}
                            />


                        </ul>

                        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                            <AuthComponent {...props} />

                        </ul>

                    </div>


                </div>
            </nav>


        </>
    )
}

import { refreshUser } from '../redux/stateActions'
import { connect } from "react-redux"

const mapStateToProps = state => {
    return {
        user: state.state.user,
        allowedRoutes: state.state.allowedRoutes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshUser: (user) => dispatch(refreshUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenue)