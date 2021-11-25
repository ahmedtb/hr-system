<table class="table table-striped table-condensed" style="margin-bottom: 0px">
    <thead className="thead-light">
        <tr>
            <th class="col-md-8">اسم الموظف</th>
            <th>تاريخ توظيفه</th>
            <th>مرتب الموظف</th>
            <th>رقم هاتف الموظف</th>
            <th>بريده الالكتروني</th>
            <th>تقيمه</th>
            <th>وظيفته</th>
            <th>عنوانه</th>

        </tr>
    </thead>
    <tbody>
        @foreach($employees as $employee)

            <tr>
                <td>{{ $employee->name }}</td>
                <td>{{ $employee->employment_date }}</td>
                <td>{{ $employee->basic_salary }}</td>
                <td>{{ $employee->phone_number }}</td>
                <td>{{ $employee->email }}</td>
                <td>{{ $employee->medal_rating }}</td>
                <td>
                    <a href="{{ route('showJob',$employee->job_id) }}">
                        {{ $employee->job_id }}
                    </a>
                </td>
                <td>{{ $employee->address }}</td>

            </tr>

        @endforeach

    </tbody>
</table>
