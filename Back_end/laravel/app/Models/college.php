<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class college extends Model
{
    use HasFactory;
    public $table = "college";
    public $timestamps = false;
    protected $fillable = [
        'collegeName',
        
    ];

    public function department()
    {
        return $this->hasMany(department:: class,'college_id');
    }

    public function institution()
    {
    	return $this->belongsTo(institution::class);
    }

}
