@if ($input)
    job reference field: {{ ($field->label) }}
    <select name="fields[{{$index}}]">
        <option value=''>select job name</option>

    @foreach ($field->optionsList() as $key => $value) 
         <option value='{!! $key !!}'>{!! $value !!}</option>
    @endforeach
  
  </select>

@else 
    job reference field {{$field->label}}
    @if($field->getValue())
        <div class='p-1 border border-1 rounded'>job name {{$field->getRef()->name}}</div>
    @else
        <div class='p-1 border border-1 rounded'></div>
    @endif
@endif