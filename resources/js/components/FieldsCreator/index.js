import React from 'react';
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'

import axios from 'axios';
import StringField from './StringField';
import TableField2 from './TableField2';
import TextAreaField from './TextAreaField';
import SocialStatusField from './SocialStatusField'
import RatingField from './RatingField'
import CustomRatingField from './CustomRatingField';
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
    'textArea', 'table', 'string', 'socialStatus', 'rating', 'customRating', 'options',
    'phoneNumber', 'number', 'label', 'job', 'gender',
    'email', 'double', 'date',
]
function FieldsCreator() {

    const [fieldsConfigs, setFieldsConfigs] = React.useState([])

    function setFieldConfig(index, config) {
        let arr = [...fieldsConfigs]
        arr[index] = config
        setFieldsConfigs(arr)
    }

    function typeChoice(e) {
        addField(e.target.value)
    }
    const [newFields, setNewFields] = React.useState([])

    function addField(type) {
        switch (type) {
            case 'textArea':
                setNewFields(old => ([...old, <TextAreaField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'table':
                setNewFields(old => ([...old, <TableField2 setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'string':
                setNewFields(old => ([...old, <StringField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'socialStatus':
                setNewFields(old => ([...old, <SocialStatusField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'rating':
                setNewFields(old => ([...old, <RatingField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'customRating':
                setNewFields(old => ([...old, <CustomRatingField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'options':
                setNewFields(old => ([...old, <OptionsField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'phoneNumber':
                setNewFields(old => ([...old, <PhoneNumberField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'number':
                setNewFields(old => ([...old, <NumberField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'label':
                setNewFields(old => ([...old, <LabelField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'job':
                setNewFields(old => ([...old, <JobField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'gender':
                setNewFields(old => ([...old, <GenderField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'email':
                setNewFields(old => ([...old, <EmailField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'double':
                setNewFields(old => ([...old, <DoubleField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'date':
                setNewFields(old => ([...old, <DateField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
        }
    }

    function removeField(index) {
        setNewFields(newFields.filter((newField, i) => i != index));
    }

    React.useEffect(() => {
    }, [fieldsConfigs])

    const [type, setType] = React.useState('')

    async function submit() {
        try {
            const res = await axios.post(ApiEndpoints.createFormStructure, {
                type: type,
                array_of_fields: {
                    class: 'App\\FieldsTypes\\ArrayOfFields',
                    fields: fieldsConfigs
                }
            })
            console.log(res.data)

        } catch (err) {
            logError(err)
        }
    }

    return (

        <>
            name of the form structure <input type="string" onChange={(e) => setType(e.target.value)} />

            <ul className="list-group">
                {
                    newFields.map((NewField, index) => (
                        <li key={index} className="list-group-item">
                            <div className="row">
                                <div className="col">{NewField}</div>
                                <div className="col">
                                    <button type="button" onClick={() => removeField(index)}>X</button>
                                </div>
                            </div>


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
                <button onClick={() => submit()}>
                    submit
                </button>
            </ul>
        </>

    );
}

export default FieldsCreator;
