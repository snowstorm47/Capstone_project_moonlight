<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class instructor extends Model
{
    use HasFactory;
    public $table = "instructor";
    public $timestamps = false;
    protected $fillable = [
        'phoneNumber',
        'GPA',
        'verificationStatus',
        'experience',
        'sex',
        'image'
    ];
}
