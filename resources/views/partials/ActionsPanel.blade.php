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

        <li class="list-group-item">
            <form action="{{ route('showFormsStructure') }}" method="get">
                <input type="submit" value="عرض النماذج المتاحة" />
            </form>
        </li>

        <li class="list-group-item">
            <form action="{{ route('showForms') }}" method="get">
                <input type="submit" value="عرض النماذج المعبئة" />
            </form>
        </li>
    </ul>
</div>
