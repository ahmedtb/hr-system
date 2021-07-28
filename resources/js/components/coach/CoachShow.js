import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';

export default function CoachShow(props) {
    const { id } = useParams();

    const [coach, setcoach] = React.useState(null)
    React.useEffect(() => {
        axios.get(ApiEndpoints.getCoach.replace(':id',id)).then((response) => {
            setcoach(response.data)
            console.log(response.data)
        }).catch((error) => {
            logError(error)
        })
    }, [])
    return (
        <div className="col-md-10">
            <div className="card">
                <div className="card-header">مدرب {id}</div>
                <div className="card-body">
                    CV
                <div className="content" dangerouslySetInnerHTML={{__html: coach?.CV}}></div>

                </div>
            </div>
        </div>
    );
}

