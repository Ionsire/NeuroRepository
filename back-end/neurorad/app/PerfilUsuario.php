<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PerfilUsuario extends Model
{
    use SoftDeletes;

    protected $table = 'TB_PERFIL_USUARIO';
    protected $primaryKey = 'CO_SEQ_PERFIL_USUARIO';

    protected $fillable = ['DS_DESCRICAO'];

    public function usuarios() {
        return $this->hasMany(User::class, 'CO_PERFIL', 'CO_SEQ_PERFIL_USUARIO');
    }

    protected $dates = ['DT_CRIACAO', 'DT_ATUALIZACAO', 'DT_EXCLUSAO'];
    const CREATED_AT = 'DT_CRIACAO';
    const UPDATED_AT = 'DT_ATUALIZACAO';
    const DELETED_AT = 'DT_EXCLUSAO';

}
