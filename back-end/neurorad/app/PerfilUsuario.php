<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PerfilUsuario extends Model
{
    protected $table = 'perfil_usuario';

    protected $fillable = ['descricao'];

    public function users() {
        return $this->hasMany(User::class);
    }
}
