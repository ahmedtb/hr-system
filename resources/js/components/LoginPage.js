import React from 'react'
import axios from 'axios';
import logError from './utility/logError'



function LoginPage(props) {
    const [username, setusername] = React.useState('')
    const [password, setpassword] = React.useState('')


    async function handleLogin(username, password) {
        try {
            await axios.get('/sanctum/csrf-cookie')
            const response = await axios.post('/login', { username: username, password: password })
            console.log('User signed in!', (response.data));
            props.refreshUser(response.data)

        } catch (error) {
            logError(error)
        }
    }

    return (
        <div className='col-12'>
            <div className='card'>
                <div className='card-header'>
                    تسجيل الدخول
                </div>
                <div className='card-body'>
                    <label>username</label>
                    <input type='username' className='form-control' onChange={e => setusername(e.target.value)} />
                    <label>password</label>
                    <input type='password' className='form-control' onChange={e => setpassword(e.target.value)} />

                    <button type="button" className="btn btn-success" onClick={() => handleLogin(username, password)}>login</button>

                </div>
            </div>

        </div>
    )
}

import { refreshUser } from './redux/stateActions'
import { connect } from "react-redux"

const mapStateToProps = state => {
    return {
        user: state.state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshUser: (user) => dispatch(refreshUser(user)),
        // loginUser: (username,password) => dispatch(loginUser(username,password)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)