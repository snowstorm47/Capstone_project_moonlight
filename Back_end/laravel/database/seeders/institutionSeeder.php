<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class institutionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $list=[
        'Admas University College',
        'Addis Ababa Institute of Technology',
        'Addis Ababa Medical University College Hargeisa',
        'Adama Science & Technology University',
        'Addis Ababa Science and Technology University',
        'Addis Ababa University',
        'Addis Ababa University College of Commerce',
        'Addis Continental Institute of Public Health',
        'Adigrat University',
        'Admas University',
        'Alage Agricultural Technical Vocational Educational and Training College',
        'Alpha University College',
        'Ambo University',
        'Arba Minch University',
        'Arsi University',
        'Bahir Dar University',
        'BITS College',
        'Bule Hora University',
        'Central Health College',
        'CPU College',
        'Debre Markos University',
        'Debre Tabor University',
        'Defence Engineering College',
        'Dilla University',
        'Dire Dawa University',
        'Ethiopia Adventist College',
        'Ethiopian Civil Service University',
        'Ethiopian Graduate School of Theology',
        'Ethiopian Institute of Architecture',
        'GAGE University College',
        'Grace College of Business and Computer Science',
        'Graduate School of Telecommunications and Information Technology',
        'Haramaya University',
        'Hawassa University',
        'HiLCoE School of Computer Science and Technology College',
        'Hope University College',
        'Infonet College',
        'International Leadership Institute',
        'Jigjiga University',
        'Jimma University',
        'Kotebe Metropolitan University',
        'Madawalabu University',
        'Mekane Yesus Seminary',
        'Mekelle Institute of Technology',
        'Mekelle University',
        'Meserete Kristos College',
        'Mizan-Tepi University',
        'Oromia State University',
        'Rift Valley University College',
        "Saint Mary's University College Ethiopia",
        'Samara University',
        'SRI SAI College',
        "St Paul's Hospital Millennium Medical College",
        'Unity University College',
        'University of Gondar',
        'Washera College',
        'Western University College Ethiopia',
        'Wolkite University',
        'Wollega University',
        'Wollo University',
];
        foreach ($list as $list) {
           
            DB::table('institution')->insert([
            'institutionName'=>$list,
            'user_id'=>'3'
        ]);
        }
         
    }
}
