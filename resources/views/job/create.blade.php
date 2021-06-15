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
                <div class="card-header">اضافة موظف</div>

                <div class="card-body">
                    {{ Form::open(array('url' => route('createJob'), 'method' => 'post')) }}

                    <ul class="list-group">
                        {!! Form::hidden('unit_id', $unit_id) !!}
                        <li class="list-group-item">
                            {!! Form::label('name', 'اسم الوظيفة') !!}
                            {!! Form::text('name', '') !!}
                        </li>
                        <li class="list-group-item">
                            {!! Form::label('purpose', 'الغرض العام للوظيفة او اهدافها') !!}
                            {!! Form::text('purpose') !!}
                        </li>
                        <li class="list-group-item">
                            {!! Form::label('description', 'وصفة الوظيفة') !!}
                            {!! Form::textArea('description', '') !!}
                        </li>

                        {!! Form::submit('تسجيل') !!}
                    </ul>
                    {{ Form::close() }}
                </div>
            </div>

        </div>
    </div>
</div>
@endsection
