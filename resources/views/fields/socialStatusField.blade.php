@if ($input)
    string input: {{ ($field->label) }}
    <div class="form-check">
        <input value="married" name="fields[{{$index}}]" class="form-check-input" type="radio">
        <label class="form-check-label">
            married
        </label>
    </div>
    <div class="form-check">
        <input value="single" name="fields[{{$index}}]" class="form-check-input" type="radio">
        <label class="form-check-label">
            single
        </label>
    </div>
@else 
social status: {{ ($field->label) }}
<div class="form-check">
    <input class="form-check-input" type="radio" disabled
    {{ ($field->getValue() == 'married') ? 'checked' : null }}

    >
    <label class="form-check-label">
        married
    </label>
</div>
<div class="form-check">
    <input class="form-check-input" type="radio" 
    {{ ($field->getValue() == 'single') ? 'checked' : null }}
     disabled>
    <label class="form-check-label">
        single
    </label>
</div>
@endif