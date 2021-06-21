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
        @if(Session::has('tokenURL'))
            <div class="alert alert-success" id="alert">
                <strong>Success:</strong> {{Session::get('tokenURL')}}
            </div>

        @elseif(session('error'))
            <div class="alert alert-danger" id="alert">  
                <strong>Error:</strong>{{Session::get('error')}}
            </div>
        @endif
            <div class="col-md-10">
                <div class="card">
                    <div class="card-header">
                        نموذج {{$structure->id}}
                        <a type="button" href="{{route('formSearchForm',$structure->id)}}">search</a>
                    </div>

                        <div class="card-body">
                            @foreach ($structure->array_of_fields->getFields() as $field)
                            <div class='list-group mb-5'>
                                <div class="list-group-item">
                                {{$field->render()}}

                            </div>
                        </div>
                            @endforeach
                        
                            <form action="{{ route('generateForm',['form_structure_id' => $structure->id]) }}" method="get">
                                <input type="submit" value="انشاء نسخة نموذج" />
                            </form>
                        </div>

                    </div>
            </div>
        </div>
    </div>
@endsection
