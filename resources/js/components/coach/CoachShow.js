import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';

export default function CoachShow(props) {
    const [coach, setcoach] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.getCoach).then((response) => {
            setcoach(response.data)
            console.log(response.data)
        }).catch((error) => {
            logError(error)
        })
    }, [])
    return (
        <div className="col-md-10">
            <div className="card">
                <div className="card-header">المدربيين</div>
                <div className="card-body">
                    <table className="table table-bordered table-condensed" style={{ marginBottom: 0 }}>
                        <thead>
                            <tr>
                                <th >ID</th>
                                <th>الاسم</th>
                                <th>التخصص</th>
                                <th>السيرة الذاتية</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coach.map((coach, index) => (
                                <tr key={index}>
                                    <td>
                                        <a href={routes.showFormcoach + coach.id}>
                                            {coach.id}
                                        </a>
                                    </td>
                                    <td>{coach.profile.name}</td>
                                    <td>
                                        {coach.speciality}
                                    </td>
                                    <td>{coach.CV}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

