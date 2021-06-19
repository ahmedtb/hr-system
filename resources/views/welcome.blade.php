@extends('layouts.app')

@section('content')

    <div class='row'>



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
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="list-group">
                                <div class="list-group-item">
                                    <span>اخر نموذج تم تعبئته</span>
                                </div>
                            </div>

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
