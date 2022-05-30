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
        'major',
        'user_id',
        'department_id',
        'college_id',
        'GPA',
        'phoneNumber',
        'sex',
        'startDateClass',
        'endDateClass'
    ];

    public function employmentHistorys()
    {
        return $this->hasMany(employmentHistory::class,'');
    }
}
