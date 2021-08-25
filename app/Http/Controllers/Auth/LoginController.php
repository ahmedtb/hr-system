<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    protected $request;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->middleware('guest')->except('logout');
    }

    public function username()
    {
        return 'username';
    }

    protected function credentials(Request $request)
    {
        $data = $request->only($this->username(), 'password');
        // $data['email_confirmed'] = 1;
        return $data;
    }

    protected function guard()
    {
        return Auth::guard($this->request->type);
    }

    protected function authenticated(Request $request, $user)
    {
        return $user;
    }

    /**
     * Validate the user login request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function validateLogin(Request $request)
    {
        $request->validate([
            $this->username() => 'required|string',
            'password' => 'required|string',
            'type' => 'required|in:admin,employee,web,individual',
        ]);
    }

    /**
     * Attempt to log the user into the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function attemptLogin(Request $request)
    {
        return $this->guard($request->type)->attempt(
            $this->credentials($request),
            $request->filled('remember')
        );
    }

    public function user(Request $request)
    {
        if ($request->user('admin')) {
            $admin = $request->user('admin');
            $admin->role = 'admin';
            return $admin;
        } else if ($request->user('sanctum')) {
            $user = $request->user('sanctum');
            $user->role = 'user';
            return $user;
        } else if ($request->user('employee')) {
            $employee = $request->user('employee');
            $employee->role = 'employee';
            return $employee;
            // } else if ($request->user('coach')) {
            //     $coach = $request->user('coach');
            //     $coach->role = 'coach';
            //     return $coach;
        } else if ($request->user('individual')) {
            $individual = $request->user('individual');
            $individual->role = 'individual';
            return $individual;
        }
        return null;
    }
}
