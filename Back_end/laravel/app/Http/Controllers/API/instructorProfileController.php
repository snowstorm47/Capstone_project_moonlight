<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\instructor;

class instructorProfileController extends Controller
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
            'image' => 'required',

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
                $instructor ->endDateClass = $request->input('endDateClass');
                $instructor ->sex = $request->input('sex');
                $instructor ->institution_id = $request->input('institution_id');
                $instructor ->major = $request->input('major');
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
    
public function addInstructorProfile(Request $request,$id)
{
    $validator = Validator::make($request->all(),[
        
        'phoneNumber'=>'required|max:13|min:10',
        'sex'=>'required',
        'major'=>'required',
        'GPA'=>'required',
        'institution_id' => 'required'

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
        $instructor->major = $request->major;
        $instructor->GPA = $request->GPA;
        $instructor->sex = $request->sex;
        $instructor ->institution_id = $request->institution_id;
        $instructor->verificationStatus = $request->input('verificationStatus');
        $instructor->image=$filename;
        $instructor->user_id=$id;
        $instructor->save();
        return response()->json([
            "status" => 200,
            'message'=>'profile created']);
        }

    }
}
}