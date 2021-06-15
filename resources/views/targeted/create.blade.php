@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10">
            @if($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
            <div class="card">
                <div class="card-header">اضافة فرد مستهدف</div>

                <div class="card-body">
                    {{ Form::open(array('url' => 'targeted/create', 'method' => 'post', 'files' => 'true')) }}

                    <ul class="list-group">

                        <li class="list-group-item">
                            {!! Form::label('documents[]', 'مستندات تخص المستهدف') !!}
                            {!! Form::file('documents[]',['multiple'=>true, 'accept'=>"image/*"]) !!}
                        </li>

                        <li class="list-group-item">
                            {!! Form::submit('تسجيل') !!}
                        </li>

                    </ul>
                    {{ Form::close() }}
                </div>
            </div>

        </div>
    </div>
</div>
@endsection
