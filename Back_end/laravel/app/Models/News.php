<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
     public $fillable=[
        'image',
        'title',
        'description',
        'institution_id',
    ];
    use HasFactory;
}
