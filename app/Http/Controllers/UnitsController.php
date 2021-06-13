<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;

class UnitsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
    }

    public function UnitsTree()
    {
        $top = Unit::whereNull('parent_id')->get();
        return View('home',[
            'top' => $top
        ]);
    }
}
