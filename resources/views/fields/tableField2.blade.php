@if ($input)
    <div class="row p-3">    
        <div class="col-6">
            حقل جدول بعنوان: {{ ($field->label) }}
        </div>
        <div class="col-6">
            عدد الصفوف في الجدول: {{ ($field->numberOfRows) }}
        </div>
    </div>
    <table class="table table-striped table-condensed table-bordered">
        <thead className="thead-light">
            <tr>
                @foreach($field->columnsTitles as $title)
                    <th scope="col">{{ $title }}</th>
                @endforeach
            </tr>
        </thead>
        <tbody>
            @for ($i = 0; $i < $field->numberOfRows; $i++)            
                <tr>
                    @foreach($field->getRow($i) as $elementIndex => $element)            
                        <th scope="row">
                            <input value="{{ $element }}" name="fields[{{$index}}][{{$i}}][{{$elementIndex}}]">
                        </th>
                    @endforeach
                </tr>
            @endfor
        </tbody>
    </table>
@else    
    <div class="row p-3">    
        <div class="col-6">
            حقل جدول بعنوان: {{ ($field->label) }}
        </div>
        <div class="col-6">
            عدد الصفوف في الجدول: {{ ($field->numberOfRows) }}
        </div>
    </div>
   
    <table class="table table-striped table-condensed table-bordered">
        <thead className="thead-light">
            <tr>
                @foreach($field->columnsTitles as $title)
                    <th scope="col">{{ $title }}</th>
                @endforeach
            </tr>
        </thead>
        <tbody>
            @for ($i = 0; $i < $field->numberOfRows; $i++)            
                <tr>
                    @foreach($field->getRow($i) as $element)            
                        <th scope="row">{{ $element }}</th>
                    @endforeach
                </tr>
            @endfor
        </tbody>
    </table>
@endif
