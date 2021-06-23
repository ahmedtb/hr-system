import React from 'react'
import routes from '../utility/routesEndpoints'
import { Link } from 'react-router-dom';

export default function ActionsPanel() {

    return (
        <div className="card">
            <div className="card-header">
                طلبات متاحة
            </div>
            <div className="card-body">
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to={routes.createEmployeeForm}>تسجيل موظف</Link>
                        {/* <a className="btn btn-primary" href={routes.createEmployeeForm} role="button">تسجيل موظف</a> */}
                    </li>
                    <li className="list-group-item">
                        <Link to={routes.createTargetedForm}>تسجيل مستهدف</Link>
                        {/* <a className="btn btn-primary" href={routes.createTargetedForm} role="button">تسجيل مستهدف</a> */}
                    </li>

                    <li className="list-group-item">
                        <Link to={routes.showFormsStructures}>عرض النماذج المتاحة</Link>
                        {/* <a className="btn btn-primary" href={routes.showFormsStructures} role="button">عرض النماذج المتاحة</a> */}
                    </li>

                    <li className="list-group-item">
                        <Link to={routes.showForms}>عرض النماذج المعبئة</Link>
                        {/* <a className="btn btn-primary" href={routes.showForms} role="button">عرض النماذج المعبئة</a> */}
                    </li>

                    <li className="list-group-item">
                        <Link to={routes.createFormStructureForm}>انشاء نوع نماذج جديد</Link>
                        {/* <a className="btn btn-primary" href={routes.createFormStructureForm} role="button">انشاء نوع نماذج جديد</a> */}
                    </li>

                    <li className="list-group-item">
                        <Link to={routes.createCoachForm}>تسجيل مدرب</Link>
                        {/* <a className="btn btn-primary" href={routes.createCoachForm} role="button">تسجيل مدرب</a> */}
                    </li>

                    <li className="list-group-item">
                        <Link to={routes.createProgramForm}>انشاء حقيبة تدريبية</Link>
                        {/* <a className="btn btn-primary" href={routes.createProgramForm} role="button">انشاء حقيبة تدريبية</a> */}
                    </li>
                </ul>
            </div>
        </div>
    )
}