@extends('layouts.app')

@section('content')

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                @if ($errors->any())
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
                <div class="card">
                    <div class="card-header">اضافة برنامج تدريبي</div>

                    <div class="card-body">
                        {{ Form::open(['url' => route('createProgram'), 'method' => 'post', 'files' => 'true']) }}

                        <ul class="list-group">
                            <li class="list-group-item">
                                {!! Form::label('title', 'عنوان البرنامج') !!}
                                {!! Form::text('title', '') !!}
                            </li>

                            <li class="list-group-item">
                                {!! Form::label('goals', 'اهداف البرنامج') !!}
                                {!! Form::text('goals', '') !!}
                            </li>

                            <li class="list-group-item">
                                {!! Form::label('period', 'مدة البرنامج بالدقائق') !!}
                                {!! Form::number('period', '') !!}
                            </li>

                            <li class="list-group-item">
                                {!! Form::label('category', 'تصنيف') !!}
                                {!! Form::text('category', '') !!}
                            </li>

                            <li class="list-group-item">
                                {!! Form::label('details', 'تفاصيل') !!}
                                {!! Form::text('details', '') !!}
                            </li>

                            <li class="list-group-item">
                                {!! Form::label('documents[]', 'مستندات البرنامج') !!}
                                {!! Form::file('documents[]', ['multiple' => true, 'accept' => 'image/*']) !!}
                            </li>

                            <li class="list-group-item">
                                {!! Form::submit('انشاء') !!}
                            </li>

                        </ul>
                        {{ Form::close() }}
                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection
