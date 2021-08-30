<?php

namespace Database\Factories;

use App\Models\Admin;
use App\Models\Coach;
use App\Models\Comment;
use App\Models\Employee;
use App\Models\Supervisor;
use App\Models\TrainingCourse;
use App\Models\TrainingProgram;
use App\Models\TargetedIndividual;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Comment::class;


    private function randomCommenter()
    {
        switch (random_int(1, 3)) {
            case 1:
                return Admin::inRandomOrder()->first()?? Admin::factory()->create();
            case 2:
                return Supervisor::inRandomOrder()->first()?? Supervisor::factory()->create();
            case 3:
                return Coach::inRandomOrder()->first()?? Coach::factory()->create();
        }
    }

    private function randomCommentable(Model $commenter)
    {
        if (!($commenter instanceof Coach))
            switch (random_int(1, 2)) {
                case 1:
                    return TrainingCourse::inRandomOrder()->first() ?? TrainingCourse::factory()->create();
                case 2:
                    return TrainingProgram::inRandomOrder()->first() ?? TrainingProgram::factory()->create();
                case 3:
                    return Employee::inRandomOrder()->first() ?? Employee::factory()->create();
                case 4:
                    return TargetedIndividual::inRandomOrder()->first() ?? TargetedIndividual::factory()->create();
            }
        else
            switch (random_int(1, 2)) {
                case 1:
                    return TrainingCourse::inRandomOrder()->first() ?? TrainingCourse::factory()->create();
                case 2:
                    return TrainingProgram::inRandomOrder()->first() ?? TrainingProgram::factory()->create();
            }
    }

    public function definition()
    {
        $commenter = $this->randomCommenter();
        $commentable = $this->randomCommentable($commenter);

        return [
            'content' => $this->faker->sentence(),
            'commenter_id' => $commenter->id,
            'commenter_type' => get_class($commenter),
            'commentable_id' => $commentable->id,
            'commentable_type' => get_class($commentable),
        ];
    }

    public function commenter(Model $commenter)
    {
        return $this->state(function (array $attributes) use ($commenter) {
            return [
                'commenter_id' => $commenter->id,
                'commenter_type' => get_class($commenter),
            ];
        });
    }

    public function commentable(Model $commentable)
    {
        return $this->state(function (array $attributes) use ($commentable) {
            return [
                'commentable_id' => $commentable->id,
                'commentable_type' => get_class($commentable),
            ];
        });
    }
}
