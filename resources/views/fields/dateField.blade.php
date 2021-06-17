
@if ($input)
    string input: {{ ($field->label) }}
    <input type="date" name="fields[{{$index}}]" value="{{ $field->getValue() }}" min="2018-01-01" max="2023-12-31">

@else 
<div class='row'>
    {{ $field->label }}
    <input type="date" name="fields[{{$index}}]" value="{{ $field->getValue() }}" disabled>
</div>
@endif