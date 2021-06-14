<?php

namespace App\Http\Controllers;

use App\Models\Head;
use Illuminate\Support\Facades\Validator;

class HeadsController extends Controller
{
    public function show(int $id)
    {
        Validator::make([
            'id' => $id
        ], [
            'id' => 'required|exists:heads,id'
        ])->validate();
        $head= Head::where('id',$id)->first();
        // return $head;
        return View('head.show',[
            'head' => $head
        ]);
    }
}
