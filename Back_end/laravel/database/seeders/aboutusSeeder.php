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
            'ourVisionDetail' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere leo eu tristique volutpat. Suspendisse potenti. Proin vulputate tortor et ipsum sagittis, sit amet commodo mi elementum. Donec aliquam augue vitae est malesuada tincidunt. Suspendisse non massa non eros vehicula lacinia. Donec semper ut mi vel sollicitudin. Nullam vestibulum accumsan pellentesque. Suspendisse non pharetra ipsum. Donec a nisl id nisl lacinia iaculis at eget metus.',
            'ourMission' => 'Our Mission',
            'ourMissionDetail' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere leo eu tristique volutpat. Suspendisse potenti. Proin vulputate tortor et ipsum sagittis, sit amet commodo mi elementum. Donec aliquam augue vitae est malesuada tincidunt. Suspendisse non massa non eros vehicula lacinia. Donec semper ut mi vel sollicitudin. Nullam vestibulum accumsan pellentesque. Suspendisse non pharetra ipsum. Donec a nisl id nisl lacinia iaculis at eget metus.',
            'ourTeam' => 'Our Team',
            'ourTeamDetail' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere leo eu tristique volutpat. Suspendisse potenti. Proin vulputate tortor et ipsum sagittis, sit amet commodo mi elementum. Donec aliquam augue vitae est malesuada tincidunt. Suspendisse non massa non eros vehicula lacinia. Donec semper ut mi vel sollicitudin. Nullam vestibulum accumsan pellentesque. Suspendisse non pharetra ipsum. Donec a nisl id nisl lacinia iaculis at eget metus.',
            'TitleOne' => 'Stay connected to your community',
            'TitleOneDetail' => 'we offer multiple convinient ways of connecting you with the community you learned and grew up with by using either news, posts from fellow students or notifications',
            'TitleTwo' => 'Find jobs best suited for you',
            'TitleTwoDetail' => 'Employers accross the country will have access to your profile through our advanced filtering method for better compatability.',
            'TitleThree' => 'Get the latest news from Institutions',
            'TitleThreeDetail' => 'Get news from multiple institutions located in different cities accross the country with the option to filter it to your personal institution of choice.',
            'imageDetail'=>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere leo eu tristique volutpat. Suspendisse potenti. Proin vulputate tortor et ipsum sagittis, sit amet commodo mi elementum. Donec aliquam augue vitae est malesuada tincidunt. Suspendisse non massa non eros vehicula lacinia. Donec semper ut mi vel sollicitudin. Nullam vestibulum accumsan pellentesque. Suspendisse non pharetra ipsum. Donec a nisl id nisl lacinia iaculis at eget metus.",
            'imageTitle'=>"Connecting Everyone",
            'image' =>'202205311734lily.jpg',
            'TitleOneImage' =>'202205311734lily.jpg',
            'TitleTwoImage' =>'202205311734lily.jpg',
            'TitleThreeImage' =>'202205311734lily.jpg'
        ]);
    }
}
