<?php

namespace App\Providers;

use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\TargetedIndividual;
use App\Models\TrainingCourse;
use App\Policies\TrainingCoursePolicy;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        TrainingCourse::class => TrainingCoursePolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Auth::viaRequest('coach-request', function (Request $request) {
            $user = $request->user('employee') ?? $request->user('individual');

            if ($user != null) {
                return $user->coach()->first() ??  null;
            } else
                return null;
        });
        //
    }
}
