<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class collegeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $list=[
            'College of Architecture and Civil Engineering.',
            'College of Biological and Chemical Engineering.',
            'College of Electrical and Mechanical Engineering.',
            'College of Health Sciences and Medicine',
            'College of Education',
            'College of Social and Natural Sciences.',
            'College of Medicine and Health Science.',
            'College of Business and Economics.',
            'College of Agriculture and Environmental Science.',
            'School of Law.'];
        foreach ($list as $list) {
            DB::table('college')->insert([
            'collegeName'=>$list,
        ]);
        }
    }
}
