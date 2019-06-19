<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StatusUsuario extends Model
{
    protected $table = 'status_usuario';

    protected $fillable = ['descricao'];

    public function users() {
        return $this->hasMany(User::class);
    }
}
