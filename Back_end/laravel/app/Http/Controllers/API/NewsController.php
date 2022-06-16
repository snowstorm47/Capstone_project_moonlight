<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\News;
use App\Models\User;
use App\Models\institution;
use App\Models\student;



use Illuminate\Support\Facades\Validator;



class NewsController extends Controller
{
    //
      public function store(Request $request)
    { 
         $validator = Validator::make($request->all(),[
            'image' => 'required',
            'title'=>'required',
            'body'=>'required',
            
        ]);
if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
        }
        else{
            $file= $request->file('image');
            $filename= date('YmdHi').$file->getClientOriginalName();
            $file-> move(public_path('uploads/NewsPictures'), $filename);
            $News=new News;
            $News->title= $request->title;
            $News->body= $request->body;
            $institution=institution::where('institution.user_id','=',$request->id)->get('institution.id');
            $News->institution_id=$institution[0]->id;
            $News->image=$filename;
            $News->save();
            return response()->json(['message'=>'success']);
        }
            
    }
    public function show(Request $request)
    {
        
        $News=News::join('institution','institution.id','=','news.institution_id')->get(['institution.institutionName','institution.image','news.title','news.body','news.created_at','news.id','news.image']);
        return Response()->json([
            "newsdata"=>$News,
            "status"=>200,
        ]);
    }
    public function showMyInstitution(Request $request)
    {
        $institution_id=student::where('student.user_id','=',$request->id)->get('student.institution_id');
        $institution=institution::where('institution.id','=',$institution_id[0]->institution_id)->get();
        $News=News::join('institution','institution.id','=','news.institution_id')->where('institution_id','=',$institution[0]->id)->get(['institution.institutionName','institution.image','news.title','news.body','news.created_at','news.id','news.image']);
        return Response()->json([
            "newsdata"=>$News,
            "status"=>200,
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
        $News=News::find($request->id);
        return Response()->json([
            "data"=>[$News]
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
        $News=News::find($request->id);
        $News->title= $request->title;
        $News->description= $request->description;
        $News->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,$id)
    {
        $News=News::findOrFail($id);
        $News->delete();
        return Response()->json([
            "status"=>200,
        ]);
    }
    public function institutionVerified(Request $request){
        $user=User::join('institution','institution.user_id','=','users.id')->where('users.id','=',$request->id)->get('institution.id');
        return Response()->json(['id'=>$user]);
    }
}
