<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class departmentSeeder extends Seeder
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
            'department of Computer Science',
            'department of Computer Engineering',
            'department of Mining Engineering',
            'department of Business Administration',
            'department of Software Engineering',
            'department of Civil Engineering',
            'department of Mechanical Engineering',
            'department of Environmental Engineering and Management',
            'department of Electrical Engineering',
            'department of Architecture',
            'department of Industrial Chemistry',
            'department of Biotechnology',
            'department of Chemical Engineering',
            'department of Geology',
            'department of Food Engineering',
            'department of Electromechanical Engineering',
            'department of Industrial and Manufacturing Engineering',
            'department of Food and Nutrition',
            'department of Urban Planning and Design',
            'department of Construction Technology Management',
            'department of Ecobiology',
            'department of Food Process Engineering',
            'department of Economics',
            'department of Marketing',
            'department of Computer Science',
            'department of Laws',
            'department of Business Management(BBM)',
            'department of Medicine and Surgery',
            'department of Nursing',
            'department of Anaesthesia',
            'department of Public Health',
            'department of Statistics',
            'department of Chemistry',
            'department of Biology',
            'department of Mathematics',
            'department of Midwifery',
            'department of Information Technology',
            'department of Physics',
            'department of English and English Literature',
            'department of Animal Production',
            'department of Geography',
            'department of Sociology',
            'department of Paediatrics',
            'department of Psychiatry',
            'department of Psychology',
            'department of Archaeology',
            'department of Internal Medicine',
            'department of Ethical Education'];
        foreach ($list as $list) {
            DB::table('department')->insert([
            'departmentName'=>$list,
        ]);
        }
    }
}
