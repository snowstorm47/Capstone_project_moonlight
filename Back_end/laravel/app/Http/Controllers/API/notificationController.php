<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\notification;
class notificationController extends Controller
{
    //
    public function postNotification(Request $request)
    {
        $notification = new notification;
        $notification->notificationTitle = $request->notificationTitle;
        $notification->notificationDetail = $request->notificationDetail;
        $notification->notificationImage = $request->notificationImage;
        $notification->user_id = $request->user_id;
        $notification->save();
        return ['Result'=>'notification added'];
    }

    public function deleteNotification($id)
    {
        $notification = notification::findOrFail($id);
        $notification->delete();
        return ['Result'=>'notification deleted'];
    }

    public function viewNotification()
    {
        $notification = notification::all();
        return($notification); 
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
