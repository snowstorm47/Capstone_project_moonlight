<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class recommendation extends Model
{
    use HasFactory;
    public $table = "recommendation";
    public $timestamps = false;
    protected $fillable = [
        'recommendation_detail',
       
    ];
}
