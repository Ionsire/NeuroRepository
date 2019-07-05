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
            ['descricao' => 'Ativo'],
            ['descricao' => 'Inativo'],
            ['descricao' => 'Excluido']
        ];
        DB::table('status_usuario')->insert($data);
    }
}
