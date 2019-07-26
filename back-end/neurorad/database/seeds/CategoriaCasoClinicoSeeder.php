<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\PerfilUsuario

class CategoriaCasoClinicoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['DS_DESCRICAO' => 'Raio X'],
            ['DS_DESCRICAO' => 'Ressonância Magnética'],
            ['DS_DESCRICAO' => 'Ultrassonografia']
        ];
        DB::table('TB_CATEGORIA_CASO_CLINICO')->insert($data);
    }
}
