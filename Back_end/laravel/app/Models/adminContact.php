<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class adminContact extends Model
{
    use HasFactory;
    public $table = "admincontact";
    public $timestamps = false;
    protected $fillable = [
        'PhoneNumber',
        'Email',
        'LinkedIn',
        'Facebook',
        'Instagram',        
    ];
}
