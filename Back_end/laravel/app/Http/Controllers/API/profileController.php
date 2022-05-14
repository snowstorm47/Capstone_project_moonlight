<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\student;
use App\Models\skill;
use Illuminate\Support\Facades\DB;
use App\Models\employmentHistory;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon;

class profileController extends Controller
{
    //
    public function profileEdit(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            
            'phoneNumber'=>'required|max:13|min:10',
            'sex'=>'required',
            'companyName'=>'required',
            'name'=>'required|max:191',
            'position'=>'required',
            'startDate'=>'required',
            'endDate'=>'required|after:startDate',
            'startDateClass'=>'required',
            'endDateClass'=>'required|after:startDate',
            'skill'=>'required'

        ]);
        
        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=> $validator->messages(),
            ]);
        }
        else
        {
            $user = User::findOrFail($id);

            if($user){
                $user->name = $request->name;
                $resultUser = $user->save();
                
                $student= student::where('user_id','=',$id)->first();
                $student ->phoneNumber = $request->input('phoneNumber');
                // $classEnd = $request->input('endDateClass');
                $student ->endDateClass = $request->input('endDateClass');
                $student ->sex = $request->input('sex');
                $student ->StartDateClass = $request->input('startDateClass');
                $resultStudent = $student->save();

                $employment_history= employmentHistory::where('user_id','=',$id)->first();
                $employment_history ->companyName = $request->input('companyName');
                $employment_history ->endDate = $request->input('endDate');
                $employment_history ->position = $request->input('position');
                $employment_history ->startDate = $request->input('startDate');
                $resultEmployment_history = $employment_history->save();

                $skill= skill::where('user_id','=',$id)->first();
                $skill ->skill = $request->input('skill');
                $resultSkill = $skill->save();

            }
        
            if($resultUser && $resultStudent && $resultEmployment_history && $resultSkill)
            {
            return ["result"=>"user profile has been updated"];
            }
            else
            {
            return ["result"=>"user update failed"];
            }

       


        }

        

        
        

    }
    
    public function addSkill(Request $request){
        $skill = new skill;
        $skill->skill = $request->input('skill');
        $skill->user_id = $request->input('user_id');
        $skill->save();
        if($skill)
        {
            return response()->json([
                "status"=>200,
                "result"=>"skill added"]);
        }
    }

    public function addEmploymentHistory(Request $request){
        $employmentHistory = new employmentHistory;
        $employmentHistory->user_id = $request->input('user_id');
        $employmentHistory->companyName = $request->input('companyName');
        $employmentHistory->position = $request->input('position');
        $employmentHistory->startDate = $request->input('startDate');
        $employmentHistory->endDate = $request->input('endDate');
        $employmentHistory->save();

        if($employmentHistory)
        {
            return response()->json([
                "status"=>200,
                "result"=>"Employment History added"
            ]);
        }
    }

   
    public function profile($id){
        
        $user = User::findOrFail($id);
        // $students = student::findOrFail('user_id',$id);
    //     $student= DB::table('users')
    //    ->join('students','users.id','=','students.user_id')
    //    ->where('users.id',$id) 
    //    ->select('students.*')//this is if you want
    //    ->get();
    $phoneNumber = DB::table('student')->where('user_id', $id)->value('phoneNumber');
    $endDateClass = DB::table('student')->where('user_id', $id)->value('endDateClass');
    $startDateClass = DB::table('student')->where('user_id', $id)->value('startDateClass');
    $sex = DB::table('student')->where('user_id', $id)->value('sex');
    $student= DB::table('users')
    ->join('student','users.id','=','student.user_id')
    ->where('users.id',$id) 
    ->select('student.*')//this is if you want
    ->get();
    
    // $companyName = DB::table('employmentHistory')->where('user_id', $id)->value('companyName');
    // $endDate = DB::table('employmentHistory')->where('user_id', $id)->value('endDate');
    // $startDate = DB::table('employmentHistory')->where('user_id', $id)->value('startDate');
    // $position = DB::table('employmentHistory')->where('user_id', $id)->value('position');
    //should I add instructor_id foreign key in users table
    $recommendationDetail = DB::table('recommendation')->where('student_id', $id)->value('recomendationDetail');
    // $instructorName= DB::table('users')
    //    ->join('instructor','users.id','=','instructor.user_id')
    //    ->where('users.id',$id) 
    //    ->select('instructor.GPA')//this is if you want
    //    ->get();
    // $skill = DB::table('skills')->where('user_id', $id)->value('skill');

    //    $employment_history= DB::table('users')
    //    ->join('employment_historys','users.id','=','employment_historys.user_id')
    //    ->where('users.id',$id) 
    //    ->select('employment_historys.*')//this is if you want
    //    ->get();
       $skill= DB::table('users')
       ->join('skill','users.id','=','skill.user_id')
       ->where('users.id',$id) 
       ->select('skill.*')//this is if you want
       ->get();

       $employmentHistory= DB::table('users')
       ->join('employmentHistory','users.id','=','employmentHistory.user_id')
       ->where('users.id',$id) 
       ->select('employmentHistory.*')//this is if you want
       ->get();
    //    return($students);
    //    return($employment_historys);
    //    return($skills);
        if($user )
            {
                return response()->json([
                    'status' => 200,
                    'name' => $user->name,
                    'phoneNumber'=>$phoneNumber,
                    'startDateClass'=>$startDateClass,
                    'endDateClass'=>$endDateClass,
                    'sex'=>$sex,
                    'employmentHistory'=>$employmentHistory,
                    // 'student'=>$student,
                    // 'endDate'=>$endDate,
                    // 'position'=>$position,
                    'skill'=>$skill,
                    'recommendationDetail'=>$recommendationDetail,
                    // 'instructorName'=>$instructorName

                ]);
            }
            else
            {
            return ["result"=>"getting user failed"];
            }

            
            
        
    }
    public function deleteEmployment($id){
            $deleteEmployment_history = employmentHistory::findOrFail($id);
            $deleteEmployment_history->delete();
            if($deleteEmployment_history)
            {
                return [
                    'result'=>'employment history deleted successfully',
                    'status'=> 200
                ];
            }
            else{
                return ['result'=>'employment history deletion failed'];
            }
        }

        public function deleteSkill($id){
            $deleteSkill = skill::findOrFail($id);
            $deleteSkill->delete();
            if($deleteSkill)
            {
                return response()->json([
                    "status"=>200,
                    "result"=>"skill deleted"]);
            }
            else{
                return response()->json([
                    "status"=>200,
                    "result"=>"skill deletion failed"]);
            }
        }
}
