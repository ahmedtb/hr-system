import React from 'react'
import { Link } from 'react-router-dom';
import routes from '../utility/routesEndpoints'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
function AuthComponent(props) {

    async function isLoggedIn() {
        try {
            const response = await axios.get(ApiEndpoints.getUser)
            props.refreshUser(response.data)
            // console.log('/api/user',response.data)
        } catch (error) {
            logError(error)
        }
    }

    async function logout() {
        try {
            axios.defaults.headers.common['Accept'] = 'application/json';
            const response = await axios.post(ApiEndpoints.logout)
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
                            <AllowedLink hide={true} className="nav-link mx-2" to={routes.loginPage}>{'تسجيل الدخول'}</AllowedLink>
                        </li >

                        {/* <li className="nav-item">
                            <a className="nav-link mx-2" href="{{ route('register') }}">{'تسجيل'}</a>
                        </li> */}
                    </>
                )
            }

        </>
    )
}


import AllowedLink from '../components/AllowedLink';
import {
    FaUserTie,
    FaUserCheck,
    FaWpforms,
    FaChalkboardTeacher,
    FaSuitcase,
    FaGraduationCap,
    FaChartLine,
    FaBuilding,
    FaNetworkWired,
    FaLaptop
} from 'react-icons/fa'


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
                    <a className="nav-link dropdown-toggle d-flex flex-row align-items-center" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
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
        <nav className="navbar navbar-expand-xl navbar-dark bg-dark shadow-sm">
            <div className="container-fluid">
                <AllowedLink hide={true} className="navbar-brand" to={routes.dashboard}>منظومة الموارد البشرية</AllowedLink>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">

                        <AllowedLink hide={true} className="nav-link mx-2" to={routes.employeeIndex}>
                            <FaUserTie />
                            الموظفيين
                        </AllowedLink>

                        <AllowedLink hide={true} className="nav-link mx-2" to={routes.individualIndex}>
                            <FaUserCheck />
                            المستهدفين
                        </AllowedLink>


                        <AllowedMenue
                            label={
                                <div>
                                    <FaWpforms />
                                    نماذج
                                </div>
                            }
                            links={[
                                { label: 'قائمة قوالب النماذج', to: routes.showFormsStructures },
                                // { label: 'انشاء نوع نماذج جديد', to: routes.createFormStructureForm },
                                { label: 'عرض النماذج المعبئة', to: routes.showForms },
                            ]}
                        />

                        <AllowedLink hide={true} className="nav-link mx-2" to={routes.CoachesList}>
                            <FaChalkboardTeacher />
                            المدربين
                        </AllowedLink>

                        <AllowedLink hide={true} className="nav-link mx-2" to={routes.programIndex}>
                            <FaSuitcase />
                            البرامج التدريبية
                        </AllowedLink>

                        <AllowedLink hide={true} className="nav-link mx-2" to={routes.courseIndex}>
                            <FaGraduationCap />
                            الدورات
                        </AllowedLink>

                        <AllowedMenue
                            label={
                                <div>
                                    <FaChartLine />
                                    التقيمات
                                </div>
                            }
                            links={[
                                { label: 'تقييمات المتدربيين لدورات', to: routes.TraineeCourseAssessmentIndex },
                                { label: 'تقييمات المدربيين للدورات', to: routes.CoachCourseAssessmentIndex },
                                { label: 'تقييمات المظفيين في الفترة التدريب', to: routes.TrainingPeriodAssessmentIndex },
                                { label: 'تقييمات المظفيين في الفترة التجريبية', to: routes.TrialPeriodAssessmentIndex },
                                { label: 'تقييمات المقابلات', to: routes.interviewAssessmentIndex },

                            ]}
                        />
                        <AllowedLink hide={true} className="nav-link mx-2" to={routes.unitIndex}>
                            <div>
                                <FaNetworkWired />
                                الوحدات الادارية
                            </div>
                        </AllowedLink>
                        <AllowedLink hide={true} className="nav-link mx-2" to={routes.jobIndex}>
                            <div>
                                <FaLaptop />
                                انواع الوظائف
                            </div>
                        </AllowedLink>


                    </ul>

                    <ul className="navbar-nav ml-auto">
                        <AuthComponent {...props} />
                    </ul>

                </div>


            </div>
        </nav>
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