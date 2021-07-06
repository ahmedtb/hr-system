import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import EmployeesTable from '../partials/EmployeesTable';

export default function employeeIndex(props) {
    const [employees, setemployees] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.employeeIndex).then((response) => {
            setemployees(response.data)
        }).catch((error) => logError(error))
    }, [])
    return (
        <div className="col-md-10">
            <div className="card">
                <div className="card-header">قائمة الموظفيين</div>
                <div className="card-body">
                    <EmployeesTable employees={employees} />
                </div>
            </div>
        </div>
    );
}

