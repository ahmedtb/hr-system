import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../utility/routesEndpoints'
export default function CoachesTable(props) {
    const coaches = props.coaches

    function truncate(str) {
        return str.length > 10 ? str.substring(0, 200) + "....." : str;
    }

    return (
        <table className="table table-bordered table-condensed table-striped table-sm">
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
                    <tr key={index} className="">
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
                        <td className="overflow-auto">{truncate( coach.CV )}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}