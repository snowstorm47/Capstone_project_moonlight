<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\recommendation;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\student;
use App\Models\instructor;
use Illuminate\Support\Facades\Validator;

class recommendationController extends Controller
{
    //

    public function sendRecommendation(Request $request)
    {
        $validator = Validator::make($request->all(),[
            
            'recomendationDetail'=>'required',
            'sender_id'=>'required',
            'student_id'=>'required',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=> $validator->messages(),
            ]);
        }
        else
        {
            
                $recommendation = new recommendation;
                $recommendation->recomendationDetail = $request->recomendationDetail;
                $recommendation->sender_id = $request->sender_id;
                $recommendation->student_id = $request->student_id;
                $recommendation->save();
                return response()->json([
                    "status" => 200,
                    'message'=>'recommendation created']);
                
            }
        }

        public function filterStudent(Request $request,$id)
        {
        $student=student::join('users','users.id','=','student.user_id')
        ->where('student.institution_id','=',$id)
        ->get(['users.name','student.id']);

        return Response()->json([
            "student"=>$student,
            "status"=>200,
        ]);
        }
    
        public function instructorInstitutionId($id)
        {
            $instructor= User:: findOrFail($id);

            if($instructor)
            {
                $institution_id= DB::table('instructor')->where('user_id',$id)->value('institution_id');
                $sender_id=instructor::join('users','users.id','=','instructor.user_id')
                ->where('users.id','=',$id)
                ->get(['instructor.id']);
        return Response()->json([
            'institution_id'=>$institution_id,
            "sender_id"=>$sender_id,
            "status"=>200
        ]);

            }
        }

        public function studentInstitutionId($id)
        {
            $student= User:: findOrFail($id);

            if($student)
            {
                $institution_id= DB::table('student')->where('user_id',$id)->value('institution_id');
                $sender_id=student::join('users','users.id','=','student.user_id')
                ->where('users.id','=',$id)
                ->get(['student.id']);
        return Response()->json([
            'institution_id'=>$institution_id,
            "sender_id"=>$sender_id,
            "status"=>200
        ]);

            }
        }

    public function getRecommendation(Request $request,$id)
    {
        $recommendation = recommendation::where('sender_id',$id)->get('recomendationDetail');
        $instructor = instructor::where('user_id',$id)->first();
        $student = student::where('user_id',$id)->first();
        $image = DB::table('institution')->where('user_id', $id)->value('image');
        $name = DB::table('users')->where('id', $id)->value('name');
        if($student)
        {
        $image = DB::table('student')->where('user_id', $id)->value('image');
            return Response()->json([
                "recommendation"=>$recommendation,
                "image"=>$image,
                "name"=>$name,
                "status"=>200
            ]);
        }
        else if($instructor)
        {
            $image = DB::table('instructor')->where('user_id', $id)->value('image');
            return Response()->json([
                "recommendation"=>$recommendation,
                "image"=>$image,
                "name"=>$name,
                "status"=>200
            ]);
        }
        else{
            return Response()->json([
                "result"=>"error",
                "status"=>200
            ]);
        }
    }
        
}
