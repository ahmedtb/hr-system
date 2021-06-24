import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import ApiEndpoints from '../utility/ApiEndpoints';
import logError from '../utility/logError';

export default function FormSearch(props) {
    const {form_structure_id} = useParams()
    const [structure, setStructure] = React.useState(null)
    async function getStructure(){
        try{
            const res = await axios.get(ApiEndpoints.showFormStructure.replace(':id',form_structure_id))
            setStructure(res.data)
        }catch(err){
            logError(err)
        }
    }
    return (

        <>            
        

            <ul class="list-group">


                <li class="list-group-item">
                    <input type="button" onClick={} value="بحث" />
                </li>

            </ul>

        </>

    );
}
