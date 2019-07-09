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
            ['descricao' => 'Pendente Homologação'],
            ['descricao' => 'Homologado'],
            ['descricao' => 'Reservado'],
            ['descricao' => 'Em uso'],
            ['descricao' => 'Arquivado'],
            ['descricao' => 'Inativado'],
        ];
        DB::table('status_caso_clinico')->insert($data);
    }
}
