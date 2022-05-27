<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
      public function store(Request $request)
    { 
         $validator = Validator::make($request->all(),[
            'image' => 'required',
            'body'=>'required',
            
        ]);
        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
        }
        else{
            $file= $request->file('image');
            $filename= date('YmdHi').$file->getClientOriginalName();
            $file-> move(public_path('uploads/NewsPictures'), $filename);
            $Post=new Post;
            $Post->body= $request->body;
            $Post->user_id=$request->id;
            $Post->image=$filename;
            $Post->save();
            return response()->json(['message'=>'success']);
        }
            
    }
    public function show(Request $request)
    {
        
        $Post=Post::join('users','users.id','=','posts.user_id')->get(['users.name','posts.body','posts.created_at','posts.image','posts.id']);
        return Response()->json([
            "postdata"=>$Post,
            "status"=>200,
        ]);
    }
    public function showMyInstitution(Request $request)
    {
        $Post=Post::find($request->id);
        return Response()->json([
            "data"=>[$Post]
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $Post=Post::find($request->id);
        return Response()->json([
            "data"=>[$Post]
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $Post=Post::find($request->id);
        $Post->title= $request->title;
        $Post->description= $request->description;
        $Post->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,$id)
    {
        $Post=Post::findOrFail($id);
        $Post->delete();
        return Response()->json([
            "status"=>200,
        ]);
    }
}

