@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">نموذج {{$structure->id}}</div>

                        <div class="card-body">
                            @foreach ($structure->array_of_fields->getFields() as $field)
                                {{$field->render()}}
                            @endforeach
                        
                        </div>

                    </div>
            </div>
        </div>
    </div>
@endsection
