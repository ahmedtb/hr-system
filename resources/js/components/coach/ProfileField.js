import React from 'react';
import ReactDOM from 'react-dom';

function EmployeeFieldPicker() {
    return (
        <>
            <select
                value={''}
                onChange={typeChoice}
            >
                <option value=''>please choose type</option>
                {
                    fieldsTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))
                }
            </select>
            <input name='profile_id' type='' />
        </>
    )
}

function TargetedFieldPicker() {

    return (
        null
    )
}

const fieldsTypes = [
    'employee', 'targeted'
]
function FieldsCreator() {

    function typeChoice(e) {
        addField(e.target.value)
    }
    const [profileChoice, setProfileChoice] = React.useState([])

    function addField(type) {
        switch (type) {
            case 'employee':
                setProfileChoice(<EmployeeFieldPicker />)
                break;
            case 'targeted':
                setProfileChoice(<TargetedFieldPicker />)
                break;
        }
    }

    return (
        <>
            <ul className="list-group">
                <profileChoice />
            </ul>

            <ul className="list-group">
                <select
                    value={''}
                    onChange={typeChoice}
                >
                    <option value=''>please choose type</option>
                    {
                        fieldsTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))
                    }
                </select>
            </ul>

        </>
    );
}

export default FieldsCreator;

if (document.getElementById('FieldsCreator')) {
    ReactDOM.render(<FieldsCreator />, document.getElementById('FieldsCreator'));
}
