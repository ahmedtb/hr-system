

@if ($input)
    <div class="row p-3">    
        <div class="col-6">
            {{ ($field->label) }}
        </div>
        <div class="col-6">
            <input value="{{ $field->getValue() }}" name="fields[{{$index}}]" type="number">
        </div>
    </div>
@else 
    <div class="row p-3">    
        <div class="col-6">
            حقل رقم مركب بعنوان: {{ ($field->label) }}
        </div>
        <div class="col-6">
            <input class='border border-1 rounded' size="25" value="{{ $field->getValue() }}" disabled/>
        </div>
    </div>

@endif