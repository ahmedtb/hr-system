<?php

namespace Database\Seeders;

use Exception;
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

    public function seedPivotTables()
    {
        for ($i = 0; $i < 100; $i++) {

            DB::table('coach_training_course')->insert(
                [
                    'coach_id' => Coach::select('id')->orderByRaw("RAND()")->first()->id,
                    'training_course_id' => TrainingCourse::select('id')->orderByRaw("RAND()")->first()->id,
                ]
            );

            // DB::table('targeted_individual_training_course')->insert(
            //     [
            //         'targeted_individual_id' => TargetedIndividual::select('id')->orderByRaw("RAND()")->first()->id,
            //         'training_course_id' => TrainingCourse::select('id')->orderByRaw("RAND()")->first()->id,
            //     ]
            // );

            // try {
            //     DB::table('employee_training_course')->insert(
            //         [
            //             'employee_id' => Employee::select('id')->orderByRaw("RAND()")->first()->id,
            //             'training_course_id' => TrainingCourse::select('id')->orderByRaw("RAND()")->first()->id,
            //         ]
            //     );
            // } catch (Exception $err) {
            // }

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
        $courses = TrainingCourse::factory(5)->resumed()->create();
        foreach ($courses as $course)
            CourseAttendance::factory(15)->forCourse($course)->create();

        $courses = TrainingCourse::factory(5)->done()->create();
        foreach ($courses as $course)
            CourseAttendance::factory(15)->forCourse($course)->create();
        
        TrainingCourse::factory(5)->planned()->create();
        TrainingCourse::factory(5)->canceled()->create();

        

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

        TrialPeriodAssessment::factory(5)->create([
            'employee_id' => Employee::select('id')->orderByRaw("RAND()")->first()->id,
        ]);

        TrainingPeriodAssessment::factory(5)->create([
            'employee_id' => Employee::select('id')->orderByRaw("RAND()")->first()->id,
        ]);

        InterviewAssessment::factory(5)->create([
            'interviewer_id' => Employee::select('id')->orderByRaw("RAND()")->first()->id,
        ]);
        TraineeCourseAssessment::factory(5)->create([
            'training_course_id' => TrainingCourse::select('id')->orderByRaw("RAND()")->first()->id,
        ]);
        CoachCourseAssessment::factory(5)->create([
            'training_course_id' => TrainingCourse::select('id')->orderByRaw("RAND()")->first()->id,
        ]);

        $this->seedPivotTables();
    }
}
