@extends('layouts.app')

@section('content')

<div class='row'>



    <div class="col-md-3">
        @include('partials.ActionsPanel')
    </div>

    <div class='col-md-9'>
        <div class="card-header">
            احصائية عامة
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-6">
                    <div class="list-group">
                        <div class="list-group-item">
                            عدد الموظفين في المنظومة
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="list-group">
                        <div class="list-group-item">
                            عدد المستهدفين في المنظومة
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
</div>

@endsection
