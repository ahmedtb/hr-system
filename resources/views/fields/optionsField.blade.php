@if($input)

    <div class='row'>
        options input:{{ $field->label }}
    </div>


    @foreach($field->options as $option)
        <div class="form-check">
            <input value="{{ $option }}" name="fields[{{ $index }}] class=" form-check-input" type="radio">
            <label class="form-check-label">
                {{ $option }}
            </label>
        </div>
    @endforeach



@else
    <div class='row'>
        {{ $field->label }}
    </div>


    @foreach($field->options as $option)
        <div class="form-check">
            <input class="form-check-input" type="radio" disabled 
            {{ ($field->getValue() == $option) ? 'checked' : null }}
            >
            <label class="form-check-label">
                {{ $option }}
            </label>
        </div>
    @endforeach

@endif
