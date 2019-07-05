<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CasoDaSemana extends Model
{
    protected $table = 'caso_da_semana';

    protected $fillable = ['inicio'];

    public function caso_clinico()
    {
        return $this->belongsToMany(CasoClinico::class, 'agendamento_caso_da_semana');
    }
}
