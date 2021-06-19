@if ($input)
    job reference field: {{ ($field->label) }}
    <select name="fields[{{$index}}]">
        <option value=''>select job name</option>

    @foreach ($field->optionsList() as $key => $value) 
         <option value='{!! $key !!}'>{!! $value !!}</option>
    @endforeach
  
  </select>

@else 
<div class="row p-3">    
    <div class="col-6">
        حقل تحديد نوع الوظيفة بعنوان: {{$field->label}}
    </div>
    <div class="col-6">
        @if($field->getValue())
            <div class='p-1 border border-1 rounded'>اسم الوظيفة المحدد افتراضيا {{$field->getRef()->name}}</div>
        @else
            <input class='border border-1 rounded' size="25" value="" disabled/>
        @endif
    </div>
</div>
@endif