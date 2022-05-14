<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\notification;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;


class notificationController extends Controller
{
    //notification may not work because of added sender and receiver id on the table correct it
    public function postNotification(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'notificationTitle'=>'required',
            'notificationDetail'=>'required',
            'notificationImage'=>'required',

        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=> $validator->messages(),
            ]);
        }
        else{

        $notification = new notification;
        $notification->notificationTitle = $request->notificationTitle;
        $notification->notificationDetail = $request->notificationDetail;
        $notification->notificationImage = $request->notificationImage;
        $notification->user_id = $request->user_id;
        $notification->save();
        return response()->json([
            'status'=>200,
            'notificationTitle'=> $notification->notificationTitle,
            'notificationDetail'=> $notification->notificationDetail,
            'message'=> "Post Successful"
        ]);
    }
    }

    public function deleteNotification($id)
    {
        $notification = notification::findOrFail($id);
        $notification->delete();
        return ['Result'=>'notification deleted'];
    }

    public function viewNotificationUser($id)
    {
        $notification = notification::where('user_id', $id)->get();
        // $notificationDetail = DB::table('notification')->where('user_id', $id)->value('notificationDetail');

        return $notification;
    }

    public function updateNotification(Request $request)
    {
        $notification = notification::findOrFail($request->id);
        $notification->notificationTitle = $request->notificationTitle;
        $notification->notificationDetail = $request->notificationDetail;
        $notification->notificationImage = $request->notificationImage;
        $notification->user_id = $request->user_id;
        $result=$notification->save();
        if($result)
        {
          return ["result"=>"notification has been updated"];
        }
        else
        {
          return ["result"=>"update failed"];
        }
    }
}
