<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StatusUsuario extends Model
{
    protected $table = 'TB_STATUS_USUARIO';

    protected $fillable = ['DS_DESCRICAO'];

    public function usuarios() {
        return $this->hasMany(User::class, 'CO_STATUS', 'CO_SEQ_STATUS_USUARIO');
    }

    protected $dates = ['DT_CRIACAO', 'DT_ATUALIZACAO', 'DT_EXCLUSAO'];
    const CREATED_AT = 'DT_CRIACAO';
    const UPDATED_AT = 'DT_ATUALIZACAO';
    const DELETED_AT = 'DT_EXCLUSAO';

}
