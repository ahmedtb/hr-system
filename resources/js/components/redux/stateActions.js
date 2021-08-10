import axios from 'axios'

export const refreshUser = (user) => {
    // console.log('refreshUser',user)
    return {
        type: 'refresh-user',
        user: user
    }
}


// export const loginUser = (username, password) => {
//     let user = null
//     axios.get('/sanctum/csrf-cookie').then(response => {
//         axios.post('/login', { username: username, password: password }).then(response => {
//             console.log('User signed in!', (response.data));
//             user = response.data
//         }).catch(error => logError(error)); // credentials didn't match
//     });
//     return refreshUser(user)
// }
