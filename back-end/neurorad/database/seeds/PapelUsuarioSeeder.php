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
            ['descricao' => 'Preceptor Administrador'],
            ['descricao' => 'Preceptor Colaborador'],
            ['descricao' => 'Residente Colaborador'],
            ['descricao' => 'Residente Administrador'],
            ['descricao' => 'Residente'],
        ];
        DB::table('papel_usuario')->insert($data);
    }
}
