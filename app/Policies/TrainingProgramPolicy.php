<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Coach;
use App\Models\Employee;
use App\Models\TrainingProgram;
use App\Models\TargetedIndividual;
use App\Models\TrainingCourse;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Foundation\Auth\User as Authenticatable;

class TrainingProgramPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    private function userIsTheCoachCreatorOfTheProgram(Authenticatable $user, TrainingProgram $program)
    {
        if (
            ($user instanceof Coach) &&
            $user->trainingPrograms()->where('training_programs.id', $program->id)->count() != 0
        ) {
            return true;
        } else {
            return false;
        }
    }

    private function userIsCoachInProgramCourses(Authenticatable $user, TrainingProgram $program)
    {
        // dd($user->coach);
        if (($user instanceof Employee ||
                $user instanceof TargetedIndividual) &&
            $user->coach()->exists()
            && $user->coach->trainingCourses()->whereHas('trainingProgram', function ($query) use ($program) {
                return $query->where('id', $program->id);
            })->count() != 0
        ) {
            return true;
        } else if (
            $user instanceof Coach &&
            $user->trainingCourses()->whereHas('trainingProgram', function ($query) use ($program) {
                return $query->where('id', $program->id);
            })->count() != 0
        ) {
            return true;
        } else {
            return false;
        }
    }

    private function userIsTraineeInProgramCourses(Authenticatable $user, TrainingProgram $program)
    {
        if (
            ($user instanceof Employee ||
                $user instanceof TargetedIndividual) &&
            $user->TrainingCourses(false)->where('training_program_id', $program->id)->count() != 0
        ) {
            return true;
        } else {
            return false;
        }
    }

    public function accessProgram(Authenticatable $user, TrainingProgram $program)
    {
        if (
            $this->userIsTheCoachCreatorOfTheProgram($user, $program) ||
            $this->userIsCoachInProgramCourses($user, $program) ||
            $this->userIsTraineeInProgramCourses($user, $program)
        )
            return true;
        else return false;
    }
}
