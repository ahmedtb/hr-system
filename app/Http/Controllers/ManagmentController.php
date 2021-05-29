<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use Illuminate\Http\Request;

class ManagmentController extends Controller
{
    public function OrganizationalChart(Request $request)
    {
        $units = Unit::all();
        return view('index', compact('units'));
    }
}
