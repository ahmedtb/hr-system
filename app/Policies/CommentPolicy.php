<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Admin;
use App\Models\Coach;
use App\Models\TrainingCourse;
use App\Models\TrainingProgram;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Foundation\Auth\User as Authenticatable;

class CommentPolicy
{
    use HandlesAuthorization;

    public function __construct()
    {
        //
    }

    public function AccessCommentableComments(Authenticatable $user, $commentable)
    {
        // dd($commentable);
        if ($user instanceof Admin) {
            if ($commentable) {
                return true;
            }
        } else if ($user instanceof Coach) {
            if ($commentable instanceof TrainingCourse) {
                return $user->trainingCourses()->where('id', $commentable->id);
            } else if ($commentable instanceof TrainingProgram) {
                return  $user->trainingPrograms()->where('id', $commentable->id);
            }
        }
        return false;
    }
}
