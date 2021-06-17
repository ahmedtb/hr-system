
@if ($input)
    string input: {{ ($field->label) }}
    @for ($i = 0; $i < $field->max; $i++)
        <div class="form-check">
            <input value="{{$i + 1}}" name="fields[{{$index}}]" class="form-check-input" type="radio">
            <label class="form-check-label">
                {{$i + 1}}
        </label>
    </div>
    @endfor

@else 
    custom rating {{ ($field->label) }}
    <div class='row'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        @for ($i = 0; $i < $field->max; $i++)
            <span class="fa fa-star"></span>
        @endfor
    </div>

@endif
