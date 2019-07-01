<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategoriaCasoClinico extends Model
{
    protected $table = 'categoria_caso_clinico';

    protected $fillable = ['descricao'];

    public function caso_clinico() {
        return $this->hasMany(CasoClinico::class);
    }
}
