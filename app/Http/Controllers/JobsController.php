<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JobsController extends Controller
{

    public function create(Request $request)
    {
        if($request->method() == 'POST'){
            $data = $request->validate([
                'unit_id' => 'required|exists:units,id',
                'name' => 'required|string',
                'purpose' => 'required|string',
                'description' => 'required|min:20|max:5000'
            ]);
    
            Job::create($data);
    
            return redirect(route('showUnit',['id'=>$request->unit_id]));

        }elseif($request->method() == 'GET'){
            
            return View('job.create', [
                'unit_id' => $request->unit_id
            ]);
        }
    }

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
