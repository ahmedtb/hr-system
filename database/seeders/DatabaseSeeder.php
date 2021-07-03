<?php

namespace Database\Seeders;

use App\Models\Job;
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

class DatabaseSeeder extends Seeder
{

    public function addBuildInBasicFormStructures()
    {
        FormStructure::create([
            'id' => 1,
            'type' =>  'نموذج طلب توظيف',
            'array_of_fields' => ''
        ]);
        
    }
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        CourseAttendance::factory(20)->withProfile()->create();

        FormStructure::factory(5)->create();
        Trainee::factory(5)->create();
        Coach::factory(5)->create();
        Admin::factory(1)->create();

        Document::factory(5)->create(
            [
                'documentable_type' => Employee::class,
                'documentable_id' => Employee::select('id')->orderByRaw("RAND()")->first()->id,
            ]
        );

        Document::factory(5)->create(
            [
                'documentable_type' => Trainee::class,
                'documentable_id' => Trainee::select('id')->orderByRaw("RAND()")->first()->id,
            ]
        );

        Document::factory(5)->create(
            [
                'documentable_type' => TrainingProgram::class,
                'documentable_id' => TrainingProgram::select('id')->orderByRaw("RAND()")->first()->id,
            ]
        );

        TrialPeriodAssessment::factory(5)->create(
            [
                'employee_id' => Employee::select('id')->orderByRaw("RAND()")->first()->id,
            ]
        );

        TrainingPeriodAssessment::factory(5)->create(
            [
                'employee_id' => Employee::select('id')->orderByRaw("RAND()")->first()->id,
            ]
        );

        TraineeCourseAssessment::factory(5)->create();
        InterviewAssessment::factory(5)->create();
        CoachCourseAssessment::factory(5)->create();

        DB::table('coach_training_course')->insert(
            [
                'coach_id' => Coach::select('id')->orderByRaw("RAND()")->first()->id,
                'training_course_id' => TrainingCourse::select('id')->orderByRaw("RAND()")->first()->id,
            ]
        );

        DB::table('targeted_individual_training_course')->insert(
            [
                'targeted_individual_id' => TargetedIndividual::select('id')->orderByRaw("RAND()")->first()->id,
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
