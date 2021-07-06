import React from 'react'
import moment from 'moment'
export default function SchedualTable(props) {
    const schedualTable = props.schedualTable
    moment.locale('ar')
    return (
        <div>

            <table className="table table-bordered table-condensed">
                <thead>
                    <tr>
                        <th >اليوم</th>
                        <th >التاريخ</th>

                        <th>begin</th>
                        <th>end</th>
                    </tr>
                </thead>
                <tbody>
                    {(schedualTable) ? Object.entries(schedualTable)?.map((day, index) => (
                        <tr key={index}>
                            <td>{day[0]}</td>
                            <td>{moment(day[0]).format('dddd')}</td>

                            <td>{day[1][0]}</td>
                            <td>{day[1][1]}</td>
                        </tr>
                    )) : null}
                </tbody>
            </table>
        </div>
    )
}