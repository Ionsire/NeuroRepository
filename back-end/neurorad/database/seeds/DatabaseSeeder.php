<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(PerfilUsuarioSeeder::class);
        $this->call(EspecialidadeUsuarioSeeder::class);
        $this->call(PapelUsuarioSeeder::class);
        $this->call(StatusUsuarioSeeder::class);
        $this->call(CategoriaCasoClinicoSeeder::class);
        $this->call(SubCategoriaCasoClinicoSeeder::class);
        $this->call(StatusCasoClinicoSeeder::class);
    }
}
