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
    const field = props.field
    const setField = props.setField

    const type = props.type


    return (
        <>
            {(() => {


                switch (field.class) {
                    case 'App\\FieldsTypes\\StringField':
                        return <StringField
                            
                            type={type}
                            value={field}
                            
                            onChange={(value) => setField(value)}
                        />
                    case 'App\\FieldsTypes\\OptionsField':
                        return <OptionsField
                            
                            type={type}
                            value={field}
                            
                            onChange={(value) => setField(value)}
                        />
                    case 'App\\FieldsTypes\\DateField':
                        return <DateField
                            
                            type={type}
                            value={field}
                            
                            onChange={(value) => setField(value)}
                        />
                    case 'App\\FieldsTypes\\TextAreaField':
                        return <TextAreaField
                            
                            type={type}
                            value={field}
                            
                            onChange={(value) => setField(value)}
                        />
                    case 'App\\FieldsTypes\\TableField2':
                        return <TableField
                            
                            type={type}
                            value={field}
                            
                            onChange={(value) => setField(value)}
                        />
                    case 'App\\FieldsTypes\\GenderField':
                        return <GenderField
                            
                            type={type}
                            value={field}
                            
                            onChange={(value) => setField(value)}
                        />
                    case 'App\\FieldsTypes\\SocialStatusField':
                        return <SocialStatusField
                            
                            type={type}
                            value={field}
                            
                            onChange={(value) => setField(value)}
                        />
                    case 'App\\FieldsTypes\\PhoneNumberField':
                        return <PhoneNumberField
                            
                            type={type}
                            value={field}
                            
                            onChange={(value) => setField(value)}
                        />
                    case 'App\\FieldsTypes\\EmailField':
                        return <EmailField
                            
                            type={type}
                            value={field}
                            
                            onChange={(value) => setField(value)}
                        />
                    case 'App\\FieldsTypes\\DoubleField':
                        return <DoubleField
                            
                            type={type}
                            value={field}
                            
                            onChange={(value) => setField(value)}
                        />
                    case 'App\\FieldsTypes\\JobField':
                        return <JobField
                            
                            type={type}
                            value={field}
                            
                            onChange={(value) => setField(value)}
                        />

                    case 'App\\FieldsTypes\\RatingField':
                        return <RatingField
                            
                            type={type}
                            value={field}
                            
                            onChange={(value) => setField(value)}
                        />
                    case 'App\\FieldsTypes\\NumberField':
                        return <NumberField
                            
                            type={type}
                            value={field}
                            
                            onChange={(value) => setField(value)}
                        />
                    case 'App\\FieldsTypes\\LabelField':
                        return <LabelField
                            
                            type={type}
                            value={field}
                            
                            onChange={(value) => setField(value)}
                        />
                    case 'App\\FieldsTypes\\CustomRatingField':
                        return <CustomRatingField
                            
                            type={type}
                            value={field}
                            
                            onChange={(value) => setField(value)}
                        />


                    default: return <div >{field.class}</div>
                }

            })()}
        </>
    )
}