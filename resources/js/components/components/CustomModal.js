import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'


export default function CustomModal(props) {
    const label = props.label
    const children = props.children
    const buttonClass = props.buttonClass

    const modelId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    return (
        <>
            <button type="button" className={buttonClass} data-toggle="modal" data-target={"#" + modelId} >
                {label}
            </button>
            <div className="modal fade" id={modelId} tabIndex="-1" aria-labelledby={modelId + "Label"} aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={modelId + "Label"}>{label}</h5>
                        </div>
                        <div className="modal-body row">
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">اغلاق</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}