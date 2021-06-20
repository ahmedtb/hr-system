@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                @if (Session::has('success'))
                    <div class="alert alert-success" id="alert">
                        <strong>Success:</strong> {{ Session::get('success') }}
                    </div>

                @elseif(session('error'))
                    <div class="alert alert-danger" id="alert">
                        <strong>Error:</strong>{{ Session::get('error') }}
                    </div>
                @endif
            </div>

            <div class="col-md-10">
                <div class="card">
                    <div class="card-header">النماذج المعبئة</div>

                    <div class="card-body">

                        @include('partials.FormsTable',['forms'=>$forms])

                    </div>

                </div>
            </div>
        </div>
    </div>
@endsection
