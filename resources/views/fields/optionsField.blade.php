<div class='row'>
    {{ $field->label }}
</div>


    @foreach ($field->options as $option)        
    <div class="form-check">
        <input class="form-check-input" type="radio" disabled>
        <label class="form-check-label">
            {{$option}}
        </label>
    </div>
    @endforeach
