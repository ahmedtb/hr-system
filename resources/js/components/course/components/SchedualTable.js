import React from 'react'
import moment from 'moment'
export default function SchedualTable(props) {
    const schedualTable = props.schedualTable
    const attendances = props.attendances
    React.useEffect(() => {
    }, [schedualTable])
    return (
        <div>

            <table className="table table-bordered table-condensed">
                <thead>
                    <tr>
                        <th >اليوم</th>
                        <th >التاريخ</th>
                        <th>بداية</th>
                        <th>النهاية</th>
                        <th>تسجيلات الحضور</th>

                    </tr>
                </thead>
                <tbody>
                    {(schedualTable) ? Object.entries(schedualTable)?.map((day, index) => {

                        const dayAttends = attendances?.filter(function (el) {
                            return el.date == day[0];
                        })

                        return (
                            <tr key={index}>
                                <td>{day[0]}</td>
                                <td>{moment(day[0]).locale('ar').format('dddd')}</td>
                                <td>{day[1][0]}</td>
                                <td>{day[1][1]}</td>
                                <td>{dayAttends?.length}</td>
                            </tr>
                        )
                    }) : null}
                </tbody>
            </table>


        </div>
    )
}