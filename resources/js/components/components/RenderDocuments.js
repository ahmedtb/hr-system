import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'

export default function RenderDocuments(props) {
    const documentable_id = props.documentable_id
    const documentable_type = props.documentable_type

    const constparams = { documentable_id: documentable_id, documentable_type: documentable_type }
    const [documents, setdocuments] = React.useState([])
    const [next_page_url, setnext_page_url] = React.useState(null)
    const [prev_page_url, setprev_page_url] = React.useState(null)

    async function fetchdocuments(link = ApiEndpoints.documentIndex, params = constparams) {
        axios.get(link, { params: { ...params, page_size: 5 } }).then((response) => {
            setdocuments(response.data.data)
            if (response.data.links) {
                setnext_page_url(response.data.next_page_url)
                setprev_page_url(response.data.prev_page_url)
            }
        }).catch((error) => logError(error))
    }

    async function next_page() {
        fetchdocuments(next_page_url)
    }

    async function prev_page() {
        fetchdocuments(prev_page_url)
    }

    React.useEffect(() => {
        fetchdocuments()
    }, [])

    return (
        <>
            {
                prev_page_url ? (
                    <svg onClick={prev_page} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-arrow-right-circle col-1" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                    </svg>
                ) : null
            }


            {
                documents?.map((document, index) => {
                    return (
                        <div className="" key={index}>
                            <button data-toggle="modal" data-target={"#documentModel" + index}>
                                <img key={index} src={"data:image/png;base64," + document.image} width="60" />
                            </button>

                            <div className="modal fade" id={"documentModel" + index} tabIndex="-1" aria-labelledby="documentModelLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="documentModelLabel">Modal title</h5>
                                            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <img key={index} src={"data:image/png;base64," + document.image} />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary">Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                })
            }

            {
                next_page_url ? (
                    <svg onClick={next_page} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-arrow-left-circle col-1" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                    </svg>
                ) : null
            }
        </>

    )
}