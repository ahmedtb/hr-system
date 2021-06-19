@extends('layouts.app')

@section('content')
<script>
    var csrf_token = '{{ csrf_token()}}';
</script>
<div class="container">
    <div class="row justify-content-center">

        <div class="col-md-8">
            <div class="card">
                <div class="card-header">انشاء نوع نموذج جديد</div>

                <div class="card-body">
                    <div id='FieldsCreator' />
                </div>
            </div>

        </div>

    </div>

</div>

@endsection
