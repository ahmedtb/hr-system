import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import { Link } from 'react-router-dom'
import Pagination from '../utility/Pagination'

export default function CoachIndex(props) {
    const [coaches, setcoaches] = React.useState([])
    const [links, setlinks] = React.useState([])

    async function fetchPage(link = ApiEndpoints.getCoaches) {
        axios.get(link).then((response) => {
            setcoaches(response.data.data)
            if (response.data.links) {
                setlinks(response.data.links)
            } else
                setlinks(null)

        }).catch((error) => logError(error))
    }
    React.useEffect(() => {
        fetchPage()
    }, [])
    return (
        <div className="col-md-10">
            <div className="card">
                <div className="card-header">المدربيين</div>
                <div className="card-body">
                    <Pagination
                        fetchPage={fetchPage}
                        links={links}
                    />
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
                            {coaches.map((coach, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link to={routes.showCoach.replace(':id', coach.id)}>
                                            {coach.id}
                                        </Link>

                                    </td>
                                    <td>
                                        {
                                            (coach.profile_type == 'App\\Models\\TargetedIndividual') ?
                                                (
                                                    <Link to={routes.showTargeted.replace(':id', coach.profile_id)}>
                                                        {coach.profile.name}
                                                    </Link>
                                                )
                                                :
                                                (
                                                    <Link to={routes.showEmployee.replace(':id', coach.profile_id)}>
                                                        {coach.profile.name}
                                                    </Link>
                                                )
                                        }

                                    </td>
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

