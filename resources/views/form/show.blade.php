@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            @if($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        @if(Session::has('success'))
            <div class="alert alert-success" id="alert">
                <strong>Success:</strong> {{Session::get('success')}}
            </div>

        @elseif(session('error'))
            <div class="alert alert-danger" id="alert">  
                <strong>Error:</strong>{{Session::get('error')}}
            </div>
        @endif
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">نموذج {{$form->id}}</div>

                        <div class="card-body">
                            @foreach ($form->filled_fields->getFields() as $field)
                                {{$field->render()}}
                            @endforeach
                        
                        </div>

                    </div>
            </div>
        </div>
    </div>
@endsection
