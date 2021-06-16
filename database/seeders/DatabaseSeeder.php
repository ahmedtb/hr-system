<?php

namespace Database\Seeders;

use App\Models\Job;
use App\Models\Admin;
use App\Models\Coach;
use App\Models\Trainee;
use App\Models\Document;
use App\Models\Employee;
use Illuminate\Database\Seeder;
use App\Models\CourseAttendance;
use App\Models\FormStructure;
use App\Models\TargetedIndividual;
use App\Models\TrainingCourse;
use App\Models\TrainingProgram;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
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
