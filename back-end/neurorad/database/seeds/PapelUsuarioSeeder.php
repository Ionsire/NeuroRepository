<?php

use Illuminate\Database\Seeder;

class PapelUsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['DS_DESCRICAO' => 'Preceptor Administrador'],
            ['DS_DESCRICAO' => 'Preceptor Colaborador'],
            ['DS_DESCRICAO' => 'Residente Colaborador'],
            ['DS_DESCRICAO' => 'Residente Administrador'],
            ['DS_DESCRICAO' => 'Residente'],
            ['DS_DESCRICAO' => 'Comum'],
        ];
        DB::table('TB_PAPEL_USUARIO')->insert($data);
    }
}
