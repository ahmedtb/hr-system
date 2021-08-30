<?php

namespace App\Http\Controllers\API;

use App\Models\Admin;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Models\TrainingCourse;
use App\Filters\CommentFilters;
use App\Http\Controllers\Controller;
use App\Models\Coach;
use App\Models\Supervisor;
use App\Models\TrainingProgram;

class CommentsController extends Controller
{
    public function index(Request $request, CommentFilters $filters)
    {
        return Comment::filter($filters)
            ->paginate($request->get('page_size') ?? 10)
            ->appends(request()->except('page'));
    }

    public function create(Request $request)
    {
        // return $request->all();
        $data = $request->validate([
            'content' => 'required|string',
            'commentable_id' => 'required|integer',
            'commentable_type' => 'required|string',
            'commenter_id' => 'required|integer',
            'commenter_type' => 'required|array',
        ]);

        //replace commentable with valid one
        $commentable_type = null;
        if ($request->commentable_type == 'course')
            $commentable_type = TrainingCourse::class;
        else if ($request->commentable_type == 'program')
            $commentable_type = TrainingProgram::class;

        //replace commenter with valid one
        $commenter_type = null;
        if (in_array('admin', $request->commenter_type))
            $commenter_type = Admin::class;
        else if (in_array('coach', $request->commenter_type))
            $commenter_type = Coach::class;
        else if (in_array('supervisor', $request->commenter_type))
            $commenter_type = Supervisor::class;

        Comment::create([
            'content' => $request->content,
            'commentable_id' => $request->commentable_id,
            'commentable_type' => $commentable_type,
            'commenter_id' => $request->commenter_id,
            'commenter_type' => $commenter_type,
        ]);

        return ['success' => 'comment is created'];
    }

    public function show($id)
    {
        return Comment::where('id', $id)->first();
    }
}
