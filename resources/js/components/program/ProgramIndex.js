import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';

export default function ProgramIndex(props) {
    const [programs, setprograms] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.programIndex).then((response) => {
            setprograms(response.data)
        }).catch((error) => {
            logError(error)
        })
    }, [])
    return (
        <div className="col-md-10">
            <div className="card">
                <div className="card-header">البرامج التدريبية</div>
                <div className="card-body">
                    <table className="table table-bordered table-condensed" style={{ marginBottom: 0 }}>
                        <thead>
                            <tr>
                                <th >id</th>
                                <th>title</th>
                                <th>category</th>
                                <th>details</th>
                                <th>goals</th>
                                <th>period</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programs.map((program, index) => (
                                <tr key={index}>
                                    <td>
                                        <a href={routes.showProgram.replace(':id', program.id)}>
                                            {program.id}
                                        </a>
                                    </td>
                                    <td>{program.title}</td>
                                    <td>{program.category}</td>
                                    <td>
                                        {program.details}
                                    </td>
                                    <td>{program.goals}</td>
                                    <td>{program.period}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

