@if ($input)
    string input: {{ ($field->label) }}
    <input value="{{ $field->getValue() }}" name="fields[{{$index}}]" type="email">
@else 
email field {{ ($field->label) }}
<div class='p-2 border border-1 rounded'></div>
@endif