@extends('layouts.app')

@section('content')
@if(Route::has('login'))
    <div class="row">
        <div class='col-md-10'>
            @auth
                <a href="{{ route('home') }}" class="text-sm text-gray-700 underline">Home</a>
            @else
                <a href="{{ route('login') }}" class="text-sm text-gray-700 underline">Log in</a>

                @if(Route::has('register'))
                    <a href="{{ route('register') }}"
                        class="ml-4 text-sm text-gray-700 underline">Register</a>
                @endif
            @endauth
        </div>

    </div>
@endif

<div class='row'>



    <div class="col-md-2">


        <div class="panel">
            <div class="panel-heading">
                طلبات متاحة
            </div>

            <ul class="list-group">
                <li class="list-group-item">
                    <form action="/employee/create" method="get">
                        <input type="submit" value="تسجيل موظف" />
                    </form>
                </li>
            </ul>
        </div>
    </div>

    <div class='col-md-10'>

    </div>
</div>

@endsection
