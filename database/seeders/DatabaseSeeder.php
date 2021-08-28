<?php

namespace Database\Seeders;

use Exception;
use App\Models\Job;
use App\Models\Form;
use App\Models\Unit;
use App\Models\Admin;
use App\Models\Coach;
use App\Models\Trainee;
use App\Models\Document;
use App\Models\Employee;
use App\Models\FormStructure;
use App\Models\TrainingCourse;
use App\Models\TrainingProgram;
use Illuminate\Database\Seeder;
use App\Models\CourseAttendance;
use App\Models\TargetedIndividual;
use Illuminate\Support\Facades\DB;
use App\Models\Assessments\InterviewAssessment;
use App\Models\Assessments\CoachCourseAssessment;
use App\Models\Assessments\TrialPeriodAssessment;
use App\Models\Assessments\TraineeCourseAssessment;
use App\Models\Assessments\TrainingPeriodAssessment;
use App\Models\Comment;
use App\Models\Supervisor;
use App\Models\User;

class DatabaseSeeder extends Seeder
{

    public function seedPivotTables()
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

    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory(10)->create();

        Unit::factory(10)->create();
        Employee::factory(20)->create();
        TargetedIndividual::factory(20)->create();
        Admin::factory(5)->create();
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
}
