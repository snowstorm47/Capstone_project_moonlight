<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class institution extends Model
{
    use HasFactory;
    public $table = "institution";
    public $timestamps = false;
    protected $fillable = [
        'phoneNumber',
        'poBox',
        'image',
        'location',
        'institutionName'
    ];

    public function college()
    {
        return $this->hasMany(college::class);
    }
}
