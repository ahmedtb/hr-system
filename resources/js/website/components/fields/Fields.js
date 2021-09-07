import React from 'react'
import StringField from './StringField'
import OptionsField from './OptionsField'
import DateField from './DateField'
import TextAreaField from './TextAreaField'
import TableField from './TableField'
import GenderField from './GenderField'
import SocialStatusField from './SocialStatusField'
import PhoneNumberField from './PhoneNumberField'
import EmailField from './EmailField'
import DoubleField from './DoubleField'
import JobField from './JobField'
import RatingField from './RatingField'
import NumberField from './NumberField'
import LabelField from './LabelField'
import CustomRatingField from './CustomRatingField'

export default function Fields(props) {
    const fields = props.fields
    const setFields = props.setFields
    function changeField(index, value) {
        let newArr = [...fields];
        newArr[index] = value
        // console.log('input fields', newArr)
        setFields(newArr)
    }
    const type = props.type

    return (
        <>
            {
                fields?.map((field, index) => {

                    switch (field.class) {
                        case 'App\\FieldsTypes\\StringField':
                            return <StringField
                                key={index}
                                type={type}
                                value={field}
                                index={index}
                                onChange={(value) => changeField(index, value)}
                            />
                        case 'App\\FieldsTypes\\OptionsField':
                            return <OptionsField
                                key={index}
                                type={type}
                                value={field}
                                index={index}
                                onChange={(value) => changeField(index, value)}
                            />
                        case 'App\\FieldsTypes\\DateField':
                            return <DateField
                                key={index}
                                type={type}
                                value={field}
                                index={index}
                                onChange={(value) => changeField(index, value)}
                            />
                        case 'App\\FieldsTypes\\TextAreaField':
                            return <TextAreaField
                                key={index}
                                type={type}
                                value={field}
                                index={index}
                                onChange={(value) => changeField(index, value)}
                            />
                        case 'App\\FieldsTypes\\TableField2':
                            return <TableField
                                key={index}
                                type={type}
                                value={field}
                                index={index}
                                onChange={(value) => changeField(index, value)}
                            />
                        case 'App\\FieldsTypes\\GenderField':
                            return <GenderField
                                key={index}
                                type={type}
                                value={field}
                                index={index}
                                onChange={(value) => changeField(index, value)}
                            />
                        case 'App\\FieldsTypes\\SocialStatusField':
                            return <SocialStatusField
                                key={index}
                                type={type}
                                value={field}
                                index={index}
                                onChange={(value) => changeField(index, value)}
                            />
                        case 'App\\FieldsTypes\\PhoneNumberField':
                            return <PhoneNumberField
                                key={index}
                                type={type}
                                value={field}
                                index={index}
                                onChange={(value) => changeField(index, value)}
                            />
                        case 'App\\FieldsTypes\\EmailField':
                            return <EmailField
                                key={index}
                                type={type}
                                value={field}
                                index={index}
                                onChange={(value) => changeField(index, value)}
                            />
                        case 'App\\FieldsTypes\\DoubleField':
                            return <DoubleField
                                key={index}
                                type={type}
                                value={field}
                                index={index}
                                onChange={(value) => changeField(index, value)}
                            />
                        case 'App\\FieldsTypes\\JobField':
                            return <JobField
                                key={index}
                                type={type}
                                value={field}
                                index={index}
                                onChange={(value) => changeField(index, value)}
                            />

                        case 'App\\FieldsTypes\\RatingField':
                            return <RatingField
                                key={index}
                                type={type}
                                value={field}
                                index={index}
                                onChange={(value) => changeField(index, value)}
                            />
                        case 'App\\FieldsTypes\\NumberField':
                            return <NumberField
                                key={index}
                                type={type}
                                value={field}
                                index={index}
                                onChange={(value) => changeField(index, value)}
                            />
                        case 'App\\FieldsTypes\\LabelField':
                            return <LabelField
                                key={index}
                                type={type}
                                value={field}
                                index={index}
                                onChange={(value) => changeField(index, value)}
                            />
                        case 'App\\FieldsTypes\\CustomRatingField':
                            return <CustomRatingField
                                key={index}
                                type={type}
                                value={field}
                                index={index}
                                onChange={(value) => changeField(index, value)}
                            />


                        default: return <div key={index}>{field.class}</div>
                    }
                })
            }
        </>
    )
}