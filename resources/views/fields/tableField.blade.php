{{ ($field->label) }}
<table class="table">
    <thead>
        <tr>
            @foreach($field->columnsTitles as $title)
                <th scope="col">{{ $title }}</th>
            @endforeach
        </tr>
    </thead>
    <tbody>
        <tr>
            @foreach($field->columnsTitles as $title)
                <th scope="row">-</th>
            @endforeach
        </tr>
    </tbody>
</table>
