<?php

namespace App\Http\Controllers\API;

use App\Models\Document;
use App\Models\Employee;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Filters\IndividualFilters;
use App\Models\TargetedIndividual;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class TargetedIndividualsController extends Controller
{

    // public function show($id)
    // {
    //     return TargetedIndividual::where('id', $id)->first();
    // }

    public function show($id)
    {
        $individual = TargetedIndividual::where('id', $id)->first();
        $coach = $individual->coach;

        $resumedCourses = $individual->TrainingCourses(false)->resumed()->with(['trainingProgram'])->get();
        foreach ($resumedCourses as $resumedCourse) {
            $resumedCourse['individualAttendaces'] = $resumedCourse->individualAttendaces($individual);
        }
        $plannedCourses = $individual->TrainingCourses(false)->planned()->with(['trainingProgram'])->get();
        $doneCourses = $individual->TrainingCourses(false)->done()->with(['trainingProgram'])->get();
        $canceledCourses = $individual->TrainingCourses(false)->canceled()->with(['trainingProgram'])->get();

        // $trialPeriodAssessments = $individual->TrialPeriodAssessments;
        // $trainingPeriodAssessments = $individual->TrainingPeriodAssessments;
        $traineeCourseAssessments = $individual->TraineeCourseAssessments;
        return [
            'individual' => $individual,
            'coach' => $coach,
            'resumedCourses' => $resumedCourses,
            'plannedCourses' => $plannedCourses,
            'doneCourses' => $doneCourses,
            'canceledCourses' => $canceledCourses,

            // 'trialPeriodAssessments' => $trialPeriodAssessments,
            // 'trainingPeriodAssessments' => $trainingPeriodAssessments,
            'traineeCourseAssessments' => $traineeCourseAssessments
        ];
    }

    public function getIndividuals()
    {
        return TargetedIndividual::select(['id', 'name'])->get();
    }

    public function create(Request $request)
    {
        // dd($request->profile);
        $validateddata = $request->validate([
            'name' => 'required|string|unique:targeted_individuals,name',
            'address' => 'sometimes|string',
            'phone_number' => 'sometimes|string|unique:targeted_individuals,phone_number',
            'email' => 'sometimes|email|unique:targeted_individuals,email',
            'description' => 'sometimes|string',
            'documents.*' => 'sometimes|image|mimes:jpg,jpeg,png,bmp,tiff |max:1024',
            'profile_image' => 'sometimes|image|mimes:jpg,jpeg,png,bmp,tiff |max:1024',
            // 'password' => ['required', 'confirmed', Password::min(8)]
        ]);

        DB::transaction(function ()  use ($request, $validateddata) {
            $targeted = TargetedIndividual::create([
                'name' => $request->name,
                'username' => $request->name,
                'address' => $request->address,
                'phone_number' => $request->phone_number,
                'email' => $request->email,
                'description' => $request->description,
                'password' => Hash::make(Str::random(8)),

            ]);
            if ($request->profile) {
                $image = base64_encode(file_get_contents($request->file('profile')->path()));
                $targeted->update([
                    'profile' => $image
                ]);
            }
            if ($request->documents) {
                foreach ($request->file('documents') as $document) {
                    $image = base64_encode(file_get_contents($document->path()));
                    Document::create([
                        'name' => $document->getClientOriginalName(),
                        'content' => $image,
                        'type' => 'png',
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

    public function delete($id)
    {
        TargetedIndividual::where('id', $id)->first()->delete();

        return response()->json(['success' => 'individual ' . $id . ' deleted'], 202);
    }

    public function edit(Request $request)
    {
        $validateddata = $request->validate([
            'id' => ['sometimes', 'integer', Rule::exists('targeted_individuals', 'id')],
            'name' => ['sometimes', 'string', Rule::unique('targeted_individuals', 'name')->ignore($request->id)],
            'address' => 'sometimes|string',
            'phone_number' => ['sometimes', 'string', Rule::unique('targeted_individuals', 'phone_number')->ignore($request->id)],
            'email' => ['sometimes', 'string', Rule::unique('targeted_individuals', 'email')->ignore($request->id)],
            'description' => 'sometimes|string',
            // 'profile_image' => 'sometimes|image|mimes:jpg,jpeg,png,bmp,tiff |max:1024',
        ]);

        TargetedIndividual::where('id', $request->id)->first()->update($validateddata);
        return ['success' => 'individual: ' . $request->id . ' is edited'];
    }

    public function index(IndividualFilters $filters, Request $request)
    {
        return TargetedIndividual::filter($filters)
            ->paginate($request->input('page_size') ?? 10)
            ->appends(request()->except('page'));
    }
}
