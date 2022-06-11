<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class adminContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('admincontact')->insert([
            'PhoneNumber' => '+251-9-20-56-40-74',
            'Email' => 'Moonlight@gmail.com',
            'LinkedIn'=>'LinkedIn',
            'Facebook'=>'Facebook',
            'Instagram'=>'Instagram'
        ]);
    }
}
