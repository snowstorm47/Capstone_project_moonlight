<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class skill extends Model
{
    use HasFactory;
    public $table = "skill";
    public $timestamps = false;
    protected $fillable = [
        'user_id',
        'skill'
    ];
    public function User(){
    return $this->hasOne(User::class);
}
}
