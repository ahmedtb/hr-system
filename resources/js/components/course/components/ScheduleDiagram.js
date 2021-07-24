import React from 'react'
import moment from 'moment'
import { useHistory } from 'react-router-dom';
import routes from '../../utility/routesEndpoints';
export default function ScheduleDiagram(props) {
    const history = useHistory();

    const range_start = moment(props.rangeStartDate)
    const range_end = moment(props.rangeEndDate)
    const courses = props.courses

    const diffDays = ((range_end).diff((range_start), 'days'));

    let topRuler = [];
    let rulerDays = moment(props.rangeStartDate)
    for (let i = 0; i < diffDays + 1; i++) {
        topRuler.push(<div key={i} style={{ flex: 1, borderLeft: '1px solid', textAlign: 'center' }}>
            {rulerDays.format('DD')}
        </div>)
        rulerDays.add(1, 'day').format('DD')
    }

    const backgrounds = ['grey', '#93b6ed', '#b5ebb2', '#6f7fe8', '#eb704b']

    return (
        <div >
            <div className="d-flex" style={{ flexDirection: 'row', border: '2px solid' }}>
                {topRuler}
            </div>
            <div >
                {
                    courses.map((course, index) => {
                        const courseStart = moment(course.start_date)
                        const courseEnd = moment(course.end_date)

                        var a = 0
                        var b = 0
                        var c = 0
                        if (courseStart.isBefore(range_start, 'days') && courseEnd.isBefore(range_end, 'days')) {
                            var b = courseEnd.diff(range_start, 'days') + 1
                            var c = range_end.diff(courseEnd, 'days')
                        } else if (courseStart.isAfter(range_start, 'days') && courseEnd.isBefore(range_end, 'days')) {
                            var a = courseStart.diff(range_start, 'days')
                            var b = courseEnd.diff(courseStart, 'days') + 1
                            var c = range_end.diff(courseEnd, 'days')
                        } else if (courseStart.isAfter(range_start, 'days') && courseEnd.isAfter(range_end, 'days')) {
                            var a = courseStart.diff(range_start, 'days')
                            var b = range_end.diff(courseStart, 'days') + 1
                        } else if (courseStart.isBefore(range_start, 'days') && courseEnd.isAfter(range_end, 'days')) {
                            var b = 1
                        }


                        if (true)
                            return <div key={index} className="d-flex mt-1">
                                <div style={{ flex: a }} ></div>
                                <div onClick={() => history.push(routes.showCourse.replace(':id', course.id))} style={{ flex: b, background: backgrounds[Math.floor(Math.random() * backgrounds.length)], borderRadius: 15, textAlign: 'center' }} >
                                    {course.title}
                                </div>
                                <div style={{ flex: c }} ></div>
                            </div>

                    })
                }
            </div>

        </div>
    );
}

