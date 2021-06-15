<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use App\Models\TargetedIndividual;
use Illuminate\Support\Facades\DB;

class TargetedIndividualsController extends Controller
{
    public function create(Request $request)
    {

        $request->validate([
        ]);

        DB::transaction(function ()  use ($request) {
            $targeted = TargetedIndividual::create();

            if ($request->documents) {
                foreach ($request->file('documents') as $document) {
                    $image = base64_encode(file_get_contents($document->path()));
                    Document::create([
                        'name' => $document->getClientOriginalName(),
                        'image' => $image,
                        'documentable_id' => $targeted->id,
                        'documentable_type' => TargetedIndividual::class
                    ]);
                }
            }
        });

        if ($request->documents) {
            return redirect()->route('home')->with('success', 'targeted individual created with documents');
        } else {
            return response(['success' => 'targeted individual created']);
        }
    }

    public function createForm()
    {
        
        return View('targeted.create');
    }
}
