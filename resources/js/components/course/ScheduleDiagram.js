import React from 'react'
import moment from 'moment'

function RenderCourse(props) {

}

export default function ScheduleDiagram(props) {
    const range_start = moment(props.rangeStartDate)
    const range_end = moment(props.rangeEndDate)
    const courses = props.courses

    const diffDays = ((range_end).diff((range_start), 'days'));

    return (
        <div >

            {
                courses.map((course, index) => {
                    const courseStart = moment(course.start_date)
                    const courseEnd = moment(course.end_date)

                    var a = 0
                    var b = 0
                    var c = 0
                    if (courseStart.isBefore(range_start, 'days') && courseEnd.isBefore(range_end, 'days')) {
                        var b = courseEnd.diff(range_start, 'days')
                        var c = range_end.diff(courseEnd, 'days')
                    } else if (courseStart.isAfter(range_start, 'days') && courseEnd.isBefore(range_end, 'days')) {
                        var a = courseStart.diff(range_start, 'days')
                        var b = courseStart.diff(courseEnd, 'days')
                        var c = range_end.diff(courseEnd, 'days')
                    } else if (courseStart.isAfter(range_start, 'days') && courseEnd.isAfter(range_end, 'days')) {
                        var a = courseStart.diff(range_start, 'days')
                        var b = range_end.diff(courseStart, 'days')
                    } else if (courseStart.isBefore(range_start, 'days') && courseEnd.isAfter(range_end, 'days')) {
                        var b = 1
                    }


                    if (true)
                        return <div key={index} className="d-flex mt-2">
                            <div style={{ flex: a }} className="p-1">

                            </div>
                            <div style={{ flex: b }} className="bg-secondary p-1">
                                {course.title}
                            </div>
                            <div style={{ flex: c }} className="p-1">

                            </div>
                        </div>

                })
            }

        </div>
    );
}

