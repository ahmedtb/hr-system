import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError';
import EmployeesTable from '../partials/EmployeesTable';
export default function employeeIndex(props) {
    const [employees, setemployees] = React.useState([])
    const [nextpage, setnextpage] = React.useState(null)
    const [prevpage, setprevpage] = React.useState(null)
    const [links, setlinks] = React.useState([])

    async function fetchPage(link) {
        axios.get((link) ?? ApiEndpoints.employeeIndex).then((response) => {
            setemployees(response.data.data)
            if (response.data.next_page_url) {
                setnextpage(response.data.next_page_url)
            } else
                setnextpage(null)
            if (response.data.prev_page_url) {
                setprevpage(response.data.prev_page_url)
            } else
                setprevpage(null)
            if (response.data.links) {
                setlinks(response.data.links)
            } else
                setlinks(null)

        }).catch((error) => logError(error))
    }

    React.useEffect(() => {
        fetchPage()
    }, [])

    async function nextPage() {
        fetchPage(nextpage)
    }

    async function prevPage() {
        fetchPage(prevpage)
    }
    return (
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">قائمة الموظفيين</div>
                <div className="card-body">

                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                {(prevpage) ? <button className="page-link" onClick={() => fetchPage(prevpage)}>السابق</button> : null}
                            </li>
                            {
                                links?.map((link, index) => {
                                    if (link['url'] && index && index != links.length-1)
                                        return <button key={index} className="page-link" onClick={() => fetchPage(link['url'])}>{link['label']}</button>
                                })
                            }
                            <li className="page-item">
                                {(nextpage) ? <button className="page-link" onClick={() => fetchPage(nextpage)}>التالي</button> : null}
                            </li>
                        </ul>
                    </nav>

                    <EmployeesTable employees={employees} />
                </div>
            </div>
        </div >
    );
}

