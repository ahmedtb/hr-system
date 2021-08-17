<?php

namespace App\Providers;

use App\Models\Employee;
use App\Models\TargetedIndividual;
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
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Auth::viaRequest('coach-request', function ($request) {
            if (get_class($request->user()) == Employee::class) {
                return $request->user()->coach;
            } else if (get_class($request->user()) == TargetedIndividual::class) {
                return $request->user()->coach;
            } else
                return null;
        });
        //
    }
}
