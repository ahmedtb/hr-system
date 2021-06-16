@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">النماذج الخاصة المتوفرة</div>

                        <div class="card-body">
                            
                            <table class="table table-striped table-condensed" style="margin-bottom: 0px">
                                <thead>
                                    <tr>
                                        <th class="col-md-8">رقم قيد النموذج</th>
                                        <th>اسم النموذج</th>
                                        <th>تركيبته </th>
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
                                                    {{get_class($field) }}
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
