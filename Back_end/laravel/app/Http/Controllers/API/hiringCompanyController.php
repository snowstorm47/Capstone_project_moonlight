<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\hiringCompany;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;

class hiringCompanyController extends Controller
{
    //
    public function addHiringCompanyProfile(Request $request,$id)
    {
        $validator = Validator::make($request->all(),[
            
            'phoneNumber'=>'required|max:13|min:10',
            'poBox'=>'required',
            'location'=>'required',
            'representative'=>'required',
            'representativeEmail'=>'required',
            'description'=>'required',
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
            $hiringcompany = new hiringcompany;
            $file= $request->file('image');
            $filename= date('YmdHi').$file->getClientOriginalName();
            $file-> move(public_path('uploads/ProfilePicture'), $filename);
            $hiringcompany->phoneNumber = $request->phoneNumber;
            $hiringcompany->poBox = $request->poBox;
            $hiringcompany ->location = $request->location;
            $hiringcompany->description = $request->description;
            $hiringcompany->representative = $request->representative;
            $hiringcompany->representativeEmail = $request->representativeEmail;
            $hiringcompany->image=$filename;
            $hiringcompany->user_id=$id;
            $hiringcompany->save();
            return response()->json([
                "status" => 200,
                'message'=>'hiringcompany profile created']);
            }

        }
    }

    public function profile($id){
       
        
            $user = User::findOrFail($id);
        
            $phoneNumber = DB::table('hiringcompany')->where('user_id', $id)->value('phoneNumber');
            $representative = DB::table('hiringcompany')->where('user_id', $id)->value('representative');
            $representativeEmail = DB::table('hiringcompany')->where('user_id', $id)->value('representativeEmail');
            $poBox = DB::table('hiringcompany')->where('user_id', $id)->value('poBox');
            $location = DB::table('hiringcompany')->where('user_id', $id)->value('location');
            $description = DB::table('hiringCompany')->where('user_id', $id)->value('description');
            
            if($user )
                {
                    return response()->json([
                        'status' => 200,
                        'name' => $user->name,
                        'phoneNumber'=>$phoneNumber,
                        'representative'=>$representative,
                        'representativeEmail'=>$representativeEmail,
                        'poBox'=>$poBox,
                        'location'=>$location,
                        'description'=>$description,
                    ]);
                }
                else
                {
                return ["result"=>"getting hiringcompany failed"];
                }
          
        }
      
    

    public function profileEdit(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            
            'phoneNumber'=>'required|max:13|min:10',
            'poBox'=>'required',
            'location'=>'required',
            'representative'=>'required',
            'representativeEmail'=>'required',
            'description'=>'required',

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
                
                $hiringcompany= hiringcompany::where('user_id','=',$id)->first();
                $hiringcompany ->phoneNumber = $request->input('phoneNumber');
                $hiringcompany ->poBox = $request->input('poBox');
                $hiringcompany ->location = $request->input('location');
                $hiringcompany ->representativeEmail = $request->input('representativeEmail');
                $hiringcompany ->representative = $request->input('representative');
                $hiringcompany ->description = $request->input('description');
                $resultHiringCompany = $hiringcompany->save();

            }
        
            if($resultUser && $resultHiringCompany )
            {
            return response()->json([
                "status"=>200,
                "result"=>"hiringcompany profile has been updated"]);
            }
            else
            {
            return ["result"=>"hiringcompany update failed"];
            }

        }
    }
    public function getProfilePicture($id){
        $image = DB::table('hiringcompany')->where('user_id', $id)->value('image');
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
                    $hiringcompany= hiringcompany::where('user_id','=',$id)->first();
                    $destination = 'uploads/ProfilePicture'.$hiringcompany->image;
                    if(File::exists($destination))
                    {
                        File::delete($destination);
                    }
                    $file= $request->file('image');
                    if($file){
                    $filename= date('YmdHi').$file->getClientOriginalName();
                    $file-> move(public_path('uploads/ProfilePicture'), $filename);
                    $hiringcompany->image=$filename;
                    $resultHiringCompany = $hiringcompany->save();
                    if($resultHiringCompany )
                    {
                    return [
                        "status"=>200,
                        "result"=>"hiringcompany profile image has been updated"];
                    }
                    else
                    {
                    return ["result"=>"hiringcompany image update failed"];
                    }
                    }
                    else{
                        return ['result'=>"file not exist"];
                    }
                    
                }
            }
}
