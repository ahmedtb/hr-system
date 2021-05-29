<?php

namespace App\Http\Controllers\API;

use App\Models\Unit;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ManagmentController extends Controller
{
    public function UnitsTree(Request $request)
    {
        $top = Unit::whereNull('parent_id')->get();
        return $top;
    }
}
