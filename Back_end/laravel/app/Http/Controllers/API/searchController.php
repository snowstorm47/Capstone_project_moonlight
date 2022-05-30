<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\skill;
use App\Models\institution;
use App\Models\college;
use App\Models\department;




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
        if ($request->position=='institution') {
            $result=institution::where('institution.id','=',$request->institution)->get();
        }
        else{
        $result=User::leftJoin('skill','users.id','=','skill.user_id')
       ->leftJoin('student','users.id','=','student.user_id')
       ->leftJoin('employmenthistory','users.id','=','employmenthistory.user_id')
       ->where('skill.skill','like','%'.$request->skill.'%')
       ->where('student.institution_id','=','%'.$request->institution.'%')
       ->where('student.gpa','=','%'.$request->gpa.'%')
       ->where('users.position','like','%'.$request->position.'%')
       ->groupBy('skill.user_id')->select('users.*')->get();
        }

        return Response()->json(["status"=>200,"data"=>$result]);
    }
}
