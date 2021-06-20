<table class="table table-light">
    <thead class="thead-light">
        <tr>
            <th>ID</th>
            <th>البرنامج التدريبي</th>
            <th>الجدول الاسبوع</th>
            <th>تاريخ البداية</th>
            <th>تاريخ النهاية</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($resumedCourses as $resumedCourse)
            <tr>
                <td><a href=" route('showResumedCourse',$resumedCourse->id) ">{{ $resumedCourse->id }}</a></td>
                <td>{{ $resumedCourse->trainingProgram->title }}</td>
                <td>
                    <table class="table table-striped">
                        <tbody>
                            @foreach ($resumedCourse->week_schedule as $day => $schedule)
                                <tr>
                                    <td class='p-0'>{{ $day }}</td>
                                    <td class='p-0'>{{ $schedule['begin'] }} </td>
                                    <td class='p-0'>{{ $schedule['period'] }} </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>

                </td>
                <td>{{ $resumedCourse->start_date }} </td>
                <td>{{ $resumedCourse->end_date }} </td>

            </tr>
        @endforeach
    </tbody>
</table>
