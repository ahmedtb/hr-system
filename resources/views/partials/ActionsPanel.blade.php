<div class="panel">
    <div class="panel-heading">
        طلبات متاحة
    </div>

    <ul class="list-group">
        <li class="list-group-item">
            <form action="{{ route('createEmployeeForm') }}" method="get">
                <input type="submit" value="تسجيل موظف" />
            </form>
        </li>
        <li class="list-group-item">
            <form action="{{ route('createTargetedForm') }}" method="get">
                <input type="submit" value="تسجيل مستهدف" />
            </form>
        </li>
    </ul>
</div>
