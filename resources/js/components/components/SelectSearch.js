import React from 'react'
import { Rectangle } from 'recharts'

export default function SelectSearch(props) {
    const options = props.options
    const setSelectedValue = props.setSelectedValue
    const label = props.label
    const defaultValue = props.defaultValue

    const valueKeyWord = props.valueKeyWord
    const nameKeyWord = props.nameKeyWord

    const [filterdOptions, setFilterdOptions] = React.useState(options)

    React.useEffect(() => {
        setFilterdOptions(options)
    }, [options])

    function searchInputChange(q) {
        setFilterdOptions(options.filter(option => {
            return option[nameKeyWord ?? 'name'].slice(0, q.length) == q
        }))
    }

    return (
        <div className="">
            <input type='text' onChange={e => { searchInputChange(e.target.value) }} placeholder={label} />
            <select
                className="form-control"
                onChange={(e) => setSelectedValue(e.target.value)}
                size={5}
                // value={defaultValue ?? ''}
            >
                <option value={null}>{''}</option>
                {
                    filterdOptions?.map((option, index) => (
                        <option key={index} value={option[valueKeyWord ?? 'value']}>{option[nameKeyWord ?? 'name']}</option>
                    ))
                }
            </select>

        </div>
    )
}