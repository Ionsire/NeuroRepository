<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Imagem extends Model
{
    protected $table = 'imagem';

    protected $fillable = ['imagem', 'caso_clinico_id'];

    public function caso_clinico() {
        return $this->belongsTo(CasoClinico::class);
    }

     public function capaAssign() {
        return $this->hasOne(CasoClinico::class, 'imagem_capa_id');
     }

}
