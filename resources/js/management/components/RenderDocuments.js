import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
import { FaFileWord, FaFilePdf } from 'react-icons/fa'
import CustomModal from './CustomModal'
function RenderImage(props) {
    const document = props.document
    const type = document.type
    const content = document.content
    const index = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)

    return (
        <>
            <button data-toggle="modal" data-target={"#documentModel" + index}>
                <img key={index} src={"data:image/" + type + ";base64," + content} width="60" />
            </button>

            <div className="modal fade" id={"documentModel" + index} tabIndex="-1" aria-labelledby="documentModelLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="documentModelLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <img key={index} src={"data:image/" + type + ";base64," + content} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function RenderDocx(props) {
    const document = props.document

    return (
        <>
            <FaFileWord size={50} />
            <div>{document.name}</div>
        </>
    )
}

function RenderPdf(props) {
    const document = props.document
    // console.log('pdf', document)
    return (
        <>
            <FaFilePdf size={50} />
            <div>{document.name}</div>
        </>
    )
}

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
            // console.log('fetch documents', response.data.data)
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

    function downloadDocument(document) {
        console.log('document', document)
        window.open('/document/' + document.id)
    }

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
                    if (document.type == 'png' || document.type == 'jpg')
                        return <RenderImage key={index} document={document} />
                    else if (document.type == 'docx') {
                        return <CustomModal key={index} label={<RenderDocx document={document} />}>
                            <div>
                                هل تود تحميل مستند docx؟
                            </div>
                            <button className="btn btn-success" onClick={() => downloadDocument(document)} data-dismiss="modal">نعم</button>
                            <button className='btn btn-secondary' data-dismiss="modal">لا</button>

                        </CustomModal >
                    } else if (document.type == 'pdf') {
                        return <CustomModal key={index} label={<RenderPdf document={document} />}>
                            <div>
                                هل تود تحميل المستند pdf؟
                            </div>
                            <button className="btn btn-success" onClick={() => downloadDocument(document)} data-dismiss="modal">نعم</button>
                            <button className='btn btn-secondary' data-dismiss="modal">لا</button>
                        </CustomModal >
                    }
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