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
            'name'=>'Abdellah Hussien',
            'email'=>'Abedellahussien@gmail.com',
            'password'=>'1234',
            'position'=>'student'
        ]);
        DB::table('users')->insert([
            'name'=>'Abel Endeshaw',
            'email'=>'AbelEndeshaw@gmail.com',
            'password'=>'1234',
            'position'=>'student'
        ]);
        DB::table('users')->insert([
            'name'=>'AASTU',
            'email'=>'AASTU@gmail.com',
            'password'=>'5687',
            'position'=>'Institution'
        ]);
        DB::table('users')->insert([
            'name'=>'Abebe Challa',
            'email'=>'AbebeChala@gmail.com',
            'password'=>'8753',
            'position'=>'Instructor'
        ]);
        DB::table('users')->insert([
            'name'=>'Berbera Market',
            'email'=>'Berberamarket@gmail.com',
            'password'=>'1234',
            'position'=>'Hiring Company'
        ]);
    }
}
