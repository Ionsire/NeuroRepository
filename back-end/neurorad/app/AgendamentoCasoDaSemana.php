<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AgendamentoCasoDaSemana extends Model
{
    protected $table = 'agendamento_caso_da_semana';

    protected $fillable = ['caso_clinico_id', 'caso_da_semana_id'];
}
