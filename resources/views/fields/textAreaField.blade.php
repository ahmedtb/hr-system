@if ($input)
    tabel area render {{ ($field->label) }}
    <textarea value="{{ $field->getValue() }}" name="fields[{{$index}}]" rows="5"></textarea>

@else 
    {{ ($field->label) }}
    <div class='p-5 border border-1 rounded'>{{ $field->getValue() }}</div>
@endif