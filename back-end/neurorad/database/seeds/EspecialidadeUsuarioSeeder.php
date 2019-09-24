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
            ['DS_DESCRICAO' => 'Radiologia'],
            ['DS_DESCRICAO' => 'Neurologia'],
            ['DS_DESCRICAO' => 'Neurocirurgia'],
            ['DS_DESCRICAO' => 'Psiquiatria'],
            ['DS_DESCRICAO' => 'Geriatria'],
            ['DS_DESCRICAO' => 'Outros'],
        ];
        DB::table('TB_ESPECIALIDADE_USUARIO')->insert($data);
    }
}
