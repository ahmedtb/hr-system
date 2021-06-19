@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
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

            <div class="col-md-10">
                <div class="card">
                    <div class="card-header">النماذج المعبئة</div>

                        <div class="card-body">
                            
                            <table class="table table-striped table-condensed" style="margin-bottom: 0px">
                                <thead>
                                    <tr>
                                        <th >ID</th>
                                        <th>اسم النموذج</th>
                                        <th>تركيبته </th>
                                        <th>مخصص للاستعمال مع</th>
                            
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($forms as $form)
                            
                                        <tr>
                                            <td><a href="{{ route('showForm',$form->id) }}">
                                                {{ $form->id }}
                                            </a></td>
                                            <td>{{ $form->structure->type }}</td>
                                            <td>
                                                @foreach ($form->filled_fields->getFields() as $field)
                                                    {{get_class($field) }}
                                                @endforeach    
                                            </td>
                                            <td>{{ $form->formable_type }}</td>

                            
                                        </tr>
                            
                                    @endforeach
                            
                                </tbody>
                            </table>
                            
                        </div>

                    </div>
            </div>
        </div>
    </div>
@endsection
