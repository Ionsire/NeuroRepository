<?php

namespace App;

use Faker\Provider\Image;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CasoClinico extends Model
{
    use SoftDeletes;

    protected $table = 'TB_CASO_CLINICO';
    protected $primaryKey = 'CO_SEQ_CASO_CLINICO';

    protected $fillable = ['DS_HISTORIA_CLINICA', 'DS_ACHADOS_DAS_IMAGENS', 'DS_DIAGNOSTICO', 'CO_CATEGORIA', 'CO_SUBCATEGORIA', 'DS_DISCUSSAO', 'DS_REFERENCIAS', 'NU_REJEICOES', 'DS_CORRECOES', 'CO_USUARIO', 'CO_STATUS', 'DT_SEMANA', 'CO_IMAGEM_CAPA'];

    protected $dates = ['DT_CRIACAO', 'DT_ATUALIZACAO', 'DT_EXCLUSAO'];
    const CREATED_AT = 'DT_CRIACAO';
    const UPDATED_AT = 'DT_ATUALIZACAO';
    const DELETED_AT = 'DT_EXCLUSAO';

    public function autor() {
        return $this->belongsTo(User::class, 'CO_USARIO', 'CO_SEQ_USUARIO');
    }

    public function categoria() {
        return $this->belongsTo(CategoriaCasoClinico::class, 'CO_CATEGORIA', 'CO_SEQ_CATEGORIA_CASO_CLINICO');
    }

    public function subcategoria() {
        return $this->belongsTo(SubCategoriaCasoClinico::class, 'CO_SUBCATEGORIA', 'CO_SEQ_SUBCATEGORIA_CASO_CLINICO');
    }

    public function status() {
        return $this->belongsTo(StatusCasoClinico::class, 'CO_STATUS', 'CO_SEQ_STATUS_CASO_CLINICO');
    }

    public function imagem() {
        return $this->hasMany(Image::class, 'CO_CASO_CLINICO', 'CO_SEQ_CASO_CLINICO');
    }

    public function imagem_capa()
    {
        return $this->hasOne(Image::class, 'CO_SEQ_IMAGEM', 'CO_IMAGEM_CAPA');
    }

}
