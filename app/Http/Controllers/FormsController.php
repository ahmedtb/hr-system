<?php

namespace App\Http\Controllers;

use App\Models\FormStructure;
use Illuminate\Http\Request;

class FormsController extends Controller
{
    //

    public function index(Request $request)
    {
        $structures = FormStructure::all();
        return View('form.index',['structures' => $structures]);
    }
}
