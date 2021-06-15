@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row justify-content-center">

        <div class="col-md-2">


            <div class="panel">
                <div class="panel-heading">
                    طلبات متاحة
                </div>
    
                <ul class="list-group">
                    <li class="list-group-item">
                        <form action="{{route('createJobForm',[ 'unit_id'=>$unit->id ] )}}" method="get">
                            <input type="submit" value="تسجيل وظيفة" />
                        </form>
                    </li>
                </ul>
            </div>
        </div>

        <div class="col-md-8">
            <div class="card">
                <div class="card-header">الوحدة الادارية {{ $unit->name }}</div>

                <div class="card-body">
                    <ul class="list-group">
                        @if($unit->parent)
                            <li class="list-group-item">الوحدة العليا:
                                <a
                                    href="{{ route('showUnit',$unit->parent->id) }}">{{ $unit->name }}</a>
                            </li>
                        @endif
                        <li class="list-group-item">الغرض من الوحدة: {{ $unit->purpose }}</li>
                        <li class="list-group-item">رئيس الوحدة:
                            <a
                                href="{{ route('showHead',$unit->head->id) }}">{{ $unit->head->id }}</a>
                        </li>
                    </ul>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="card-header">الموظفيين</div>
                        @include('partials.EmployeesList',['employees'=>$unit->employees])
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="card-header">الموظفيين</div>
                        @include('partials.JobsList',['jobs'=>$unit->jobs])
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
@endsection
