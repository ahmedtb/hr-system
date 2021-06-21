
<div class="card">
    <div class="card-header">
        طلبات متاحة
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">
                <a class="btn btn-primary" href="{{ route('createEmployeeForm') }}" role="button">تسجيل موظف</a>
            </li>
            <li class="list-group-item">
                <a class="btn btn-primary" href="{{ route('createTargetedForm') }}" role="button">تسجيل مستهدف</a>
            </li>

            <li class="list-group-item">
                <a class="btn btn-primary" href="{{ route('showFormsStructure') }}" role="button">عرض النماذج المتاحة</a>
            </li>

            <li class="list-group-item">
                <a class="btn btn-primary" href="{{ route('showForms') }}" role="button">عرض النماذج المعبئة</a>
            </li>
            
            <li class="list-group-item">
                <a class="btn btn-primary" href="{{ route('createFormStructureForm') }}" role="button">انشاء نوع نماذج جديد</a>
            </li>

            <li class="list-group-item">
                <a class="btn btn-primary" href="{{ route('createCoachForm') }}" role="button">تسجيل مدرب</a>
            </li>

            <li class="list-group-item">
                <a class="btn btn-primary" href="{{ route('createProgramForm') }}" role="button">انشاء حقيبة تدريبية</a>
            </li>
        </ul>
    </div>
</div>

