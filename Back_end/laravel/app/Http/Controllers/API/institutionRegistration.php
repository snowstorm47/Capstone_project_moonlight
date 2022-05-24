<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\institution;
use App\Models\college;
use App\Models\department;
use Illuminate\Support\Facades\DB;


class institutionRegistration extends Controller
{
    //

    public function allinstitution(){
        $institution = institution::all();
        $college = college::all();
        $department = department::all();
        // $user = User::all();
        return response()->json([
            'status' => 200,
            'institution' => $institution,
            'college' => $college,
            'department' => $department
            // 'user'=> $user->name
        ]);
    }

    // public function allcollege(){
    //     $college = college::all();
    //     // $user = User::all();
    //     return response()->json([
    //         'status' => 200,
            
    //         // 'user'=> $user->name
    //     ]);
    // }

    // public function allDepartment(){
    //     $department = department::all();
    //     // $user = User::all();
    //     return response()->json([
    //         'status' => 200,
    //         'department' => $department,
    //         // 'user'=> $user->name
    //     ]);
    // }
    public function addInstitution(Request $request){
        $institution = institution::create([
            'institution'=> $request->institutionName,    
        ]);
        $institution->save();

        $department = department::create([
            
            'departmentName'=> $request->departmentName,    
        ]);
        $department->save();

        $college = college::create([
            'collegeName'=> $request->collegeName,    
        ]);
        $college->save();
    }

    public function addDepartment(Request $request)
    {
        $department = department::create([
            'departmentName'=> $request->departmentName,    
        ]);
    }

    public function addCollege(Request $request)
    {
        $college = college::create([
            'collegeName'=> $request->collegeName,    
        ]);
        $college->save();
    }

    public function deleteInstitution($id){
        // $collegeId = college::where('institution_id','=',$id)->all();
        // $collegeId = DB::table('colleges')->where('institution_id', $id)->get('id');
        // return $collegeId;
        // foreach($collegeId as $cid)
        // {
            $institution = institution::find($id);

            foreach($institution->college as $cid)
            {
                return ['college id'=>$cid];
            }
        // $department = department::where('college_id', $collegeId)->delete();
        // if($department)
        // {
        //     return ['result'=>'department deleted'];
        // }
        // else{
        //     return ['result'=>'department couldnot be deleted'];

        // }
    // }
        // $cid = college::where('institution_id','=',$id)->firstOrFail();
        // $Iid = $cid->institution_id;
        // return ["college"=>$cid,
        // "institution"=>$Iid
        // ] ;
        // foreach($category->college as $cid) // with $category->products you call all products associated to your foreign_key
        //     {
        //         return $cid->institution_id;
        //     }
        // $cid = college::with('institutions')->get();
        // return $cid->institution_id;
        // $department = department::where('college_id', $collegeId)->delete();
        // $college = college::where('institution_id', $id)->delete();
        // $institution = institution::findOrFail($id);
        // $institution->delete();

    }
    public function deleteDepartment($id)
    {
        $department = department::findOrFail($id);
        $department->delete();
    }

    public function deleteCollege($id)
    {
        $department = department::where('college_id', $id)->delete();
        $college = college::findOrFail($id);
        $department->delete();
    }

    public function updateInstitution(Request $request, $id){
        $institution = institution::findOrFail($id);
        $institution->institutionName = $request->institutionName;
        $institution->save();

        $department = department::where('institution_id', $id);
        $department->departmentName = $request->departmentName;
        $department->save();

        $college = college::where('institution_id', $id);
        $college->collegeName = $request->collegeName;
        $college->save();
    }

    public function updateDepartment(Request $request, $id)
    {
        $department = department::findOrFail($id);
        $department->departmentName = $request->departmentName;
        $department->save();
    }

    //should we include the department when updating college
    public function updateCollege(Request $request, $id)
    {
        $college = college::findOrFail($id);
        $college->collegeName = $request->collegeName;
        $college->save();
    }
}
