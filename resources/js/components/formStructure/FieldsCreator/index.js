import React from 'react';
import ApiEndpoints from '../../utility/ApiEndpoints'
import logError from '../../utility/logError'

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
    'حقل نص طويل', 'حقل جدول', 'حقل نصي', 'حقل حالة اجتماعية', 'حقل تقييم', 'حقل تقييم متغيير', 'حقل خيارات',
    'حقل رقم هاتف', 'حقل رقم', 'حقل نص توضيحي', 'حقل تحديد الوظيفة', 'حقل تحديد الجنس',
    'حقل البريد الالكتروني', 'حقل رقم مركب', 'حقل تاريخ',
]
function FieldsCreator() {

    const [fieldsConfigs, setFieldsConfigs] = React.useState({})

    function setFieldConfig(index, config) {
        setFieldsConfigs(data => ({
            ...data,
            [index]: config
        }))
    }

    function typeChoice(e) {
        addField(e.target.value)
    }
    const [newFields, setNewFields] = React.useState([])

    function addField(type) {
        switch (type) {
            case 'حقل نص طويل':
                setNewFields(old => ([...old, <TextAreaField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'حقل جدول':
                setNewFields(old => ([...old, <TableField2 setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'حقل نصي':
                setNewFields(old => ([...old, <StringField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'حقل حالة اجتماعية':
                setNewFields(old => ([...old, <SocialStatusField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'حقل تقييم':
                setNewFields(old => ([...old, <RatingField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'حقل تقييم متغيير':
                setNewFields(old => ([...old, <CustomRatingField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'حقل خيارات':
                setNewFields(old => ([...old, <OptionsField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'حقل رقم هاتف':
                setNewFields(old => ([...old, <PhoneNumberField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'حقل رقم':
                setNewFields(old => ([...old, <NumberField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'حقل نص توضيحي':
                setNewFields(old => ([...old, <LabelField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'حقل تحديد الوظيفة':
                setNewFields(old => ([...old, <JobField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'حقل تحديد الجنس':
                setNewFields(old => ([...old, <GenderField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'حقل البريد الالكتروني':
                setNewFields(old => ([...old, <EmailField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'حقل رقم مركب':
                setNewFields(old => ([...old, <DoubleField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
            case 'حقل تاريخ':
                setNewFields(old => ([...old, <DateField setField={(config) => setFieldConfig(newFields.length, config)} />]))
                break;
        }
    }

    function removeField(index) {
        // setFieldsConfigs({})
        // setNewFields(old => {
        //     let a = [...old]
        //     a = a.filter((element, i) => i != index)
        //     console.log(a)

        //     a.map((field, i)=>{
        //         console.log(field)
        //         // field.props.setField = (config) => setFieldConfig(i, config)
        //     })

        //     return a
        // })
        // setFieldsConfigs(pre => {
        //     let newConfig = {...pre}
        //     delete newConfig[index]
        //     let reorderIndexes = {}
        //     let i = 0
        //     for (const [key, value] of Object.entries(newConfig)) {
        //         console.log('value', value)
        //         reorderIndexes[i] = value
        //         i++
        //     }
        //     return reorderIndexes
        // })

    }

    React.useEffect(() => {
        console.log(fieldsConfigs)
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

        <div>
            <div className="text-center m-4">
                <h3 className="row justify-content-center">عنوان النموذج</h3>
                <input size="50" className="align-self-center" type="string" onChange={(e) => setType(e.target.value)} />
            </div>

            <div className="">
                {
                    newFields.map((NewField, index) => (
                        <div key={index} className="col-12 border border-secondary rounded my-2 py-3">
                            {/* <div className="row">
                                <button className="btn btn-secondary ml-auto" type="button" onClick={() => removeField(index)}>X</button>
                            </div> */}
                            <div className="row justify-content-center">{NewField}</div>
                        </div>
                    ))
                }
            </div>

            <div className="row justify-content-between border">
                <select
                    value={''}
                    onChange={typeChoice}
                    className="p-2 rounded m-2"
                >
                    <option value=''>اضف نوع حقل</option>
                    {
                        fieldsTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))
                    }
                </select>

                <button className="btn btn-primary m-2" onClick={() => submit()}>
                    انشاء
                </button>
            </div>
        </div>

    );
}

export default FieldsCreator;
