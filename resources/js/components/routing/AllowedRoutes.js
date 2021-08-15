import React from 'react'
import { intersection } from 'lodash';
import Roles from './Roles';
import PrivateRoutesConfig from './PrivateRoutesConfig'
import { Route } from 'react-router-dom'

function isArrayWithLength(arr) {
    return (Array.isArray(arr) && arr.length)
}

function AllowedRoutes(props) {

    const [roles, setroles] = React.useState([])
    const [allowedRoutes, setallowedRoutes] = React.useState([])
    React.useEffect(() => {
        setallowedRoutes(PrivateRoutesConfig.filter(
            ({ permission }) => {
                if (!permission) return true;
                else if (!isArrayWithLength(permission)) return true;
                else return intersection(permission, roles).length;
            })
        )

    }, [  roles  ])
    React.useEffect(() => {
        // console.log('allowedRoutes user', props.user)
        setroles([props.user?.role])
    }, [props.user])

    React.useEffect(() => {
        console.log('allowedRoutes', allowedRoutes)
        // setroles([props.user?.role])
    }, [allowedRoutes])
    
    return allowedRoutes.map((route, index) => {
        return <Route
            key={index}
            exact={route.exact}
            title={route.title}
            path={route.path}
            component={route.component}
        />
    })
}

import { refreshUser } from '../redux/stateActions'
import { connect } from "react-redux"

const mapStateToProps = state => {
    return {
        user: state.state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshUser: (user) => dispatch(refreshUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllowedRoutes)