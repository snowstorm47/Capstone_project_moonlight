<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class aboutus extends Model
{
    use HasFactory;
    public $table = "aboutus";
    public $timestamps = false;
    protected $fillable = [
        'ourTeam',
        'ourTeamDetail',
        'ourVision',
        'ourVisionDetail',
        'ourMission',
        'ourMissionDetail',
        'TitleOneDetail',
        'TitleOne',
        'TitleTwoDetail',
        'TitleTwo',
        'TitleThreeDetail',
        'TitleThree',
        'image',
        'TitleOneImage',
        'TitleTwoImage',
        'TitleThreeImage'     
        
    ];
}
