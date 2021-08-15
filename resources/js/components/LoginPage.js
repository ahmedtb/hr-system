import React from 'react'
import axios from 'axios';
import logError from './utility/logError'



function LoginPage(props) {
    const [name, setname] = React.useState('')
    const [password, setpassword] = React.useState('')


    async function handleLogin(name, password) {
        try {
            await axios.get('/sanctum/csrf-cookie')
            const response = await axios.post('/login', { name: name, password: password })
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
                    <label>name</label>
                    <input type='name' className='form-control' onChange={e => setname(e.target.value)} />
                    <label>password</label>
                    <input type='password' className='form-control' onChange={e => setpassword(e.target.value)} />

                    <button type="button" className="btn btn-success" onClick={() => handleLogin(name, password)}>login</button>

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
        // loginUser: (name,password) => dispatch(loginUser(name,password)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)