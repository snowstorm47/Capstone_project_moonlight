<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\hiringCompany;
use App\Models\contactus;
use App\Models\aboutus;
use App\Models\User;
use App\Models\notification;
use App\Models\institution;
use App\Models\admincontact;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;


class AdminController extends Controller
{
    //

    public function destroyHiringCompany(Request $request)
    {
        $hiringCompany=hiringCompany::findOrFail($request->id);
        $hiringCompany->delete();
        $users= User::findOrFail($request->user_id);
        $users->delete();
        return Response()->json([
            "status"=>200,
        ]);
    }

    public function destroyInstitution(Request $request)
    {
        $id = notification::where('sender_id', '=', $request->sender_id)->value('id');
        $notification = notification::findOrFail($id);
        $notification->delete();
        $institutionUser_id=User::findOrFail($request->sender_id);
        $institutionUser_id->delete();
        return Response()->json([
            "status"=>200,
            "id"=>$institutionUser_id
        ]);
    }

    public function showNotificationInstitution(Request $request,$id)
    {
        // $notification=notification::findOrFail($id);
        $notification = notification::where('reciever_id', '=', $id)->get();
        $sender_id = notification::where('reciever_id', '=', $id)->value('sender_id');
        return Response()->json([
            "status" => 200,
            "notification" => $notification,
            "sender_id" => $sender_id
        ]);
    }

    public function deleteVerifyNotification(Request $request)
    {
        $id = notification::where('sender_id', '=', $request->sender_id)->value('id');
        $notification = notification::findOrFail($id);
        $notification->delete();
        return response()->json([
            'status' => 200,
            'result'=>'notification deleted']);
    }
    public function acceptInstitution(Request $request)
    {
        $institutionUser_id=User::findOrFail($request->sender_id);
        $institution = institution::where('institutionName', '=', $institutionUser_id->name)->first();
        $institution->user_id = $request->sender_id;
        $institution->save();
        return Response()->json([
            "status"=>200,
            "id"=>$institution
        ]);
    }

    public function showHiring(Request $request)
    {
        $hiring=hiringCompany::join('users','users.id','=','hiringcompany.user_id')->get(['users.name','hiringcompany.image','hiringcompany.id','hiringcompany.user_id','users.email']);
        return Response()->json([
            "status"=>200,
            "hiring"=>$hiring
        ]);
    }

    public function editAboutus(Request $request,$id)
    {
        $validator = Validator::make($request->all(),[
            
            'ourTeam'=>'required',
            'ourTeamDetail'=>'required',
            'ourVision'=>'required',
            'ourVisionDetail'=>'required',
            'ourMission'=>'required',
            'ourMissionDetail'=>'required',
            'TitleOne'=>'required',
            'TitleOneDetail'=>'required',
            'TitleTwo'=>'required',
            'TitleTwoDetail'=>'required',
            'TitleThree'=>'required',
            'TitleThreeDetail'=>'required',
        ]);
        
        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=> $validator->messages(),
            ]);
        }
        else
        {
        $aboutus = aboutus::findOrFail($id);
        $aboutus->ourTeam = $request->ourTeam;
        $aboutus->ourTeamDetail = $request->ourTeamDetail;
        $aboutus->ourVisionDetail = $request->ourVisionDetail;
        $aboutus->ourVision = $request->ourVision;
        $aboutus->ourMission = $request->ourMission;
        $aboutus->ourMissionDetail = $request->ourMissionDetail;
        $aboutus->TitleOne = $request->TitleOne;
        $aboutus->TitleOneDetail = $request->TitleOneDetail;
        $aboutus->TitleTwo = $request->TitleTwo;
        $aboutus->TitleTwoDetail = $request->TitleTwoDetail;
        $aboutus->TitleThree = $request->TitleThree;
        $aboutus->TitleThreeDetail = $request->TitleThreeDetail;
        $aboutus->save();
        if($aboutus)
        {
        return response()->json([
            'status'=>200
        ]);
        }
        }
}
public function editTitleOneImage(Request $request,$id)
{
    $validator = Validator::make($request->all(),[
            
        'TitleOneImage' => 'required',

    ]);
    $aboutus = aboutus::findOrFail($id);
    $destination = 'uploads/AboutusPicture'.$aboutus->TitleOneImage;
    if(File::exists($destination))
    {
        File::delete($destination);
    }
    $file= $request->file('TitleOneImage');
    if($file){
    $filename= date('YmdHi').$file->getClientOriginalName();
    $file-> move(public_path('uploads/AboutusPicture'), $filename);
    $aboutus->TitleOneImage=$filename;
    $save =$aboutus->save();
    if($save)
    {
        return response()->json([
            'status'=>200
        ]);
    }
    else{
        return response()->json([
            'result'=>"error"
        ]);
    }
    }
    else{
        return response()->json([
            'error'=>"did not get file"
        ]);
    }
}

public function editTitleTwoImage(Request $request,$id)
{
    $validator = Validator::make($request->all(),[
            
        'TitleTwoImage' => 'required',

    ]);
    $aboutus = aboutus::findOrFail($id);
    $destination = 'uploads/AboutusPicture'.$aboutus->TitleTwoImage;
    if(File::exists($destination))
    {
        File::delete($destination);
    }
    $file= $request->file('TitleTwoImage');
    if($file){
    $filename= date('YmdHi').$file->getClientOriginalName();
    $file-> move(public_path('uploads/AboutusPicture'), $filename);
    $aboutus->TitleTwoImage=$filename;
    $save =$aboutus->save();
    if($save)
    {
        return response()->json([
            'status'=>200
        ]);
    }
    else{
        return response()->json([
            'result'=>"error"
        ]);
    }
    }
    else{
        return response()->json([
            'error'=>"did not get file"
        ]);
    }
}
public function editTitleThreeImage(Request $request,$id)
{
    $validator = Validator::make($request->all(),[
            
        'TitleThreeImage' => 'required',

    ]);
    $aboutus = aboutus::findOrFail($id);
    $destination = 'uploads/AboutusPicture'.$aboutus->TitleThreeImage;
    if(File::exists($destination))
    {
        File::delete($destination);
    }
    $file= $request->file('TitleThreeImage');
    if($file){
    $filename= date('YmdHi').$file->getClientOriginalName();
    $file-> move(public_path('uploads/AboutusPicture'), $filename);
    $aboutus->TitleThreeImage=$filename;
    $save =$aboutus->save();
    if($save)
    {
        return response()->json([
            'status'=>200
        ]);
    }
    else{
        return response()->json([
            'result'=>"error"
        ]);
    }
    }
    else{
        return response()->json([
            'error'=>"did not get file"
        ]);
    }
}
public function editBackgroundAboutus(Request $request,$id){
    $validator = Validator::make($request->all(),[
            
        'image' => 'required',

    ]);
    $aboutus = aboutus::findOrFail($id);
    $destination = 'uploads/AboutusPicture'.$aboutus->image;
    if(File::exists($destination))
    {
        File::delete($destination);
    }
    $file= $request->file('image');
    if($file){
    $filename= date('YmdHi').$file->getClientOriginalName();
    $file-> move(public_path('uploads/AboutusPicture'), $filename);
    $aboutus->image=$filename;
    $save =$aboutus->save();
    if($save)
    {
        return response()->json([
            'status'=>200
        ]);
    }
    else{
        return response()->json([
            'result'=>"error"
        ]);
    }
    }
    else{
        return response()->json([
            'error'=>"did not get file"
        ]);
    }
}
    public function showAboutus()
    {
        $aboutus = aboutus::all();
        return response()->json([
            'aboutus'=>$aboutus,
            'status'=>200
        ]);
    }

    public function showAdminContact()
    {
        $contact = adminContact::all();
        return response()->json([
            'contact'=>$contact,
            'status'=>200
        ]);
    }

    public function editContact(Request $request,$id)
    {
        $validator = Validator::make($request->all(),[
            'PhoneNumber'=>'required',
            'Email'=>'required',
            'LinkedIn'=>'required',
            'Facebook'=>'required',
            'Instagram'=>'required'
        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=> $validator->messages(),
            ]);
        }
        else{
        $adminContact = admincontact::findOrFail($id);
            if($adminContact){
        $adminContact->PhoneNumber = $request->PhoneNumber;
        $adminContact->Email = $request->Email;
        $adminContact->LinkedIn = $request->LinkedIn;
        $adminContact->Facebook = $request->Facebook;
        $adminContact->Instagram = $request->Instagram;
        $adminContact->save();
        return response()->json([
            'status'=>200,
            'message'=> "Admin Contact updated"
        ]);
    }
    }
    }

    public function sendMessage(Request $request){
        $contactus = new contactus;
        $contactus ->name  = $request->input('name');
        $contactus ->email  = $request->input('email');
        $contactus ->phoneNumber  = $request->input('phoneNumber');
        $contactus ->message  = $request->input('message');

        $contactus ->save();
        if($contactus )
        {
            return response()->json([
                "status"=>200,
                "result"=>"message added"]);
        }}

    public function deleteMessage(Request $request){
        $message = contactus::findOrFail($request->id);
        $message->delete();
        if($message)
        {
            return response()->json([
                "status"=>200,
                "result"=>"message deleted"]);
        }
    }

    public function showMessage(Request $request){
        $message = contactus::all();
        if($message)
        {
            return response()->json([
                "status"=>200,
                "message"=>$message]);
        }
    }
}
