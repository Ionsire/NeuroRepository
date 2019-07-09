<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CasoDaSemanaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [];
        for ($i = 0; $i < 20; $i++) {
            array_push($data, ['inicio' => date('Y-m-d',strtotime('monday this week'.' +'.$i.' weeks'))]);
        }
        DB::table('caso_da_semana')->insert($data);
    }
}
