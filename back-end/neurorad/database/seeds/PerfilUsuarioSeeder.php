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
            ['descricao' => 'Médico'],
            ['descricao' => 'Estudante'],
            ['descricao' => 'Demais profissionais da saúde']
        ];
        DB::table('perfil_usuario')->insert($data);
    }
}
