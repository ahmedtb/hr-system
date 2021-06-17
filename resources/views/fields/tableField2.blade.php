@if ($input)
    tabel field 2 render {{ ($field->label) }}
    <table class="table">
        <thead>
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
    tabel field 2 render {{ ($field->label) }}
    <table class="table">
        <thead>
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
