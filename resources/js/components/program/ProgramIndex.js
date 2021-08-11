import React from 'react'
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints';
import logError from '../utility/logError';
import Pagination from '../utility/Pagination'

function Filters(props) {
    const params = props.params
    const fetchPage = props.fetchPage

    const [title, settitle] = React.useState(null)
    const [category, setcategory] = React.useState(null)
    const [period, setperiod] = React.useState(null)


    return (
        <>
            <div className="col-3">
                <strong>ترشيح بالعنوان البرنامج</strong>
                <input value={title ?? ''} className="form-control" type="text" onChange={(e) => settitle(e.target.value)} />
                <button type="button" className="btn btn-success" onClick={
                    () => fetchPage({ ...params, title: title })
                }>بحث</button>
            </div>

            <div className="col-3">
                <strong>ترشيح وفق تصنيف البرنامج</strong>
                <input value={category ?? ''} className="form-control" type="text" onChange={(e) => setcategory(e.target.value)} />
                <button type="button" className="btn btn-success" onClick={
                    () => fetchPage({ ...params, category: category })
                }>بحث</button>
            </div>

            <div className="col-3">
                <strong>ترشيح وفق المدة الزمنية للبرنامج</strong>
                <input value={period ?? ''} className="form-control" type="number" onChange={(e) => setperiod(e.target.value)} />
                <button type="button" className="btn btn-success" onClick={
                    () => fetchPage({ ...params, period: period })
                }>بحث</button>
            </div>
        </>
    )
}

export default function ProgramIndex(props) {
    const [programs, setprograms] = React.useState([])
    const [links, setlinks] = React.useState([])
    const [params, setparams] = React.useState(null)

    async function fetchPage(link = ApiEndpoints.programIndex, params = null) {
        // console.log('params', params)
        axios.get(link, { params: { ...params, page_size: 5 } }).then((response) => {
            setprograms(response.data.data)
            setparams({ ...params, page_size: 5 })
            console.log('programs', response.data)
            if (response.data.links) { setlinks(response.data.links) } else setlinks(null)
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
                    <div className="row">
                        <Filters params={params} fetchPage={(params) => fetchPage(ApiEndpoints.programIndex, params)} />
                    </div>

                    <table className="table table-bordered table-condensed" style={{ marginBottom: 0 }}>
                        <thead>
                            <tr>
                                <th >id</th>
                                <th>عنوان البرنامج</th>
                                <th>تصنيف البرنامج</th>
                                <th>تفاصيل البرنامج</th>
                                <th>اهداف البرنامج</th>
                                <th>المدة الزمنية بالدقائق</th>
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
                    <Pagination
                        fetchPage={fetchPage}
                        links={links}
                    />
                </div>
            </div>
        </div>
    );
}

