import React from 'react'



export default function UnitsList(props) {
    const units = props.units
    // console.log(units)
    function renderUnit(unit, index) {

        return (
            <ul key={index} className="nested">
                <li>
                    <span>
                        <a href="{{route('showUnit',$unit->id)}}">{unit.name}</a>
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