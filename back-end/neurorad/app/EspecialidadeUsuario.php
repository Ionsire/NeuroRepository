<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EspecialidadeUsuario extends Model
{
    protected $table = 'especialidade_usuario';

    protected $fillable = ['descricao'];

    public function users() {
        return $this->hasMany(User::class);
    }
}
