<?php

namespace App\Policies;

use App\Models\Employee;
use App\Models\TargetedIndividual;
use App\Models\TrainingCourse;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Foundation\Auth\User as Authenticatable;

class TrainingCoursePolicy
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

    public function viewCourse(Authenticatable $user, TrainingCourse $course)
    {
        $decision = false;

        if (in_array('admin', $user->role)) {
            $decision = true;
        } else if ($user instanceof Employee &&  $course->employees()->where('employees.id', $user->id)->count() != 0) {
            $decision = true;
        } else if ($user instanceof TargetedIndividual && $course->individuals()->where('targeted_individual.id', $user->id)->count() != 0) {
            $decision = true;
        } else if ($user->coach()->exists() &&  $course->coaches()->where('coaches.id', $user->coach->id)->count() != 0) {
            $decision = true;
        }

        return $decision;
    }

    public function viewCourseProgram(Authenticatable $user, TrainingCourse $course)
    {
        if ($user->coach()->exists()) {
            return true;
        }
        return in_array('admin', $user->role);
    }

    public function viewCourseTrainees(Authenticatable $user, TrainingCourse $course)
    {
        if ($user->coach()->exists()) {
            return true;
        }
        return in_array('admin', $user->role);
    }

    public function viewCourseAttendances(Authenticatable $user, TrainingCourse $course)
    {
        if ($user->coach()->exists()) {
            return true;
        }
        return in_array('admin', $user->role);
    }
}
