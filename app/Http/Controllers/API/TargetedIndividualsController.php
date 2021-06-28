<?php

namespace App\Http\Controllers\API;

use App\Models\Document;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\TargetedIndividual;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class TargetedIndividualsController extends Controller
{
    public function create(Request $request)
    {
        $validateddata = $request->validate([
            'documents.*' => 'sometimes|image|mimes:jpg,jpeg,png,bmp,tiff |max:1024',
        ]);

        DB::transaction(function ()  use ($request, $validateddata) {
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
            return response(['success' => 'targeted individual created with documents']);
        } else {
            return response(['success' => 'targeted individual created']);
        }
    }
}
