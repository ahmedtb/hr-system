import React from 'react'

export default function AttendanceTable(props) {
    const table = props.table
    return (
        <table className="table table-bordered table-condensed">
            <thead>
                <tr>
                    <th >اليوم</th>
                    <th >الاسم</th>
                    <th>زمن الدخول</th>
                    <th>ملاحظة</th>
                </tr>
            </thead>
            <tbody>
                {table?.map((record, index) => (
                    <tr key={index}>
                        <td>{record.date}</td>
                        <td>{record.profile.name}</td>
                        <td>{record.entrance_time}</td>
                        <td>{record.note}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}