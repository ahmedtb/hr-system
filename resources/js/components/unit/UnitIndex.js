import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import UnitsTable from '../partials/UnitsTable';
import { Link } from 'react-router-dom';
export default function UnitIndex(props) {
    const [units, setunits] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.unitIndex).then((response) => {
            setunits(response.data)
            console.log(response.data)
        }).catch((error) => logError(error))
    }, [])
    return (
        <div className="col-md-10">
            <div className="card">
                <div className="card-header">قائمة الموظفيين</div>
                <div className="card-body">
                    <UnitsTable units={units} />
                </div>
            </div>
        </div>
    );
}

