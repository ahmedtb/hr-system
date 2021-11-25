<table class="table table-striped table-condensed" style="margin-bottom: 0px">
    <thead className="thead-light">
        <tr>
            <th class="col-md-8">اسم الوظيفة </th>
            <th>الغرض العام للوظيفة او اهدافها</th>
            <th>وصفة الوظيفة</th>
            <th>الوحدة التي تتبعها</th>
        </tr>
    </thead>
    <tbody>
        @foreach($jobs as $job)
            <tr>
                <td>{{ $job->name }}</td>
                <td>{{ $job->purpose }}</td>
                <td>{{ $job->description }}</td>
                <td>
                    <a href="{{ route('showUnit',$job->unit->id) }}">
                        {{ $job->unit->name }}
                    </a>
                </td>
            </tr>
        @endforeach

    </tbody>
</table>
