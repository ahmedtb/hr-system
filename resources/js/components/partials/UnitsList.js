import React from 'react'
import routes from '../utility/routesEndpoints'


export default function UnitsList(props) {
    const units = props.units
    // console.log(units)
    function renderUnit(unit, index) {

        return (
            <ul key={index} className="nested">
                <li>
                    <span>
                        <a href={routes.showUnit.replace(':id',unit.id)}>{unit.name}</a>
                    </span>
                    {(unit.children) ? unit.children.map(renderUnit) : null}
                </li>
            </ul>
        )

    }

    return (
        units.map(renderUnit)
    )
}