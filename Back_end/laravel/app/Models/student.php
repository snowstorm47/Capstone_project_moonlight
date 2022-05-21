<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class student extends Model
{
    use HasFactory;
    public $table = "student";
    public $timestamps = false;
    protected $fillable = [
        'phoneNumber',
        'sex',
        'startDateClass',
        'endDateClass',
        'image',
    ];

    public function employmentHistorys()
    {
        return $this->hasMany(employmentHistory::class,'');
    }
}
