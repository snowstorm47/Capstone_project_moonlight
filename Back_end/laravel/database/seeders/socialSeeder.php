<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class socialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('social_media_link')->insert([
            'user_id'=>1,
            'link'=>'AbdellahHussien@yahoo.com'
        ],
        ['user_id'=>2,
        'link'=>'AbdellahHussien@yahoo.com'
        ]
    );
    }
}
