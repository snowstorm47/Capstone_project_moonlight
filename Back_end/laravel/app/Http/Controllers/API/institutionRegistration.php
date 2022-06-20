<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\institution;
use App\Models\college;
use App\Models\instructor;
use App\Models\department;
use App\Models\notification;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\User;


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

    public function profile($id)
    {
        $user = User::findOrFail($id);

        $phoneNumber = DB::table('institution')->where('user_id', $id)->value('phoneNumber');
        $location = DB::table('institution')->where('user_id', $id)->value('location');
        $institutionName = DB::table('institution')->where('user_id', $id)->value('institutionName');
        $image = DB::table('institution')->where('user_id', $id)->value('image');
        $poBox = DB::table('institution')->where('user_id', $id)->value('poBox');

        if($user )
            {
                return response()->json([
                    'status' => 200,
                    // 'name' => $user->name,
                    'phoneNumber'=>$phoneNumber,
                    'poBox'=>$poBox,
                    'location'=>$location,
                    'institutionName'=>$institutionName,
                    'image'=>$image,
                ]);
            }
            else
            {
            return ["result"=>"getting institution failed"];
            }
    }
    public function addInstitutionProfile(Request $request,$id)
    {
        $validator = Validator::make($request->all(),[
            
            'phoneNumber'=>'required|max:13|min:10',
            'poBox'=>'required',
            'location'=>'required',
            'institutionName'=>'required',
            'image'=>'required'
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
            $institution = new institution;
            $file= $request->file('image');
            $filename= date('YmdHi').$file->getClientOriginalName();
            $file-> move(public_path('uploads/ProfilePicture'), $filename);
            $institution->phoneNumber = $request->phoneNumber;
            $institution->poBox = $request->poBox;
            $institution ->location = $request->location;
            $institution->institutionName = $request->institutionName;
            $institution->image=$filename;
            $institution->user_id=$id;
            $institution->save();
            return response()->json([
                "status" => 200,
                'message'=>'institution profile created']);
            }

        }
    }

    public function profileEdit(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            
            'phoneNumber'=>'required|max:13|min:10',
            'poBox'=>'required',
            'institutionName'=>'required',
            'location'=>'required',

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
                $user->name = $request->institutionName;
                $resultUser = $user->save();
                
                $institution= institution::where('user_id','=',$id)->first();
                $institution ->phoneNumber = $request->input('phoneNumber');
                $institution ->poBox = $request->input('poBox');
                $institution ->location = $request->input('location');
                $institution ->institutionName = $request->input('institutionName');
                $resultInstitution = $institution->save();

            }
        
            if($resultUser && $resultInstitution )
            {
            return response()->json([
                "status"=>200,
                "result"=>"institution profile has been updated"]);
            }
            else
            {
            return ["result"=>"institution update failed"];
            }

        }
}
    public function getProfilePicture($id){
        $image = DB::table('institution')->where('user_id', $id)->value('image');
        return response()->json([
            'status'=> 200,
            'image'=>$image
        ]);
    }
        public function editProfilePicture(Request $request, $id)
        {
            $user = User::findOrFail($id);

                if($user){
                    // return ['image'=>$request->image];
                    $institution= institution::where('user_id','=',$id)->first();
                    $destination = 'uploads/ProfilePicture'.$institution->image;
                    if(File::exists($destination))
                    {
                        File::delete($destination);
                    }
                    $file= $request->file('image');
                    if($file){
                    $filename= date('YmdHi').$file->getClientOriginalName();
                    $file-> move(public_path('uploads/ProfilePicture'), $filename);
                    $institution->image=$filename;
                    $resultInstitution = $institution->save();
                    if($resultInstitution )
                    {
                    return [
                        "status"=>200,
                        "result"=>"institution profile image has been updated"];
                    }
                    else
                    {
                    return ["result"=>"institution image update failed"];
                    }
                    }
                    else{
                        return ['result'=>"file not exist"];
                    }
                    
                }
            }
    public function addInstitution(Request $request){
        $institution = institution::create([
            'institution'=> $request->institutionName,    
        ]);
        $institution->save();
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
        $institution = institution::findOrFail($id);
        $institution->delete();

    }
    public function deleteDepartment($id)
    {
        $department = department::findOrFail($id);
        $department->delete();
    }

    public function deleteCollege($id)
    {
        $college = college::findOrFail($id);
        $college->delete();
    }

    public function updateInstitution(Request $request, $id){
        $institution = institution::findOrFail($id);
        $institution->institutionName = $request->institutionName;
        $institution->save();
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

    public function verifyInstructor(Request $request, $id)
    {
        $instructor= instructor::where('user_id',$id)->first();
        $institution= institution::findOrFail($instructor->institution_id);
        if($institution->id==$instructor->institution_id)
        {
            
            $instructor->verificationStatus=1;
            $verify=$instructor->save();
            $notification = notification::findOrFail($request->notificationId);
            $notification->delete();
            if($notification)
            {
                return response()->json([
                    'status'=> 200,
                ]);
            }
        }
        else{
            return response()->json([
                'status'=> 404,
            ]);
        }
    }
    
}
