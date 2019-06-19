<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PapelUsuario extends Model
{
    protected $table = 'papel_usuario';

    protected $fillable = ['descricao'];

    public function users() {
        return $this->hasMany(User::class);
    }
}
