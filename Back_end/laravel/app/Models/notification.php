<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class notification extends Model
{
    use HasFactory;
    public $table = "notification";
    public $fillable=[
        'notificationImage',
        'notificationTitle',
        'notificationDetail',
        'sender_id',
        'reciever_id',
        'seen_status'
    ];

    public $timestamps = false;
}
