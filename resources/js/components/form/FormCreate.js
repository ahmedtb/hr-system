import React from 'react';
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'

export default function FormCreate(props) {
    const [forms, setForms] = React.useState([])
    React.useEffect(() => {
        axios.get(ApiEndpoints.showForms).then((response) => {
            setForms(response.data)
        }).catch(() => {

        })
    }, [])
    return (
        <div class="col-md-10">
            <div class="card">
                {/* <div class="card-header">نموذج {{ $structure->id }}</div> */}

                <div class="card-body">

                    
                    {/* <ul class="list-group">
                        @foreach($structure->array_of_fields->getFields() as $index => $field)
                            <li class="list-group-item">
                                {{ $field->formInput($index) }}
                            </li>
                        @endforeach
                        
                        {!! Form::submit('ارسال النموذج') !!}
                    </ul>
                    {{ Form::close() }} */}



                </div>

            </div>
        </div>
    )
}

