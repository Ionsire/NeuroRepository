<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'TB_USUARIO';

    protected $fillable = [
        'NU_CPF','DS_NOME', 'DS_EMAIL', 'DS_SENHA', 'DT_NASCIMENTO', 'IM_FOTO', 'perfil_id', 'especialidade_id', 'papel_id', 'status_id',
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

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
