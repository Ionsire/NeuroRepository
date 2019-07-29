<?php

use Illuminate\Database\Seeder;

class StatusCasoClinicoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['DS_DESCRICAO' => 'Pendente Homologação'],
            ['DS_DESCRICAO' => 'Homologado'],
            ['DS_DESCRICAO' => 'Reservado'],
            ['DS_DESCRICAO' => 'Em uso'],
            ['DS_DESCRICAO' => 'Arquivado'],
            ['DS_DESCRICAO' => 'Inativado'],
        ];
        DB::table('TB_STATUS_CASO_CLINICO')->insert($data);
    }
}
