<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class employmentHistory extends Model
{
    use HasFactory;
    public $table = "employmenthistory";
    public $timestamps = false;
    protected $fillable = [
        'companyName',
        'position',
        'startDate',
        'endDate'
    ];
}
