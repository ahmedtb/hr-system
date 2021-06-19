@extends('layouts.app')

@section('content')

<style>
    .tree,
.tree ul,
.tree li {
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
}

.tree {
    margin: 0 0 1em;
    text-align: center;
}

.tree,
.tree ul {
    display: table;
}

.tree ul {
    width: 100%;
}

.tree li {
    display: table-cell;
    padding: .5em 0;
    vertical-align: top;
}

.tree li:before {
    outline: solid 1px #666;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
}

.tree li:first-child:before {
    left: 50%;
}

.tree li:last-child:before {
    right: 50%;
}

.tree code,
.tree span {
    border: solid .1em #666;
    border-radius: .2em;
    display: inline-block;
    margin: 0 .2em .5em;
    padding: .2em .5em;
    position: relative;
}

.tree ul:before,
.tree code:before,
.tree span:before {
    outline: solid 1px #666;
    content: "";
    height: .5em;
    left: 50%;
    position: absolute;
}

.tree ul:before {
    top: -.5em;
}

.tree code:before,
.tree span:before {
    top: -.55em;
}

.tree>li {
    margin-top: 0;
}

.tree>li:before,
.tree>li:after,
.tree>li>code:before,
.tree>li>span:before {
    outline: none;
}
</style>


<div class="container">
    <div class="row justify-content-center">
        @if(Session::has('success'))
            <div class="alert alert-success" id="alert">
                <strong>Success:</strong> {{Session::get('success')}}
            </div>

        @elseif(session('error'))
            <div class="alert alert-danger" id="alert">  
                <strong>Error:</strong>{{Session::get('error')}}
            </div>
        @endif
    </div>
    <div class="row justify-content-center">
        <div class="col-md-3">
            @include('partials.ActionsPanel')
        </div>

        <div class="col-md-9">
            <div class="card">
                <div class="card-header">الوحدات الادارية</div>

                <div class="card-body">
                    <ul class="tree">
                        @include('partials.UnitsList',['units' => $top])
                    </ul>
                </div>

            </div>
        </div>
    </div>
</div>
@endsection
