job field {{ ($field->label) }}
@if($field->getValue() != null)
    <div class='p-1 border border-1 rounded'>job name {{$field->getRef()->name}}</div>
@endif