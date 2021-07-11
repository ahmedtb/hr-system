import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import UnitsTable from '../partials/UnitsTable';

function Pagination(props) {
    const fetchPage = props.fetchPage

    const links = props.links

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">

                {
                    links?.map((link, index) => {
                        if (link['url'] && index == 0) {
                            return <button key={index} className="page-link" onClick={() => fetchPage(link['url'])}>السابق</button>
                        }
                        if (link['url'] && index == links.length - 1) {
                            return <button key={index} className="page-link" onClick={() => fetchPage(link['url'])}>التالي</button>
                        }
                        if (link['url'] && index && index != links.length - 1)
                            return <button key={index} className="page-link" onClick={() => fetchPage(link['url'])}>{link['label']}</button>
                    })
                }

            </ul>
        </nav>
    )
}

export default function UnitIndex(props) {
    const [units, setunits] = React.useState([])
    const [links, setlinks] = React.useState([])

    async function fetchPage(link = ApiEndpoints.unitIndex) {
        axios.get(link).then((response) => {
            setunits(response.data.data)
            
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
                <div className="card-header">قائمة الوحدات الادارية</div>
                <div className="card-body">
                    <Pagination
                        fetchPage={fetchPage}
                        links={links}
                    />
                    <UnitsTable units={units} />
                </div>
            </div>
        </div>
    );
}

