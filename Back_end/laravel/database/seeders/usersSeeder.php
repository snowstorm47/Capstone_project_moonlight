<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class usersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->insert([
            'name'=> 'Abebe Tesema',
            'email'=>'BeleteTesema@gmail.com',
            'password'=>'1234',
            'position'=>'student'
        ],[
            'name'=> 'Frost Abdellah',
            'email'=>'Frostabdellah@gmail.com',
            'password'=>'3456',
            'position'=>'Instructor'
        ],
    [
        'name'=> 'AASTU',
        'email'=>'AASTU@gmail.com',
        'password'=>'3456',
        'position'=>'Institution'
    ]);
        
    }
}
