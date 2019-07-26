<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Imagem extends Model
{
    use SoftDeletes;

    protected $table = 'TB_IMAGEM';

    protected $fillable = ['IM_IMAGEM', 'CO_CASO_CLINICO'];

    public function caso_clinico() {
        return $this->belongsTo(CasoClinico::class, 'CO_CASO_CLINICO', 'CO_SEQ_CASO_CLINICO');
    }

     public function capa() {
        return $this->hasOne(CasoClinico::class, 'CO_IMAGEM_CAPA', 'CO_SEQ_IMAGEM');
     }
}
