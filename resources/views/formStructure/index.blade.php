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
                    <div class="card-header">النماذج الخاصة المتوفرة</div>

                        <div class="card-body">
                            
                            <table class="table table-bordered table-condensed" style="margin-bottom: 0px">
                                <thead>
                                    <tr>
                                        <th >رقم قيد النموذج</th>
                                        <th>اسم النموذج</th>
                                        <th>تركيبة النموذج </th>
                                        <th>مخصص للاستعمال مع</th>
                            
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($structures as $structure)
                            
                                        <tr>
                                            <td><a href="{{ route('showStructure',$structure->id) }}">
                                                {{ $structure->id }}
                                            </a></td>
                                            <td>{{ $structure->type }}</td>
                                            <td>
                                                @foreach ($structure->array_of_fields->getFields() as $field)
                                                    {{$field->render()}}    
                                                @endforeach    
                                            </td>
                                            <td>{{ $structure->formable_type }}</td>

                            
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
