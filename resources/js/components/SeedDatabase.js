import React from 'react'
import axios from 'axios';
import logError from './utility/logError'
import ApiEndpoints from './utility/ApiEndpoints'



export default function SeedDatabase(props) {
    const [users, setusers] = React.useState(null)
    const [departments, setdepartments] = React.useState(null)
    const [individuals, setindividuals] = React.useState(null)


    async function submit() {
        try {
            const data = new FormData()

            if (users) {
                data.append('users', users)
            }
            if (departments) {
                data.append('departments', departments)
            }
            if (individuals) {
                data.append('individuals', individuals)
            }
            const res = await axios.post(ApiEndpoints.seedDatabase, data)
            console.log(res.data)
        } catch (error) {
            logError(error)
        }
    }

    return (
        <div className="card">
            <div className="card-header">الحاق مستند</div>

            <div className="card-body">
                <div className="row align-items-start justify-content-center">
                    <div className="col-2 p-2 border rounded m-2 text-center">
                        <label className="">users json</label>
                        <input className="form-control" onChange={(e) => {
                            // console.log(e.target.files[0])
                            setusers(e.target.files[0])
                        }} type="file" accept=".json" />

                        <label className="">departments json</label>
                        <input className="form-control" onChange={(e) => {
                            setdepartments(e.target.files[0])
                        }} type="file" accept=".json" />

                        <label className="">individuals json</label>
                        <input className="form-control" onChange={(e) => {
                            setindividuals(e.target.files[0])
                        }} type="file" accept=".json" />

                    </div>

                    <div className="col-12 d-flex justify-content-center">
                        <button onClick={submit} type="button" className="btn btn-success">
                            seed
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
