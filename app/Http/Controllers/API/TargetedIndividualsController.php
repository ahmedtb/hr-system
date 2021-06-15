<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\TargetedIndividual;
use Illuminate\Http\Request;

class TargetedIndividualsController extends Controller
{
    public function create()
    {
        TargetedIndividual::create();
        return response(['success' => 'targeted individual created']);
    }
}
