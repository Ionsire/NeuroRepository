<?php

use Illuminate\Database\Seeder;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['NU_CPF' => '24733458304'],
            ['DS_NOME' => 'Manuel Moreira Neto'],
            ['DS_EMAIL' => 'mmoreira.neto@hotmail.com'],
            ['DS_SENHA' => 'b1c1c47f20cf1d3253555b8cf83949c0'],
            ['DT_NASCIMENTO' => '1966-03-15'],
            ['IM_FOTO' => 'https://assets.sabia.ufrn.br/static/images/default.png'],
            ['CO_PERFIL' => 1],
            ['CO_ESPECIALIDADE' => 1],
            ['CO_PAPEL' => 1],
            ['CO_STATUS' => 3],
        ];
        DB::table('TB_STATUS_USUARIO')->insert($data);
    }
}
