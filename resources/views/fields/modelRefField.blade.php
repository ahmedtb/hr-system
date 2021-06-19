
@if ($input)
    {{$field->modelClass}} reference field: {{ ($field->label) }}
    <select name="fields[{{$index}}]">
        <option value=''>select {{$field->modelClass}} name</option>

    @foreach ($field->optionsList() as $key => $value) 
         <option value='{!! $key !!}'>{!! $value !!}</option>
    @endforeach
  
  </select>

@else 
    <div class="row p-3">    
        <div class="col-6">
            حقل اشارة بعنوان: {{ ($field->label) }}
        </div>
        <div class="col-6">
            نوع الكيان المشار اليه: {{ ($field->modelClass) }}
        </div>
    </div>
    @if($field->getValue())
        <div class='p-1 border border-1 rounded'>رقم الكيان في قاعدة البيانات {{$field->getValue() }}</div>
    @else
        <input class='border border-1 rounded' size="50" disabled/>
    @endif
@endif