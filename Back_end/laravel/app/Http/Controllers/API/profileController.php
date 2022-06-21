<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\student;
use App\Models\skill;
use Illuminate\Support\Facades\DB;
use App\Models\employmentHistory;
use App\Models\socialMediaLink;
use App\Models\certificate;
use App\Models\institution;
use App\Models\hiringCompany;
use App\Models\instructor;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\File;

class profileController extends Controller
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
            'startDateClass'=>'required',
            'endDateClass'=>'required|after:startDate',
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
                // $file= $request->file('image');
                // $filename= date('YmdHi').$file->getClientOriginalName();
                // $file-> move(public_path('uploads/ProfilePicture'), $filename);
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
                // $student->image=$filename;
                $resultStudent = $student->save();
                // $skill= skill::where('user_id','=',$id)->first();
                // $skill ->skill = $request->input('skill');
                // $resultSkill = $skill->save();

            }
        
            if($resultUser && $resultStudent )
            {
            return response()->json([
                "status"=>200,
                "result"=>"user profile has been updated"]);
            }
            else
            {
            return ["result"=>"user update failed"];
            }

        }
}
    
    public function getProfilePicture($id){
        $image = DB::table('student')->where('user_id', $id)->value('image');
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
                    $student= student::where('user_id','=',$id)->first();
                    $destination = 'uploads/ProfilePicture'.$student->image;
                    if(File::exists($destination))
                    {
                        File::delete($destination);
                    }
                    $file= $request->file('image');
                    if($file){
                    $filename= date('YmdHi').$file->getClientOriginalName();
                    $file-> move(public_path('uploads/ProfilePicture'), $filename);
                    $student->image=$filename;
                    $resultStudent = $student->save();
                    if($resultStudent )
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
        
    public function addStudentProfile(Request $request,$id)
    {
        $validator = Validator::make($request->all(),[
            
            'phoneNumber'=>'required|max:13|min:10',
            'sex'=>'required',
            'major'=>'required',
            'GPA'=>'required|numeric|between:1.50,4.00',
            'startDateClass'=>'required',
            'endDateClass'=>'required|after:startDate',
            'institution_id' => 'required',
            'college_id' => 'required',
            'department_id' => 'required',
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
            $student = new student;
            $file= $request->file('image');
            $filename= date('YmdHi').$file->getClientOriginalName();
            $file-> move(public_path('uploads/ProfilePicture'), $filename);
            $student->phoneNumber = $request->phoneNumber;
            $student->major = $request->major;
            $student->startDateClass = $request->startDateClass;
            $student->endDateClass = $request->endDateClass;
            $student->GPA = $request->GPA;
            $student->sex = $request->sex;
            $student ->institution_id = $request->institution_id;
            $student ->department_id = $request->department_id;
            $student ->college_id = $request->college_id;
            // $student ->institution_id = $request->input('institution_id');
            //     $student ->college_id = $request->input('college_id');                
            //     $student ->department_id = $request->input('department_id');

            $student->image=$filename;
            $student->user_id=$id;
            $student->save();
            return response()->json([
                "status" => 200,
                'message'=>'profile created']);
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

    

public function editSocialMediaLink(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'link'=>'required',
        ]);
        
        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=> $validator->messages(),
            ]);
        }
        else
        {
            $socialMediaLink = socialMediaLink::findOrFail($id);
            if($socialMediaLink)
            {
                // $socialMediaLink= socialMediaLink::where('user_id','=',$id)->first();
                $socialMediaLink ->link = $request->input('link');
                // $socialMediaLink ->user_id = $request->input('user_id');
                $resultsocialMediaLink = $socialMediaLink->save();

                if($resultsocialMediaLink)
                    {
                    return ["result"=>"socialMediaLink has been updated"];
                    }
                else
                    {
                    return ["result"=>"socialMediaLink update failed"];
                    }
            }
        }
}
    public function addSkill(Request $request){
        $validator = Validator::make($request->all(),[
            'skill'=>'required',
        ]);
        
        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=> $validator->messages(),
            ]);
        }
        else
        {
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
    }

    public function addEmploymentHistory(Request $request){
        $validator = Validator::make($request->all(),[
            'companyName'=>'required',
            'position'=>'required',
            'startDate'=>'required',
            'endDate'=>'required|after:startDate',
        ]);
        
        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=> $validator->messages(),
            ]);
        }
        else
        {
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
        }}
    }

    public function addCertificate(Request $request){
        $validator = Validator::make($request->all(),[
            'certificate' => 'required',
            'description'=>'required',
        ]);
if($validator->fails()) {
            return response()->json(
                [ 'validation_errors'=> $validator->messages(),]);
        }
        else{
            $file= $request->file('certificate');
            $filename= date('YmdHi').$file->getClientOriginalName();
            $file-> move(public_path('uploads/Certificates'), $filename);
        $certificate = new certificate;
        $certificate->certificate = $filename;
        $certificate->description = $request->input('description');
        $certificate->user_id = $request->input('user_id');
        $certificate->save();
        if($certificate)
        {
            return response()->json([
                "status"=>200,
                "result"=>"certificate added"]);
        }
    }
    }

    public function addSocialMediaLink(Request $request){
        $validator = Validator::make($request->all(),[
            'link'=>'required',
        ]);
        
        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=> $validator->messages(),
            ]);
        }
        else
        {
        $socialMediaLink = new socialMediaLink;
        $socialMediaLink ->link  = $request->input('link');
        $socialMediaLink ->user_id = $request->input('user_id');
        $socialMediaLink ->save();
        if($socialMediaLink )
        {
            return response()->json([
                "status"=>200,
                "result"=>"socialMediaLink added"]);
        }}
    }
    
    public function checkCreateProfile(Request $request)
    {
        $id= $request->id;
        // return $id;
        $student = student::where('user_id', $id)->first();
        $instructor = instructor::where('user_id', $id)->first();
        $institution = institution::where('user_id', $id)->first();
        $hiring = hiringCompany::where('user_id', $id)->first();
        // return $student;
        if($student||$instructor||$institution||$hiring)
        {
            return response()->json([
                "status"=>200,
                "first"=>1]);
        }
        else{
            return response()->json([
                "status"=>200,
                "first"=>0]);
        }
    }
    public function profile($id){
        
        $user = User::findOrFail($id);
        // $student = student::where('user_id', $id)->get();
        $employmentHistory = employmentHistory::where('user_id', $id)->get();
        $certificate = certificate::where('user_id', $id)->get();
        $email = DB::table('users')->where('id', $id)->value('email');
        
        $institution_id = DB::table('student')->where('user_id', $id)->value('institution_id');
        $institutionName= DB::table('institution')->where('id', $institution_id)->value('institutionName');
        $college_id = DB::table('student')->where('user_id', $id)->value('college_id');
        $collegeName = DB::table('college')->where('id', $college_id)->value('collegeName');
        $department_id = DB::table('student')->where('user_id', $id)->value('department_id');
        $departmentName = DB::table('department')->where('id', $department_id)->value('departmentName');
        $phoneNumber = DB::table('student')->where('user_id', $id)->value('phoneNumber');
        $startDateClass= DB::table('student')->where('user_id', $id)->value('startDateClass');
        $endDateClass= DB::table('student')->where('user_id', $id)->value('endDateClass');
        $sex = DB::table('student')->where('user_id', $id)->value('sex');
        $major = DB::table('student')->where('user_id', $id)->value('major');
        $GPA = DB::table('student')->where('user_id', $id)->value('GPA');
        $image = DB::table('student')->where('user_id', $id)->value('image');
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
                    'image'=>$image,
                    'recommendationDetail'=>$recommendationDetail,
                    'skill'=>$skill,
                    'employmentHistory'=>$employmentHistory,
                    'certificate'=>$certificate,
                    'email'=>$email,
                    'institution_id'=>$institution_id,
                    'college_id'=>$college_id,
                    'department_id'=>$department_id,
                    'institutionName'=>$institutionName,
                    'collegeName'=>$collegeName,
                    'departmentName'=>$departmentName
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

    public function getSocialMediaLink($id)
    {
    // $link = DB::table('socialMediaLink')->where('user_id', $id)->value('link');
    // $user_id = DB::table('socialMediaLink')->where('user_id', $id)->value('user_id');
    $socialMediaLink= DB::table('users')
    ->join('socialMediaLink','users.id','=','socialMediaLink.user_id')
    ->where('users.id',$id) 
    ->select('socialMediaLink.*')//this is if you want
    ->get();
       return response()->json([
        'socialMediaLink'=>$socialMediaLink,
        "status"=>200
       ]);
    }

    public function getSocialMediaLinkSingle($id)
    {
    $socialMediaLink = DB::table('socialMediaLink')->where('id', $id)->value('link');

        // $SocialMediaLink = socialMediaLink::findOrFail($id);
        // $SocialMediaLink->get();
    // $socialMediaLink= DB::table('users')
    // ->join('socialMediaLink','users.id','=','socialMediaLink.user_id')
    // ->where('users.id',$id) 
    // ->select('socialMediaLink.*')//this is if you want
    // ->get();
       return response()->json([
        'socialMediaLink'=>$socialMediaLink,
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

        public function deleteSocialMediaLink($id){
            $deleteSocialMediaLink = socialMediaLink::findOrFail($id);
            $deleteSocialMediaLink->delete();
            if($deleteSocialMediaLink)
            {
                return [
                    'result'=>'SocialMediaLink deleted successfully',
                    'status'=> 200
                ];
            }
            else{
                return ['result'=>'SocialMediaLink deletion failed'];
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

        public function deleteCertificate($id){
            $deleteCertificate = certificate::findOrFail($id);
            $deleteCertificate->delete();
            if($deleteCertificate)
            {
                return response()->json([
                    "status"=>200,
                    "result"=>"Certificate deleted"]);
            }
            else{
                return response()->json([
                    "status"=>200,
                    "result"=>"Certificate deletion failed"]);
            }
        }
}
