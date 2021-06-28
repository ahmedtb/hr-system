import React from 'react';
import axios from 'axios'
import FieldsCreator from '../FieldsCreator'
export default function FormStructuresCreate(props) {
    
    return (
        <div className="col-md-10">
            <div className="card">
                <div className="card-header">انشاء نوع نماذج جديد</div>

                <div className="card-body">

                    <FieldsCreator />

                </div>

            </div>
        </div>
    )
}

