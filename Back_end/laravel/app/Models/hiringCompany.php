<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class hiringCompany extends Model
{
    use HasFactory;
    public $table = "hiringCompany";
    public $timestamps = false;
    protected $fillable = [
        'representative',
        'representativeEmail',
        'phoneNumber',
        'poBox',
        'verificationStatus',
        'location',
        'description',
        'image'
    ];
}
