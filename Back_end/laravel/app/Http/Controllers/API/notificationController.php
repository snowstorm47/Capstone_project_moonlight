<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\notification;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\hiringCompany;


class notificationController extends Controller
{
    //notification may not work because of added sender and receiver id on the table correct it
    public function postNotification(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'notificationTitle'=>'required',
            'notificationDetail'=>'required',
            'notificationImage'=>'required',
            'sender_id'=>'required',
            'reciever_id'=>'required'
        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=> $validator->messages(),
            ]);
        }
        else{
        $file= $request->file('notificationImage');
        $filename= date('Ymd').$file->getClientOriginalName();
        $file-> move(public_path('uploads/NotificationPicture'), $filename);
        $notification = new notification;
        $notification->notificationTitle = $request->notificationTitle;
        $notification->notificationDetail = $request->notificationDetail;
        $notification->notificationImage = $filename;
        $notification->sender_id = $request->sender_id;
        $notification->reciever_id = $request->reciever_id;
        $notification->seen_status = $request->seen_status;
        $notification->save();
        return response()->json([
            'status'=>200,
            'message'=> "Post Successful"
        ]);
    }
    }

    public function deleteNotification($id)
    {
        $notification = notification::findOrFail($id);
        $notification->delete();
        return response()->json([
            'status' => 200,
            'result'=>'notification deleted']);
    }

    public function seenNotification(Request $request, $id)
    {
        $notification = notification::findOrFail($id);
        $notification->seen_status = $request->seen_status;
        $result=$notification->save();

        return Response()->json([
            "status"=>200,
            "result"=>"seen updated",
        ]);
    }

    public function viewSeenNotification($id)
    {
        $notification = notification::where([
            ['reciever_id', '=', $id],
            ['seen_status', '=', 'True']
        ])->get();
        // $notificationDetail = DB::table('notification')->where('user_id', $id)->value('notificationDetail');

        return Response()->json([
            "status"=>200,
            "notification"=>$notification,
        ]);
    }

    

    public function viewNotificationUser($id)
    {
        $notification = notification::where('sender_id', $id)->get();
        // $notificationDetail = DB::table('notification')->where('user_id', $id)->value('notificationDetail');

        return Response()->json([
            "status"=>200,
            "notification"=>$notification,
        ]);
    }

    public function viewNotificationRecieved($id)
    {
        $student = DB::table('student')
            ->join('users', 'student.user_id', '=', 'users.id')
            ->join('notification', 'student.user_id', '=', 'notification.sender_id')
            ->where('notification.reciever_id','=',$id)
            ->get(['notification.notificationTitle','notification.notificationDetail','notification.sender_id','student.image','users.name','notification.created_at']);
           
        return Response()->json([
            "notification"=>$student,
            "status"=>200,
        ]);
    }

    public function showInstitutionNotification(Request $request,$id)
    {
        $institution = DB::table('institution')
            ->join('users', 'institution.user_id', '=', 'users.id')
            ->join('notification', 'institution.user_id', '=', 'notification.sender_id')
            ->where('notification.reciever_id','=',$id)
            // ->select('users.name', 'institution.location', 'notification.notificationTitle')
            ->get(['notification.notificationTitle','notification.notificationDetail','notification.sender_id','institution.image','institution.institutionName','notification.created_at']);
           
        return Response()->json([
            "notification"=>$institution,
            "status"=>200,
        ]);
    }

    public function showHiringCompanyNotification(Request $request,$id)
    {
        $Hiring = DB::table('hiringCompany')
            ->join('users', 'hiringCompany.user_id', '=', 'users.id')
            ->join('notification', 'hiringCompany.user_id', '=', 'notification.sender_id')
            ->where('notification.reciever_id','=',$id)
            // ->select('users.name', 'institution.location', 'notification.notificationTitle')
            ->get(['notification.notificationTitle','notification.notificationDetail','notification.sender_id','hiringCompany.image','users.name','notification.created_at']);

            
        return Response()->json([
            "notification"=>$Hiring,
            "status"=>200,
        ]);
    }

    public function showInstructorNotification(Request $request,$id)
    {
        $instructor = DB::table('instructor')
            ->join('users', 'instructor.user_id', '=', 'users.id')
            ->join('notification', 'instructor.user_id', '=', 'notification.sender_id')
            ->where('notification.reciever_id','=',$id)
            // ->select('users.name', 'institution.location', 'notification.notificationTitle')
            ->get(['notification.notificationTitle','notification.notificationDetail','notification.sender_id','instructor.image','users.name','notification.created_at']);
           
        return Response()->json([
            "notification"=>$instructor,
            "status"=>200,
        ]);
    }


    public function showNotification(Request $request,$id)
    {
        $notification=notification::findOrFail($id);
        if($notification)
        {
    $notificationTitle = DB::table('notification')->where('id', $id)->value('notificationTitle');
    $notificationDetail = DB::table('notification')->where('id', $id)->value('notificationDetail');
    $id = DB::table('notification')->where('id', $id)->value('id');

        }
    

        return Response()->json([
            "status" => 200,
            "notificationTitle" => $notificationTitle,
            "notificationDetail" => $notificationDetail,
            "id" => $id
        ]);
    }

    public function updateNotification(Request $request,$id)
    {
        $notification = notification::findOrFail($id);
        // $file= $request->file('notificationImage');
        // $filename= date('Ymd').$file->getClientOriginalName();
        // $file-> move(public_path('uploads/NotificationPicture'), $filename);
        $notification->notificationTitle = $request->notificationTitle;
        $notification->notificationDetail = $request->notificationDetail;       
        // $notification->notificationImage = $filename;
        // $notification->sender_id = $request->sender_id;
        // $notification->reciever_id = $request->reciever_id;
        $result=$notification->save();
        if($result)
        {
            return Response()->json([ 
                "status" => 200,
                "result"=>"notification has been updated"]);
        }
        else
        {
          return ["result"=>"update failed"];
        }
    }
}
