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
            ['DS_DESCRICAO' => 'Cabeça'],
            ['DS_DESCRICAO' => 'Ombro'],
            ['DS_DESCRICAO' => 'Joelho']
        ];
        DB::table('TB_SUBCATEGORIA_CASO_CLINICO')->insert($data);
    }
}
