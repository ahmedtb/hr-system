import React from 'react';
import axios from 'axios'
import FieldsCreator from '../FieldsCreator'
export default function FormCreate(props) {
    
    return (
        <div class="col-md-10">
            <div class="card">
                <div class="card-header">انشاء نوع نماذج جديد</div>

                <div class="card-body">

                    <FieldsCreator />
                    
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

