<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubCategoriaCasoClinico extends Model
{
    use SoftDeletes;

    protected $table = 'TB_SUBCATEGORIA_CASO_CLINICO';
    protected $primaryKey = 'CO_SEQ_SUBCATEGORIA_CASO_CLINICO';

    protected $fillable = ['DS_DESCRICAO'];

    public function casos_clinicos() {
        return $this->hasMany(CasoClinico::class, 'CO_SUBCATEGORIA', 'CO_SEQ_SUBCATEGORIA_CASO_CLINICO');
    }

    protected $dates = ['DT_CRIACAO', 'DT_ATUALIZACAO', 'DT_EXCLUSAO'];
    const CREATED_AT = 'DT_CRIACAO';
    const UPDATED_AT = 'DT_ATUALIZACAO';
    const DELETED_AT = 'DT_EXCLUSAO';
}
