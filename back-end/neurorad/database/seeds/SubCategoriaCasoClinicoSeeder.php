<?php

use Illuminate\Database\Seeder;

class SubCategoriaCasoClinicoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['descricao' => 'Cabeça'],
            ['descricao' => 'Ombro'],
            ['descricao' => 'Joelho']
        ];
        DB::table('subcategoria_caso_clinico')->insert($data);
    }
}
