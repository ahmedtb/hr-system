@if ($input)
    string input: {{ ($field->label) }}
    <input value="{{ $field->getValue() }}" name="fields[{{$index}}]">
@else 
{{ ($field->label) }}
<div class='p-2 border border-1 rounded'>{{ $field->getValue() }}</div>
@endif