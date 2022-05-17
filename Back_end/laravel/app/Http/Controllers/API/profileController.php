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
            'major'=>'required',
            'name'=>'required|max:191',
            'GPA'=>'required',
            // 'startDate'=>'required',
            // 'endDate'=>'required|after:startDate',
            'startDateClass'=>'required',
            'endDateClass'=>'required|after:startDate',
            // 'skill'=>'required'

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
                $student ->institution_id = $request->input('institution_id');
                $student ->college_id = $request->input('college_id');
                $student ->major = $request->input('major');
                $student ->GPA = $request->input('GPA');
                $student ->department_id = $request->input('department_id');
                $student ->StartDateClass = $request->input('startDateClass');
                $resultStudent = $student->save();
                // $skill= skill::where('user_id','=',$id)->first();
                // $skill ->skill = $request->input('skill');
                // $resultSkill = $skill->save();

            }
        
            if($resultUser && $resultStudent )
            {
            return ["result"=>"user profile has been updated"];
            }
            else
            {
            return ["result"=>"user update failed"];
            }

        }
}

    public function editEmployment(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'companyName'=>'required',
            'position'=>'required',
            'startDate'=>'required',
            'endDate'=>'required|after:startDate'

        ]);
        
        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=> $validator->messages(),
            ]);
        }
        else
        {
            $employment = employmentHistory::findOrFail($id);
            if($employment)
            {
                $employment_history= employmentHistory::where('user_id','=',$id)->first();
                $employment_history ->companyName = $request->input('companyName');
                $employment_history ->endDate = $request->input('endDate');
                $employment_history ->position = $request->input('position');
                $employment_history ->startDate = $request->input('startDate');
                $employment_history ->user_id = $request->input('user_id');
                $resultEmployment_history = $employment_history->save();

                if($resultEmployment_history )
                    {
                    return ["result"=>"employment has been updated"];
                    }
                else
                    {
                    return ["result"=>"employment update failed"];
                    }
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
        // $student = student::where('user_id', $id)->get();
        $employmentHistory = employmentHistory::where('user_id', $id)->get();
   
    //     $student= DB::table('users')
    //    ->join('student','users.id','=','student.user_id')
    //    ->where('users.id',$id) 
    //    ->select('student.*')//this is if you want
    //    ->get();
    $phoneNumber = DB::table('student')->where('user_id', $id)->value('phoneNumber');
    $startDateClass= DB::table('student')->where('user_id', $id)->value('startDateClass');
    $endDateClass= DB::table('student')->where('user_id', $id)->value('endDateClass');
    $sex = DB::table('student')->where('user_id', $id)->value('sex');
    $major = DB::table('student')->where('user_id', $id)->value('major');
    $GPA = DB::table('student')->where('user_id', $id)->value('GPA');
        
    //should I add instructor_id foreign key in users table
    $recommendationDetail = DB::table('recomendation')->where('student_id', $id)->value('recomendationDetail');
    // $instructorName= DB::table('users')
    //    ->join('instructor','users.id','=','instructor.user_id')
    //    ->where('users.id',$id) 
    //    ->select('instructor.GPA')//this is if you want
    //    ->get();
    // $skill = DB::table('skills')->where('user_id', $id)->value('skill');

   
       $skill= DB::table('users')
       ->join('skill','users.id','=','skill.user_id')
       ->where('users.id',$id) 
       ->select('skill.*')//this is if you want
       ->get();

        if($user )
            {
                return response()->json([
                    'status' => 200,
                    'name' => $user->name,
                    'phoneNumber'=>$phoneNumber,
                    'startDateClass'=>$startDateClass,
                    'endDateClass'=>$endDateClass,
                    'sex'=>$sex,
                    'major'=>$major,
                    'GPA'=>$GPA,
                    'recommendationDetail'=>$recommendationDetail,
                    'position'=>$position,
                    'companyName'=>$companyName,
                    'startDate'=>$startDate,
                    'endDate'=>$endDate,
                    'skill'=>$skill,
                    'employmentHistory'=>$employmentHistory
                ]);
            }
            else
            {
            return ["result"=>"getting user failed"];
            }
      
    }

    public function getEmploymentHistory($id)
    {
    $employment = employmentHistory::findOrFail($id);
        $employment->get();

       return response()->json([
        'companyName'=>$employment->companyName,
        "endDate"=>$employment->endDate,
        "startDate"=>$employment->startDate,
        "position"=>$employment->position,
        "id"=>$employment->id,
        "status"=>200
       ]);
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
