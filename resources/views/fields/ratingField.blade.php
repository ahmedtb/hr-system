

@if ($input)
    string input: {{ ($field->label) }}
    <div class="form-check">
        <input value="1" name="fields[{{$index}}]" class="form-check-input" type="radio">
        <label class="form-check-label">
            1
        </label>
    </div>
    <div class="form-check">
        <input value="2" name="fields[{{$index}}]" class="form-check-input" type="radio">
        <label class="form-check-label">
            2
        </label>
    </div>
    <div class="form-check">
        <input value="3" name="fields[{{$index}}]" class="form-check-input" type="radio">
        <label class="form-check-label">
            3
        </label>
    </div>
    <div class="form-check">
        <input value="4" name="fields[{{$index}}]" class="form-check-input" type="radio">
        <label class="form-check-label">
            4
        </label>
    </div>
    <div class="form-check">
        <input value="5" name="fields[{{$index}}]" class="form-check-input" type="radio">
        <label class="form-check-label">
            5
        </label>
    </div>

@else 
rating field: {{ ($field->label) }}
<div class='row'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
</div>
@endif
