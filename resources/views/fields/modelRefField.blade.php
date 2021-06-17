
@if ($input)
    {{$field->modelClass}} reference field: {{ ($field->label) }}
    <select name="fields[{{$index}}]">
        <option value=''>select {{$field->modelClass}} name</option>

    @foreach ($field->optionsList() as $key => $value) 
         <option value='{!! $key !!}'>{!! $value !!}</option>
    @endforeach
  
  </select>

@else 
    {{$field->modelClass}} reference field {{$field->label}}
    @if($field->getValue())
        <div class='p-1 border border-1 rounded'>{{$field->modelClass}} id {{$field->getValue() }}</div>
    @else
        <div class='p-1 border border-1 rounded'></div>
    @endif
@endif