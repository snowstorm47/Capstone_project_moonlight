<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class socialMediaLink extends Model
{
    use HasFactory;
    public $table = "socialMediaLink";
    public $timestamps = false;
    protected $fillable = [
        'link',
        
    ];
}
