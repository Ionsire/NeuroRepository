<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'cpf','name', 'email', 'password', 'nascimento', 'foto', 'perfil_id', 'especialidade_id', 'papel_id', 'status_id',
    ];

    public function perfil() {
        return $this->belongsTo(PerfilUsuario::class);
    }

    public function especialidade() {
        return $this->belongsTo(EspecialidadeUsuario::class);
    }

    public function papel() {
        return $this->belongsTo(PapelUsuario::class);
    }

    public function status() {
        return $this->belongsTo(StatusUsuario::class);
    }

    public function caso_clinico() {
        return $this->hasMany(CasoClinico::class, 'usuario_id');
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
