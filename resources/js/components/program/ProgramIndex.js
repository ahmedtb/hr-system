import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';

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

export default function ProgramIndex(props) {
    const [programs, setprograms] = React.useState([])
    const [links, setlinks] = React.useState([])

    async function fetchPage(link = ApiEndpoints.programIndex) {
        axios.get(link).then((response) => {
            setprograms(response.data.data)
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
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">البرامج التدريبية</div>
                <div className="card-body">

                    <Pagination
                        fetchPage={fetchPage}
                        links={links}
                    />

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

