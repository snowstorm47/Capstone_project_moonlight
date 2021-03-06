<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\File;
use App\Models\employmentHistory;
use App\Models\notification;
use App\Models\institution;
use Illuminate\Support\Facades\DB;
use App\Models\instructor;

class instructorProfileController extends Controller
{
    //
    public function profileEdit(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            
            'phoneNumber'=>'required|max:13|min:10',
            'sex'=>'required',
            'experience'=>'required',
            'name'=>'required|max:191',
            'GPA'=>'required',
            // 'image' => 'required',

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
                
                $instructor= instructor::where('user_id','=',$id)->first();
                $instructor ->phoneNumber = $request->input('phoneNumber');
                $instructor ->sex = $request->input('sex');
                $instructor ->institution_id = $request->input('institution_id');
                $instructor ->college_id = $request->input('college_id');
                $instructor ->department_id = $request->input('department_id');
                $instructor ->experience = $request->input('experience');
                $instructor ->GPA = $request->input('GPA');
                $instructor->verificationStatus = $request->input('verificationStatus');
                $resultInstructor = $instructor->save();

            }
        
            if($resultUser && $resultInstructor )
            {
            return response()->json([
                "status"=>200,
                "result"=>"instructor profile has been updated"]);
            }
            else
            {
            return ["result"=>"instructor update failed"];
            }

        }
}

public function profile($id){
        
    $user = User::findOrFail($id);
    $employmentHistory = employmentHistory::where('user_id', $id)->get();

    $institution_id = DB::table('instructor')->where('user_id', $id)->value('institution_id');
    $institutionName = DB::table('institution')->where('id', $institution_id)->value('institutionName');
    $department_id = DB::table('instructor')->where('user_id', $id)->value('department_id');
    $departmentName = DB::table('department')->where('id', $department_id)->value('departmentName');
    $college_id = DB::table('instructor')->where('user_id', $id)->value('college_id');
    $collegeName = DB::table('college')->where('id', $college_id)->value('collegeName');
    $phoneNumber = DB::table('instructor')->where('user_id', $id)->value('phoneNumber');
    $sex = DB::table('instructor')->where('user_id', $id)->value('sex');
    $experience = DB::table('instructor')->where('user_id', $id)->value('experience');
    $GPA = DB::table('instructor')->where('user_id', $id)->value('GPA');
    $image = DB::table('instructor')->where('user_id', $id)->value('image');
    // $recommendationDetail = DB::table('recomendation')->where('instructor_id', $id)->value('recomendationDetail');



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
                'sex'=>$sex,
                'experience'=>$experience,
                'GPA'=>$GPA,
                'image'=>$image,
                // 'recommendationDetail'=>$recommendationDetail,
                'skill'=>$skill,
                'employmentHistory'=>$employmentHistory,
                'institution_id'=>$institution_id,
                'institutionName'=>$institutionName
            ]);
        }
        else
        {
        return ["result"=>"getting instructor failed"];
        }
  
}

public function getProfilePicture($id){
    $image = DB::table('instructor')->where('user_id', $id)->value('image');
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
                $instructor= instructor::where('user_id','=',$id)->first();
                $destination = 'uploads/ProfilePicture'.$instructor->image;
                if(File::exists($destination))
                {
                    File::delete($destination);
                }
                $file= $request->file('image');
                if($file){
                $filename= date('YmdHi').$file->getClientOriginalName();
                $file-> move(public_path('uploads/ProfilePicture'), $filename);
                $instructor->image=$filename;
                $resultInstructor = $instructor->save();
                if($resultInstructor )
                {
                return [
                    "status"=>200,
                    "result"=>"user profile image has been updated"];
                }
                else
                {
                return ["result"=>"user image update failed"];
                }
                }
                else{
                    return ['result'=>"file not exist"];
                }
                
            }
        }
public function checkInstructorVerification(Request $request,$id)
{
    $instructor = instructor::where("user_id",$id)->first();
    if($instructor->verificationStatus===1)
    {
        return response()->json([
            'status'=> 200,
            'verified'=>1
        ]);
    }
    else{
    return response()->json([
        'status'=> 200,
        'verified'=>0
    ]);
}
}

public function deleteInstructorVerification(Request $request)
{
    $notification = notification::findOrFail($request->id);
    $notification->delete();
    $instructor=instructor::where('user_id',$request->sender_id)->first();
    $instructor->delete();
    $user = User::findOrFail($request->sender_id);
    $user->delete();
    return response()->json([
        'status'=> 200,
    ]);
}
    
public function addInstructorProfile(Request $request,$id)
{
    $validator = Validator::make($request->all(),[
        
        'phoneNumber'=>'required|max:13|min:10',
        'sex'=>'required',
        'experience'=>'required',
        'GPA'=>'required',
        'institution_id' => 'required',
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
        $instructor = new instructor;
        $file= $request->file('image');
        $filename= date('YmdHi').$file->getClientOriginalName();
        $file-> move(public_path('uploads/ProfilePicture'), $filename);
        $instructor->phoneNumber = $request->phoneNumber;
        $instructor->experience = $request->experience;
        $instructor->GPA = $request->GPA;
        $instructor->sex = $request->sex;
        $instructor ->institution_id = $request->institution_id;
        $instructor ->college_id = $request->college_id;
        $instructor ->department_id = $request->department_id;
        $instructor->verificationStatus = $request->input('verificationStatus');
        $instructor->image=$filename;
        $instructor->user_id=$id;
        $instructor->save();
        $institution = institution::findOrFail($request->institution_id);
        if($institution)
        {
            $notification = new notification;
        $notification->notificationTitle = "Instructor has Registered";
        $notification->notificationDetail = "Please Verify Instructor ".$user->name;
        $notification->sender_id = $id;
        $notification->reciever_id = $institution->user_id;
        $notification->seen_status = "False";
        $notification->save();
        return response()->json([
            'status'=>200,
            'message'=> "Post Successful"
        ]);}
        return response()->json([
            "status" => 200,
            'message'=>'profile created']);
        }

    }
}
}
