<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EspecialidadeUsuario extends Model
{
    use SoftDeletes;

    protected $table = 'TB_ESPECIALIDADE_USUARIO';
    protected $primaryKey = 'CO_SEQ_ESPECIALIDADE_USUARIO';

    protected $fillable = ['DS_DESCRICAO'];

    public function usuarios() {
        return $this->hasMany(User::class, 'CO_ESPECIALIDADE', 'CO_SEQ_ESPECIALIDADE_USUARIO');
    }

    protected $dates = ['DT_CRIACAO', 'DT_ATUALIZACAO', 'DT_EXCLUSAO'];
    const CREATED_AT = 'DT_CRIACAO';
    const UPDATED_AT = 'DT_ATUALIZACAO';
    const DELETED_AT = 'DT_EXCLUSAO';

}
