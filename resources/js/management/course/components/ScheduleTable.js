import React from 'react'
import moment from 'moment'
export default function ScheduleTable(props) {
    const scheduleTable = props.scheduleTable
    const attendances = props.attendances
    const className = props.className
    React.useEffect(() => {
    }, [scheduleTable])
    return (
        <div className={className}>

            <table className="table table-light table-bordered table-condensed">
                <thead className="thead-light">
                    <tr>
                        <th >اليوم</th>
                        <th >التاريخ</th>
                        <th>بداية</th>
                        <th>النهاية</th>
                        <th>تسجيلات الحضور</th>

                    </tr>
                </thead>
                <tbody>
                    {(scheduleTable) ? Object.entries(scheduleTable)?.map((day, index) => {

                        const dayAttends = attendances?.filter(function (el) {
                            return el.date == day[0];
                        })

                        return (
                            <tr key={index} style={{backgroundColor: moment().isAfter(day[0]) ? '#dbc5b6' : ''}}>
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