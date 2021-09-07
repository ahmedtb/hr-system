<?php

namespace Database\Seeders;

use Exception;
use Carbon\Carbon;
use App\Models\Job;
use App\Models\Form;
use App\Models\Unit;
use App\Models\User;
use App\Models\Admin;
use App\Models\Coach;
use App\Models\Comment;
use App\Models\Trainee;
use App\Models\Document;
use App\Models\Employee;
use App\Models\Supervisor;
use App\Models\FormStructure;
use App\Models\TrainingCourse;
use App\Models\TrainingProgram;
use Illuminate\Database\Seeder;
use App\FieldsTypes\StringField;
use App\FieldsTypes\TableField2;
use App\Models\CourseAttendance;
use App\FieldsTypes\ArrayOfFields;
use App\FieldsTypes\LabelField;
use App\FieldsTypes\NumberField;
use App\FieldsTypes\OptionsField;
use App\FieldsTypes\SocialStatusField;
use App\FieldsTypes\TextAreaField;
use App\Models\TargetedIndividual;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Models\Assessments\InterviewAssessment;
use App\Models\Assessments\CoachCourseAssessment;
use App\Models\Assessments\TrialPeriodAssessment;
use App\Models\Assessments\TraineeCourseAssessment;
use App\Models\Assessments\TrainingPeriodAssessment;

class DatabaseSeeder extends Seeder
{

    private function seedPivotTables()
    {
        for ($i = 0; $i < 100; $i++) {

            DB::table('coach_training_course')->insert(
                [
                    'coach_id' => Coach::select('id')->orderByRaw("RAND()")->first()->id,
                    'training_course_id' => TrainingCourse::select('id')->orderByRaw("RAND()")->first()->id,
                ]
            );
            DB::table('trainee_training_course')->insert(
                [
                    'trainee_id' => Trainee::select('id')->orderByRaw("RAND()")->first()->id,
                    'training_course_id' => TrainingCourse::select('id')->orderByRaw("RAND()")->first()->id,
                ]
            );

            DB::table('coach_training_program')->insert(
                [
                    'coach_id' => Coach::select('id')->orderByRaw("RAND()")->first()->id,
                    'training_program_id' => TrainingProgram::select('id')->orderByRaw("RAND()")->first()->id,
                ]
            );
        }
    }

    private function staticFormStructures(){
        FormStructure::create([
            'type' => 'نموذج طلب توظيف',
            'array_of_fields' => new ArrayOfFields(array(
                new TextAreaField('أتقدم بطلبي هذا طالبا ما يلي:'),
                new LabelField('بيانات مقدم الطلب'),
                new StringField('الاسم'),
                new StringField('اللقب'),
                new StringField('تاريخ الميلاد'),
                new StringField('الجنس'),
                new SocialStatusField('الحالة الاجتماعي'),
                new StringField('الجنسية'),
                new StringField('المؤهل العلمي'),
                new StringField('الوظيفة المتقدم لها'),

                new StringField('هل لديك وسيلة مواصلات'),
                new TextAreaField('ما المهارات التي تتقنها'),
                new OptionsField('ما اللغات التي   تجيدها', [
                    "عربي",
                    "فرنسي"
                ]),
                new TextAreaField('أهم الدورات التي اخذتها'),
                new NumberField('رقم الهاتف'),
                new TableField2(
                    'الوظائف والخبرات السابقة والحالية',
                    array(
                        "الوصف الوظيفي",
                        "المرتب",
                        "الجهة التي عملت بها"
                    ),
                    4
                ),
                new StringField('اسم مجري المقابلة')
            ))
        ]);
    }

    private function localSeeding()
    {

        User::factory(10)->create();

        Unit::factory(10)->create();
        Employee::factory(20)->create();
        TargetedIndividual::factory(20)->create();
        Admin::factory(5)->create();
        Admin::factory()->create(['username' => 'ahmed', 'password' => Hash::make('password')]);

        Supervisor::factory(5)->create();

        TrainingProgram::factory(20)->create();

        $courses = TrainingCourse::factory(5)->resumed()->create();
        foreach ($courses as $course)
            CourseAttendance::factory(15)->forCourse($course)->create();

        $courses = TrainingCourse::factory(5)->done()->create();
        foreach ($courses as $course)
            CourseAttendance::factory(15)->forCourse($course)->create();

        TrainingCourse::factory(5)->planned()->create();
        TrainingCourse::factory(5)->canceled()->create();

        FormStructure::factory(5)->create();
        $this->staticFormStructures();

        Form::factory(5)->create();

        Trainee::factory(5)->create();
        Coach::factory(5)->create();

        Document::factory(15)->create();

        TrialPeriodAssessment::factory(5)->create();
        TrainingPeriodAssessment::factory(5)->create();
        InterviewAssessment::factory(5)->create();
        TraineeCourseAssessment::factory(5)->create();
        CoachCourseAssessment::factory(5)->create();

        $this->seedPivotTables();

        Comment::factory(30)->create();
    }

    private function productionSeeding(){
        $users = json_decode(Document::where('name', 'users.json')->first()->content);
        $departments = json_decode(Document::where('name', 'departments.json')->first()->content);
        $individuals = json_decode(Document::where('name', 'individuals.json')->first()->content);

        Admin::create([
            'name' => 'ahmed',
            'username' => 'ahmed',
            'email' => 'testing@test.com',
            'password' => Hash::make('password')
        ]);


        foreach ($users as $user) {

            Employee::create([
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'address' => 'لا توجد بيانات',
                'employment_date' => $user->starting_date ?? Carbon::today()->format('Y-m-d'),
                'basic_salary' => $user->basic_salary,
                'phone_number' => 'لا توجد بيانات',
                'job_id' => 1,
                'email' => $user->email ?? 'testing@test.com',
                'medal_rating' => 1,
                'profile_image' => getBase64DefaultImage(),
                'password' => Hash::make('password'),
            ]);
        }
        foreach ($departments as $department) {

            $unit = Unit::create([
                'id' => $department->id,
                'parent_id' => $department->parent_id,
                'name' => $department->name,
                'head_id' => $department->department_manager,
                'purpose' => 'لا توجد بيانات',
            ]);
            Job::create([
                'unit_id' => $unit->id,
                'name' => 'وظيفة في الوحدة ' . $unit->id,
                'purpose' => 'لا توجد بيانات',
                'description' => 'لا توجد بيانات',
            ]);
        }
        foreach ($users as $user) {

            Employee::where('id', $user->id)->first()->update([
                'job_id' => $user->department_id ? Job::where('unit_id', $user->department_id)->first()->id : 1
            ]);
        }


        foreach ($individuals as $individual) {
            TargetedIndividual::create([
                'id' => $individual->id,
                'name' => $individual->name,
                'username' => $individual->username,
                'phone_number' => $individual->phone_number,
                'email' => $individual->email,
                'address' => $individual->address,
                'description' => $individual->description,
                'profile_image' => null,
                'password' => Hash::make('password'),
            ]);
        }
        $this->staticFormStructures();

    }

    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        if (App::environment() == 'production') {
            $this->productionSeeding();
        } else {
            $this->localSeeding();
        }
    }
}
