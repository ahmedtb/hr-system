@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6">
            @if($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
        </div>
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">نموذج {{ $structure->id }}</div>

                <div class="card-body">

                    {{ 
                        Form::open(array(
                            'route' => ['formSearch',$structure->id], 
                            'method' => 'post', 
                            'files' => 'true'
                        ))
                    }}
                    <ul class="list-group">
                        @foreach($structure->array_of_fields->getFields() as $index => $field)
                            <li class="list-group-item">
                                {{ $field->formInput($index) }}
                            </li>
                        @endforeach
                        
                        {!! Form::submit('بحث نموذج') !!}
                    </ul>
                    {{ Form::close() }}



                </div>

            </div>
        </div>
    </div>
</div>
@endsection
