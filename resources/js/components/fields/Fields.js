import React from 'react'
import StringField from './StringField'
import OptionsField from './OptionsField'

export default function Fields(props) {
    const fields = props.fields
    const setFields = props.setFields
    function changeField(index, value) {
        let newArr = [...fields];
        newArr[index] = value
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
                        default: return null
                    }
                })
            }
        </>
    )
}