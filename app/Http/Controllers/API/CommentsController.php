<?php

namespace App\Http\Controllers\API;

use App\Filters\CommentFilters;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
        $data = $request->validate([
            'content' => 'required|string',
            'commentable_id' => 'required|integer',
            'commentable_type' => 'required',
            'commenter_id' => 'required|integer',
            'commenter_type' => 'required',
        ]);

        Comment::create($data);

        return ['success' => 'comment is created'];
    }

    public function show($id)
    {
        return Comment::where('id', $id)->first();
    }
}
