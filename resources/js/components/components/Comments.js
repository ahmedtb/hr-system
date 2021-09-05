import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import AllowedLink from './AllowedLink'
import routes from '../utility/routesEndpoints'
function Commenter(props) {
    const commenter = props.commenter
    const commenter_type = props.commenter_type


    return (
        <>
            {(() => {
                if (commenter_type == 'App\\Models\\Admin') {
                    return <AllowedLink to={routes.showAdmin.replace(':id', commenter.id)}>{commenter.name}</AllowedLink>
                } else if (commenter_type == 'App\\Models\\Supervisor') {
                    return <AllowedLink to={routes.showSupervisor.replace(':id', commenter.id)}>{commenter.name}</AllowedLink>
                } else if (commenter_type == 'App\\Models\\Coach') {
                    return <AllowedLink to={routes.showCoach.replace(':id', commenter.id)}>{commenter.profile.name}</AllowedLink>
                } else return <div>no header</div>
            })()}
        </>
    )
}

function Comments(props) {
    const commentable_id = props.commentable_id
    const type = props.type

    const [create, setcreate] = React.useState('')

    const [comments, setcomments] = React.useState([])
    async function fetchComments() {

        try {
            const response = await axios.get(ApiEndpoints.commentIndex, {
                params: {
                    course_id: type == 'course' ? commentable_id : undefined,
                    program_id: type == 'program' ? commentable_id : undefined,
                    employee_id: type == 'employee' ? commentable_id : undefined,
                    individual_id: type == 'individual' ? commentable_id : undefined,
                }
            })
            // console.log('fetchComments', response.data)
            setcomments(response.data.data)
        } catch (error) { logError(error) }
    }

    React.useEffect(() => {
        fetchComments()
    }, [])

    async function submit() {
        try {
            const response = await axios.post(ApiEndpoints.createComment, {
                content: create,
                commentable_id: commentable_id,
                commentable_type: type,
                commenter_id: props.user.id,
                commenter_type: props.user.role
            })
            console.log(response.data)
            setcreate('')
            fetchComments()
        } catch (error) { logError(error) }
    }

    return (
        <>
            <div className="col-12" style={{ maxHeight: 500, overflow: 'auto', display: 'inline-block' }}>
                {
                    comments.map((comment, index) => (
                        <div key={index} className="border rounded">
                            <h3>
                                <Commenter commenter={comment.commenter} commenter_type={comment.commenter_type} />
                            </h3>
                            <div>
                                {comment.content.split('\n').map(str => <p key={Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)}>{str}</p>)}
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="row">
                <textarea className='form-control' value={create} type='text' onChange={(e) => { setcreate(e.target.value) }} />
                <button className="btn btn-success" onClick={() => submit()}>تعليق</button>
            </div>
        </>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Comments)