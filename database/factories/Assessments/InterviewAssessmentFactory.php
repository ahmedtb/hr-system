<?php

namespace Database\Factories\Assessments;

use App\Models\Assessments\InterviewAssessment;
use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

class InterviewAssessmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = InterviewAssessment::class;


            // $table->enum('المظهر',['excellent','good','medium','weak']);
            // $table->enum('تعريفه لنفسه',['excellent','good','medium','weak']);
            // $table->enum('الشخصية',['excellent','good','medium','weak']);
            // $table->enum('اللغة الانجليزية',['excellent','good','medium','weak']);
            // $table->enum('الثقافة',['excellent','good','medium','weak']);
            // $table->enum('اللغة العربية',['excellent','good','medium','weak']);
            // $table->enum('المبادرة',['excellent','good','medium','weak']);
            // $table->enum('مهارات المشاركة',['excellent','good','medium','weak']);
            // $table->enum('الاستيعاب',['excellent','good','medium','weak']);
            // $table->enum('اتخاد القرار',['excellent','good','medium','weak']);
            // $table->enum('ملائمة المؤهل العلمي لمتطلبات الوظيفة',['excellent','good','medium','weak']);
            // $table->enum('ملائمة الخبرات العلمية لمتطلبات الوظيفة',['excellent','good','medium','weak']);
            // $table->enum('ملائمة المهارات المكتسبة لمتطلبات الوظيفة',['excellent','good','medium','weak']);
            // $table->enum('مدى استطاعته لحل المشاكل',['excellent','good','medium','weak']);
            // $table->enum('مدى تعامله مع الضغط والتوتر الوظيفي',['excellent','good','medium','weak']);
            // $table->enum('الشجاعة الأدبية والثقة بالنفس',['excellent','good','medium','weak']);
            // $table->string('اسم مجري المقابلة');
            // $table->date('تاريخ المقابلة');
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $assessments = ['excellent','good','medium','weak'];
        return [
            'look' => $assessments[rand(0,3)],
            'self_introduction' => $assessments[rand(0,3)],
            'personality' => $assessments[rand(0,3)],
            'english' => $assessments[rand(0,3)],
            'culture' => $assessments[rand(0,3)],
            'arabic' => $assessments[rand(0,3)],
            'initiative' => $assessments[rand(0,3)],
            'sharing_skills' => $assessments[rand(0,3)],
            'comprehension' => $assessments[rand(0,3)],
            'decision_making' => $assessments[rand(0,3)],
            'compatibility_of_education' => $assessments[rand(0,3)],
            'compatibility_of_experiance' => $assessments[rand(0,3)],
            'compatibility_of_skills' => $assessments[rand(0,3)],
            'problem_solving_skills' => $assessments[rand(0,3)],
            'stress_handling' => $assessments[rand(0,3)],
            'moral_courage_self_confidence' => $assessments[rand(0,3)],
            'interviewer_id' => Employee::factory()->create()->id,
            'interview_date' => $this->faker->date(),
        ];
    }
}
