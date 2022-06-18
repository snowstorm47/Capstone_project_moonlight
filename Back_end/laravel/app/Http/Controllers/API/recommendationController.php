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
            $user_id=$request->user_id;
        $student=student::join('users','users.id','=','student.user_id')
        ->where('student.institution_id','=',$id)
        ->where('users.id','!=',$user_id)
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
            $result=collect([
            ]);
            $Image;
            $recommendation=recommendation::join('users','users.id','=','recomendation.sender_id')
            ->join('student','student.id','=','recomendation.student_id')
            ->where('student.user_id','=',$id)
            ->get(['users.name','recomendation.recomendationDetail','recomendation.sender_id']);
            foreach ($recommendation as $recomend) {
                $imageStudent=student::where('student.user_id','=',$recomend->sender_id)->get('student.image');
                $imageInstructor=instructor::where('instructor.user_id','=',$recomend->sender_id)->get('instructor.image');
                if ( isset ($imageStudent) && count($imageStudent) > 0 ) {
                   $Image = $imageStudent;
                }
                else{
                    $Image = $imageInstructor;
                }
                $result->push(['recommendation'=>$recomend,'image'=>$Image]);
            }
            
            return Response()->json([
                "recommendation"=>$result,
                "status"=>200,
            ]);
        
    }
        
}
