@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">نموذج {{ $structure->id }}</div>

                <div class="card-body">

                    {{ 
                        Form::open(array(
                            'route' => ['submitForm',request()->access_token], 
                            'method' => 'post', 
                            'files' => 'true'
                        ))
                    }}
                    <ul class="list-group">
                        @foreach($structure->array_of_fields->getFields() as $field)
                            <li class="list-group-item">
                                {{ $field->render() }}
                               

                            </li>
                        @endforeach
                        {!! Form::label('fields[1][label]', 'اسم الموظف') !!}
                        {!! Form::hidden('fields[1][label]', 'اسم الموظف') !!}
                        {!! Form::text('fields[1][value]', '') !!}
                        {!! Form::submit('ارسال النموذج') !!}
                    </ul>
                    {{ Form::close() }}



                </div>

            </div>
        </div>
    </div>
</div>
@endsection
