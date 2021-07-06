import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import routes from '../utility/routesEndpoints'
import { useParams, Link } from 'react-router-dom';

export default function UnitShow(props) {

    const { id } = useParams();
    const [unit, setunit] = React.useState(null)
    React.useEffect(() => {
        axios.get(ApiEndpoints.unitShow.replace(':id', id)).then((response) => {
            setunit(response.data)
            console.log(response.data)
        }).catch((err) => logError(err))
    }, [])

    return (
        <div className="col-md-10">

            <div className="card">
                <div className="card-header">
                    المستهدف رقم {unit?.id}
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        <div className="group-list" >
                            <div className="group-list-item" >
                                name: {unit?.name}
                            </div>
                            <div className="group-list-item" >
                                purpose {unit?.purpose}
                            </div>
                            <div className="group-list-item" >
                                parent
                                <Link to={routes.showUnit.replace(':id', unit?.parent_id)}>
                                    {unit?.parent?.name}
                                </Link>
                            </div>
                        </div>

                    </div>



                </div>

            </div>
        </div>
    )
}