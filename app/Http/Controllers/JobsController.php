<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JobsController extends Controller
{
    public function show(int $id)
    {
        Validator::make([
            'id' => $id
        ], [
            'id' => 'required|exists:jobs,id'
        ])->validate();
        $job= Job::where('id',$id)->first();
        // return $job;
        return View('job.show',[
            'job' => $job
        ]);
    }
}
