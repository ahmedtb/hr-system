import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'


export default function CustomModal(props) {
    const label = props.label
    const children = props.children
    return (
        <>
            <button type="button" className="m-2 btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                {label}
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">ترشيح الدورات وفقا لــ</h5>
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