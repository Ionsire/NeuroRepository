<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StatusCasoClinico extends Model
{
    protected $table = 'status_caso_clinico';

    protected $fillable = ['descricao'];

    public function caso_clinico() {
        return $this->hasMany(CasoClinico::class);
    }
}
