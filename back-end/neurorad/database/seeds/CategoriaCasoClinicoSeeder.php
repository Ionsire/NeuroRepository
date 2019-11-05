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
            ['DS_DESCRICAO' => 'Tumores'],
            ['DS_DESCRICAO' => 'Infecções'],
            ['DS_DESCRICAO' => 'Patologias Vasculares'],
            ['DS_DESCRICAO' => 'Doenças Degenerativas'],
            ['DS_DESCRICAO' => 'Doenças Desmielizantes'],
            ['DS_DESCRICAO' => 'Malformações'],
            ['DS_DESCRICAO' => 'Trauma'],
        ];
        DB::table('TB_CATEGORIA_CASO_CLINICO')->insert($data);
    }
}
