<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class contactus extends Model
{
    use HasFactory;
    public $table = "contactus";
    public $timestamps = false;
    protected $fillable = [
        'name',
        'email',
        'phoneNumber',
        'message'
        
    ];
}
