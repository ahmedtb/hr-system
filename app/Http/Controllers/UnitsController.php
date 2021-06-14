<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\View;

class UnitsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
    }

    public function index()
    {
        $top = Unit::whereNull('parent_id')->get();
        return View('home',[
            'top' => $top
        ]);
    }

    public function show(int $id){
        Validator::make([
            'id' => $id
        ], [
            'id' => 'required|exists:units,id'
        ])->validate();
        $unit= Unit::where('id',$id)->first();
        // return $unit;
        return View('unit.show',[
            'unit' => $unit
        ]);
    }
}
