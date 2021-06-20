<table class="table table-light">
    <thead class="thead-light">
        <tr>
            <th>ID</th>
            <th>type of form</th>
            <th>تاريخ التسليم</th>
            <th>عدد الحقول</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($forms as $form)
            <tr>
                <td><a href="{{ route('showForm',$form->id) }}">{{ $form->id }}</a></td>
                <td>{{ $form->structure->type }}</td>
                <td>{{ $form->created_at }}</td>
                <td>
                    {{ $form->filled_fields->count() }}
                </td>
            </tr>
        @endforeach
    </tbody>
</table>
