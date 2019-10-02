<?php

use Illuminate\Database\Seeder;

class PerfilUsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['DS_DESCRICAO' => 'Médico'],
            ['DS_DESCRICAO' => 'Estudante'],
            ['DS_DESCRICAO' => 'Demais profissionais da saúde']
        ];
        DB::table('TB_PERFIL_USUARIO')->insert($data);
    }
}
