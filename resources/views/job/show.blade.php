{{-- {{dd($job)}} --}}

@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">الوحدة الادارية {{ $job->name }}</div>

                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item">الغرض من الوحدة: {{ $job->purpose }}</li>
                        <li class="list-group-item">وصف الوحدة:{!! $job->description !!}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="card-header">الموظفيين</div>
                    @include('partials.EmployeesList',['employees'=>$job->employees])
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
