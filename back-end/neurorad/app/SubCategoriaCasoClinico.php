<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SubCategoriaCasoClinico extends Model
{
    protected $table = 'subcategoria_caso_clinico';

    protected $fillable = ['descricao'];

    public function caso_clinico() {
        return $this->hasMany(CasoClinico::class);
    }
}
