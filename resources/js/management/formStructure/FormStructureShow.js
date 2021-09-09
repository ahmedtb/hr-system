import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import routes from '../utility/routesEndpoints'
import logError from '../utility/logError'
import Fields from '../fields/Fields'
import { useParams, Redirect } from 'react-router-dom';
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
            // console.log('avaliableTokens', res.data)
        } catch (err) { logError(err) }
    }

    async function deleteToken(token_id) {
        try {
            const res = await axios.delete(ApiEndpoints.deleteToken.replace(':id', token_id))
            avaliableTokens()
            console.log('deleteToken', res.data)
        } catch (err) { logError(err) }
    }

    async function deleteFormStructure() {
        try {
            const res = await axios.delete(ApiEndpoints.deleteFormStructure.replace(':id', structure.id))
            console.log('deleteFormStructure', res.data)
            setredirect(true)
        } catch (err) { logError(err) }
    }
    const [redirect, setredirect] = React.useState(false)
    if (redirect)
        return <Redirect to={routes.showFormsStructures} />

    return (
        <div className="col-md-12">

            <div className="card">
                <div className="card-header">
                    <div className="d-flex flex-row justify-content-between">
                        <h3>
                            نموذج {structure?.id}
                        </h3>
                        <div className="">
                            <AllowedLink to={routes.searchForms.replace(':form_structure_id', structure?.id)}>
                                <FaSearch />
                                بحث في النماذج المعبئة
                            </AllowedLink>


                            <CustomModal buttonClass="btn btn-outline-primary ml-2" label={'نسخ النوع'}>
                                <input type="number" min="1" value={copies} onChange={(e) => setcopies(e.target.value)} />
                                <button type='button' className='btn btn-primary' onClick={generateForm}>
                                    انشاء نسخة من نموذج
                                </button>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">رابط النسخ</th>
                                            <th scope="col">عدد نسخ</th>
                                            <th scope="col">تاريخ انتهاء الصلاحية</th>
                                            <th scope="col">#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            tokens.map((token, index) => (
                                                <tr key={index}>
                                                    <th scope="row">
                                                        <AllowedLink target="_blank" to={routes.generatedForm.replace(':access_token', token.access_token)}>
                                                            {routes.generatedForm.replace(':access_token', token.access_token)}
                                                        </AllowedLink>
                                                    </th>
                                                    <td>{token.copies}</td>
                                                    <td>{token.expiration_date}</td>
                                                    <td><FaTrash size={20} onClick={() => deleteToken(token.id)} /></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>

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
            <CustomModal buttonClass="btn btn-danger" label={'حدف نوع النماذج'} >
                <div>
                    هل تود فعلا حدف نوع النماذج هذا بشكل دائما؟
                </div>
                <button className="btn btn-danger" onClick={deleteFormStructure} data-dismiss="modal">نعم</button>
                <button className='btn btn-success' data-dismiss="modal">لا</button>

            </CustomModal>

        </div>
    )
}