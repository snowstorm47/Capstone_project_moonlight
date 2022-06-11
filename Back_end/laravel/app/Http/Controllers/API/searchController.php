<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\skill;
use App\Models\student;
use App\Models\institution;
use App\Models\college;
use App\Models\department;
use App\Models\employmentHistory;




use App\Http\Controllers\Controller;


use Illuminate\Http\Request;

class searchController extends Controller
{
    public function getInstitutions(Request $request){
        $result=institution::all();
        return Response()->json(["status"=>200,"data"=>$result]);

    }
     public function getCollege(Request $request){
        $result=college::all();
        return Response()->json(["status"=>200,"data"=>$result]);

    }
     public function getDepartment(Request $request){
        $result=department::all();
        return Response()->json(["status"=>200,"data"=>$result]);

    }
    public function AdvancedSearch(Request $request){
      $result=collect([
      ]);
        if ($request->position=='institution') {
            $result=institution::where('institution.id','=',$request->institution)->get();
        }
        else{
    //     $result=User::leftJoin('skill','users.id','=','skill.user_id')
    //    ->leftJoin('student','users.id','=','student.user_id')
    //    ->leftJoin('employmenthistory','users.id','=','employmenthistory.user_id')
    //    ->where('skill.skill','like','%'.$request->skill.'%')
    //    ->where('student.institution_id','like','%'.$request->institution.'%')
    // ->where('student.gpa','like','%'.$request->gpa.'%')
    //    ->groupBy('users.id')->select('users.*','student.image')->get();
    $users=User::all();
    foreach($users as $user){
        $skill=skill::where('user_id',$user->id)->get('skill');
        $student=student::where('user_id',$user->id)->get();
        $history=employmentHistory::where('user_id',$user->id)->get();
        //$skill=institution::where('id',$user->)->get();


        $result->push(['user'=>$user,'skill'=>$skill,'student'=>$student,'history'=>$history]);

    }
        }

        return Response()->json(["status"=>200,"data"=>$result]);
    }
}
