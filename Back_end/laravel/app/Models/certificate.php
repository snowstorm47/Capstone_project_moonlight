<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class certificate extends Model
{
    use HasFactory;
    public $table = "certificate";
    public $timestamps = false;
    protected $fillable = [
        'certificate',
        'description'
        
    ];
}
