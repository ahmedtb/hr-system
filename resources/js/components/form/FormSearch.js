import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints';
import logError from '../utility/logError';
import Field from '../fields/Field';
export default function FormSearch(props) {
    const { form_structure_id } = useParams()
    const [structure, setStructure] = React.useState(null)
    const [fields, setFields] = React.useState(null)

    async function getStructure() {
        try {
            const res = await axios.get(ApiEndpoints.showFormStructure.replace(':id', form_structure_id))
            setStructure(res.data)
            setFields(res.data.array_of_fields.fields)
        } catch (err) {
            logError(err)
        }
    }

    function setField(index, value) {
        let newArr = [...fields];
        newArr[index] = value
        setFields(newArr)
    }

    const [selects, setSelects] = React.useState([])
    function fieldSelection(index) {
        let newArr = [...selects];
        newArr[index] = selects[index] ? !selects[index] : true
        setSelects(newArr)
    }

    React.useEffect(() => {
        getStructure()
    }, [])

    async function submit() {
        let submitFields = []
        selects.map((select, index) => {
            if (select == true)
                submitFields.push(fields[index])
        })
        console.log(submitFields)

        if (submitFields.length > 0) {
            structure.array_of_fields.fields = submitFields
            const res = await axios.post(ApiEndpoints.formSearch.replace(':form_structure_id', form_structure_id), {
                fields: structure.array_of_fields
            })
            console.log(res.data)
        }else{
            console.log('please select fields for the search request')
        }
    }
    return (

        <>
            <ul className="list-group">
                <li className="list-group-item">
                    {
                        fields?.map((field, index) => (
                            <div key={index}>
                                <input type="checkbox" onChange={() => fieldSelection(index)} />
                                <Field type={'input'} field={field} setField={(value) => setField(index, value)} />
                            </div>
                        ))
                    }
                </li>
                <li className="list-group-item">
                    <button onClick={submit}>
                        submit search
                    </button>
                </li>
            </ul>
        </>
    );
}
