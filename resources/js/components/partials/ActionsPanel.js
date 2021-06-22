import React from 'react'
import routes from '../utility/routesEndpoints'

export default function ActionsPanel() {

    return (
        <div className="card">
            <div className="card-header">
                طلبات متاحة
            </div>
            <div className="card-body">
                <ul className="list-group">
                    <li className="list-group-item">
                        <a className="btn btn-primary" href={routes.createEmployeeForm} role="button">تسجيل موظف</a>
                    </li>
                    <li className="list-group-item">
                        <a className="btn btn-primary" href={routes.createTargetedForm} role="button">تسجيل مستهدف</a>
                    </li>

                    <li className="list-group-item">
                        <a className="btn btn-primary" href={routes.showFormsStructure} role="button">عرض النماذج المتاحة</a>
                    </li>

                    <li className="list-group-item">
                        <a className="btn btn-primary" href={routes.showForms} role="button">عرض النماذج المعبئة</a>
                    </li>

                    <li className="list-group-item">
                        <a className="btn btn-primary" href={routes.createFormStructureForm} role="button">انشاء نوع نماذج جديد</a>
                    </li>

                    <li className="list-group-item">
                        <a className="btn btn-primary" href={routes.createCoachForm} role="button">تسجيل مدرب</a>
                    </li>

                    <li className="list-group-item">
                        <a className="btn btn-primary" href={routes.createProgramForm} role="button">انشاء حقيبة تدريبية</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}