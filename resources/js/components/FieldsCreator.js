import React from 'react';
import ReactDOM from 'react-dom';
import StringField from './StringField';
import TableField2 from './TableField2';
import TextAreaField from './TextAreaField';
import SocialStatusField from './SocialStatusField'
import RatingField from './RatingField'
import PhoneNumberField from './PhoneNumberField'
import NumberField from './NumberField'
import LabelField from './LabelField'
import JobField from './JobField'
import GenderField from './GenderField'
import EmailField from './EmailField'
import DoubleField from './DoubleField'
import DateField from './DateField'

import OptionsField from './OptionsField';

const fieldsTypes = [
    'textArea', 'table', 'string', 'socialStatus', 'rating', 'options',
    'phoneNumber', 'number', 'label', 'job', 'gender',
    'email', 'double', 'date',
]
function FieldsCreator() {

    function typeChoice(e) {
        addField(e.target.value)
    }
    const [newFields, setNewFields] = React.useState([])

    function addField(type) {
        switch (type) {
            case 'textArea':
                setNewFields(old => ([...old, <TextAreaField index={newFields.length} />]))
                break;
            case 'table':
                setNewFields(old => ([...old, <TableField2 index={newFields.length} />]))
                break;
            case 'string':
                setNewFields(old => ([...old, <StringField index={newFields.length} />]))
                break;
            case 'socialStatus':
                setNewFields(old => ([...old, <SocialStatusField index={newFields.length} />]))
                break;
            case 'rating':
                setNewFields(old => ([...old, <RatingField index={newFields.length} />]))
                break;
            case 'options':
                setNewFields(old => ([...old, <OptionsField index={newFields.length} />]))
                break;
            case 'phoneNumber':
                setNewFields(old => ([...old, <PhoneNumberField index={newFields.length} />]))
                break;
            case 'number':
                setNewFields(old => ([...old, <NumberField index={newFields.length} />]))
                break;
            case 'label':
                setNewFields(old => ([...old, <LabelField index={newFields.length} />]))
                break;
            case 'job':
                setNewFields(old => ([...old, <JobField index={newFields.length} />]))
                break;
            case 'gender':
                setNewFields(old => ([...old, <GenderField index={newFields.length} />]))
                break;
            case 'email':
                setNewFields(old => ([...old, <EmailField index={newFields.length} />]))
                break;
            case 'double':
                setNewFields(old => ([...old, <DoubleField index={newFields.length} />]))
                break;
            case 'date':
                setNewFields(old => ([...old, <DateField index={newFields.length} />]))
                break;
        }
    }

    return (


        <form method="POST" action="/structure/create" acceptCharset="UTF-8">
            <input type="hidden" name="_token" value={csrf_token} />
            name of the form structure <input type="string" name="type" />


            <ul className="list-group">
                {
                    newFields.map((NewField, index) => (
                        <li key={index} className="list-group-item">
                            {NewField}
                        </li>
                    ))
                }

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

            <ul className="list-group">
                <input type='submit' />
            </ul>
        </form>

    );
}

export default FieldsCreator;

if (document.getElementById('FieldsCreator')) {
    ReactDOM.render(<FieldsCreator />, document.getElementById('FieldsCreator'));
}
