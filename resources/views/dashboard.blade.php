@extends('layouts.app')

@section('content')

    <div class='row justify-content-center'>

        @if (Session::has('success'))
            <div class="alert alert-success" id="alert">
                <strong>Success:</strong> {{ Session::get('success') }}
            </div>

        @elseif(session('error'))
            <div class="alert alert-danger" id="alert">
                <strong>Error:</strong>{{ Session::get('error') }}
            </div>
        @endif

        <div class="col-md-3">
            @include('partials.ActionsPanel')
        </div>



        <div class='col-md-9'>
            <div class="card">
                <div class="card-header">
                    احصائية عامة
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-6">
                            <div class="list-group">
                                <div class="list-group-item">
                                    عدد الموظفين في المنظومة {{ $employeesCount }}
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="list-group">
                                <div class="list-group-item">
                                    عدد المستهدفين في المنظومة {{ $targetedCount }}
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="list-group">
                                <div class="list-group-item">
                                    عدد المدربين في المنظومة {{ $coachesCount }}
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="list-group">
                                <div class="list-group-item">
                                    عدد الحقائب التدريبية في المنظومة {{ $programsCount }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mt-1">
                        <div class="card-header">
                            <h5>اخر نماذج تم تعبئتها</h5>
                        </div>
                        <div class="card-body">
                            @include('partials.FormsTable',['forms'=>$forms])

                        </div>
                    </div>



                    <div class="card mt-1">

                        <div class="card-header">
                            <h5 class=''>الدورات الجارية: {{ $resumedCourses->count() }}</h5>
                        </div>
                        <div class=" card-body">
                            @include('partials.resumedCoursesTable',['resumedCourses'=>$resumedCourses])
                        </div>
                    </div>


                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    التركيبة الادارية
                </div>
                <div class="card-body">
                    @include('partials.UnitsList2',['units' => $units])
                </div>
            </div>


        </div>
    </div>

@endsection
