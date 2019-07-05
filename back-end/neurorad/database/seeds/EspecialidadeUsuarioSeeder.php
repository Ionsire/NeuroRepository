<?php

use Illuminate\Database\Seeder;

class EspecialidadeUsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['descricao' => 'Radiologia'],
            ['descricao' => 'Neurologia'],
            ['descricao' => 'Neurocirurgia'],
            ['descricao' => 'Psiquiatria'],
            ['descricao' => 'Geriatria'],
            ['descricao' => 'Outros'],
        ];
        DB::table('especialidade_usuario')->insert($data);
    }
}
