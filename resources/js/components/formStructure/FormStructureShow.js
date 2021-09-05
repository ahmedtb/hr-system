import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints'
import logError from '../utility/logError'
import Fields from '../fields/Fields'
import { useParams, Link } from 'react-router-dom';
import AllowedLink from '../components/AllowedLink'
import { FaSearch, FaTrash } from 'react-icons/fa'
import CustomModal from '../components/CustomModal'

export default function FormStructureShow(props) {

    const { id } = useParams();
    const [structure, setStructure] = React.useState(null)
    React.useEffect(() => {
        axios.get(ApiEndpoints.showFormStructure.replace(':id', id)).then((response) => {
            setStructure(response.data)
        }).catch((error) => { logError(error) })
        avaliableTokens()
    }, [])

    const [copies, setcopies] = React.useState(1)

    async function generateForm() {
        try {
            const res = await axios.post(ApiEndpoints.generateForm, {
                'form_structure_id': structure.id,
                'copies': copies
            })
            console.log('generateForm', res.data)
            avaliableTokens()
        } catch (err) { logError(err) }
    }

    const [tokens, settokens] = React.useState([])
    async function avaliableTokens() {
        try {
            const res = await axios.get(ApiEndpoints.avaliableTokens.replace(':id', id))
            settokens(res.data)
            console.log('avaliableTokens', res.data)
        } catch (err) { logError(err) }
    }

    async function deleteToken(token_id) {
        try {
            const res = await axios.delete(ApiEndpoints.deleteToken.replace(':id', token_id))
            avaliableTokens()
            console.log('deleteToken', res.data)
        } catch (err) { logError(err) }
    }

    return (
        <div className="col-md-12">

            <div className="card">
                <div className="card-header">
                    <div className="d-flex flex-row justify-content-between">
                        <div>نموذج {structure?.id}</div>
                        <div className="">
                            <AllowedLink to={routes.searchForms.replace(':form_structure_id', structure?.id)}>
                                <FaSearch />
                                بحث في النماذج المعبئة
                            </AllowedLink>

                            <CustomModal label={'copies'}>
                                <input type="number" min="1" value={copies} onChange={(e) => setcopies(e.target.value)} />
                                <button type='button' className='btn btn-primary' onClick={generateForm}>
                                    انشاء نسخة من نموذج
                                </button>
                                {
                                    tokens.map((token, index) => (
                                        <div key={index} className="col-12">
                                            <AllowedLink target="_blank" to={routes.generatedForm.replace(':access_token', token.access_token)}>
                                                {routes.generatedForm.replace(':access_token', token.access_token)}
                                            </AllowedLink>
                                            {token.copies} {token.expiration_date}
                                            <FaTrash size={20} onClick={() => deleteToken(token.id)} />
                                        </div>
                                    ))
                                }
                            </CustomModal>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="row justify-content-center">
                        <h1 className='align-self-center'>{structure?.type}</h1>
                    </div>
                    <div className="row">
                        <Fields fields={structure?.array_of_fields.fields} type='render' />
                    </div>

                </div>

            </div>
        </div>
    )
}