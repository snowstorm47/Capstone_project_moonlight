<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class department extends Model
{
    use HasFactory;
    public $table = "department";
    public $timestamps = false;
    protected $fillable = [
        'departmentName',
        
    ];

    public function college()
    {
    	return $this->belongsTo(college::class);
    }
}
