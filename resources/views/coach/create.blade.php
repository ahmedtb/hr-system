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
                    <div class="card-header">اضافة موظف</div>

                    <div class="card-body">

                        <div id="CreateCoach" employees='{{ $employees }}'
                            targetedIndividuals='{{ $targetedIndividuals }}' formRoute='{{ route('createCoach') }}' />

                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection
