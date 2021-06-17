@if ($input)
    string input: {{ ($field->label) }}
    <div class="form-check">
        <input  value="male" class="form-check-input" type="radio" name="fields[{{$index}}]">
        <label class="form-check-label">
            male
        </label>
    </div>
    <div class="form-check">
        <input  value="female" class="form-check-input" type="radio" name="fields[{{$index}}]">
        <label class="form-check-label">
            female
        </label>
    </div>

@else 
number field {{ ($field->label) }}
<div class="form-check">
    <input class="form-check-input" type="radio" disabled>
    <label class="form-check-label">
        male
    </label>
</div>
<div class="form-check">
    <input class="form-check-input" type="radio" checked disabled>
    <label class="form-check-label">
        female
    </label>
</div>
@endif