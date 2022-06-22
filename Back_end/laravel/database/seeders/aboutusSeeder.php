<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class aboutusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('aboutus')->insert([
            'ourVision' => 'Our Vision',
            'ourVisionDetail' => 'To normalize this website system so that it can be operated easily and used by all higher educational institutions and hiring companies all over the country. Also to increase the domain and make it a worldwide or international system that it can be used wherever it is needed.',
            'ourMission' => 'Our Mission',
            'ourMissionDetail' => 'To create a website system that enables the users of the system communicate each other to find a good job and an ideal  hiring company, or vice versa, finding a good freshly graduated employee for their company or firm. To also enable the educational institutions communicate with alumni and instructors for better provision of their students and their future.',
            'ourTeam' => 'Our Team',
            'ourTeamDetail' => 'Our team, team Moonlight, comprises of four team members divided to two sides, the front end developers and the back end developers. Each side having two members working on it, it enabled the members to cooperate with each other and help each other out whenever needed. This caused the team members grow together as a real developer team even by undertaking other informal team positions for various reasons and covering up when one falls short of their task.',
            'TitleOne' => 'Stay connected to your community',
            'TitleOneDetail' => 'We offer multiple convenient ways of connecting you with the community you learned and grew up with by using either news, posts from fellow students or notifications. The notifications can be from either the institution you were in or other institutions as well as hiring companies. This helps getting you started for a new job you are looking for, or for any kid of information you want from your institution.',
            'TitleTwo' => 'Find jobs best suited for you',
            'TitleTwoDetail' => 'Employers across the country will have access to your profile through our advanced filtering method for better compatibility. It will help the companies find a suitable employee from fresh graduates or alumni of the institutions of their choosing or enable the students to better show themselves for the company of their choice. ',
            'TitleThree' => 'Get the latest news from Institutions',
            'TitleThreeDetail' => 'Get news from multiple institutions located in different cities across the country with the option to filter it to your personal institution of choice. Also be able to send or post news or notification of your own either as a student, instructor, hiring company or institution and communicate with users of the system easily. Be on top of any news being posted by your respective institution to get the latest news of what is happening and what kind of jobs are available even in your institution.  ',
            'imageDetail'=>"We developed this website to make connections between students, institution, instructors and hiring companies. The level of connection of students and institutions is to the level where the institution can help the students to find their dream job as well as give them advice whenever they need it. The students are also connected with the instructors for recommendation and verification features. The instructors can recommend the students to hiring companies to make them get better jobs. This connection works from institution to other institution and from one system to another too. ",
            'imageTitle'=>"Connecting Everyone",
            'image' =>'202205311734lily.jpg',
            'TitleOneImage' =>'202205311734lily.jpg',
            'TitleTwoImage' =>'202205311734lily.jpg',
            'TitleThreeImage' =>'202205311734lily.jpg'
        ]);
    }
}
