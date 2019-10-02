<?php

use Illuminate\Database\Seeder;

class StatusUsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['DS_DESCRICAO' => 'Ativo'],
            ['DS_DESCRICAO' => 'Pendente'],
            ['DS_DESCRICAO' => 'Homologado'],
            ['DS_DESCRICAO' => 'Inativo'],
            ['DS_DESCRICAO' => 'Excluido']
        ];
        DB::table('TB_STATUS_USUARIO')->insert($data);
    }
}
