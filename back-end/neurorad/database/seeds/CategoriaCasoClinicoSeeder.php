<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriaCasoClinicoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['descricao' => 'Raio X'],
            ['descricao' => 'Ressonância Magnética'],
            ['descricao' => 'Ultrassonografia']
        ];
        DB::table('categoria_caso_clinico')->insert($data);
    }
}
