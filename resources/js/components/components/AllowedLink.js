import React from 'react'
import { Link } from 'react-router-dom'

function AllowedLink(props) {
    const to = props.to
    const children = props.children
    const className = props.className
    const hide = props.hide

    const allowedRoutes = props.allowedRoutes

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

    React.useEffect(() => { }, [allowedRoutes])

    return (
        isPathAllowed(to) ?
            <Link className={className} to={to}>{children}</Link>
            : (hide ? null : <div className={className}>{children}</div>)
    )

}

import { connect } from "react-redux"

const mapStateToProps = state => {
    return {
        allowedRoutes: state.state.allowedRoutes,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllowedLink)