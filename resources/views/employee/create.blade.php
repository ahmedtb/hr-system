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
                    {{ Form::open(array('url' => 'employee/create', 'method' => 'post', 'files' => 'true')) }}

                    <ul class="list-group">
                        <li class="list-group-item">
                            {!! Form::label('name', 'اسم الموظف') !!}
                            {!! Form::text('name', '') !!}
                        </li>
                        <li class="list-group-item">

                            {!! Form::label('address', 'عنوان الموظف') !!}
                            {!! Form::text('address', '') !!}
                        </li>
                        <li class="list-group-item">

                            {!! Form::label('employment_date', 'تاريخ التوظيف') !!}
                            {!! Form::date('employment_date', '') !!}
                        </li>
                        <li class="list-group-item">

                            {!! Form::label('basic_salary', 'مرتب الموظف') !!}
                            {!! Form::number('basic_salary', '') !!}
                        </li>
                        <li class="list-group-item">

                            {!! Form::label('phone_number', 'رقم هاتف الموظف') !!}
                            {!! Form::text('phone_number', '') !!}
                        </li>

                        <li class="list-group-item">
                            {!! Form::label('job_id', 'الوظيفة') !!}
                            {!! Form::select('job_id', array_merge(['' => 'الرجاء اختيار نوع الوظيفة'],$jobs)) !!}
                        </li>
                        <li class="list-group-item">

                            {!! Form::label('email', 'بريد الكتروني') !!}
                            {!! Form::email('email', '') !!}
                        </li>

                        <li class="list-group-item">

                            {!! Form::label('documents[]', 'مستندات الموظف') !!}
                            {!! Form::file('documents[]',['multiple'=>true, 'accept'=>"image/*"]) !!}
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
