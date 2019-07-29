<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'TB_USUARIO';
    protected $primaryKey = 'CO_SEQ_USUARIO';

    protected $fillable = [
        'NU_CPF','DS_NOME', 'DS_EMAIL', 'DS_SENHA', 'DT_NASCIMENTO', 'IM_FOTO', 'CO_PERFIL', 'CO_ESPECIALIDADE', 'CO_PAPEL', 'CO_STATUS',
    ];

    protected $dates = ['DT_CRIACAO', 'DT_ATUALIZACAO', 'DT_EXCLUSAO'];
    const CREATED_AT = 'DT_CRIACAO';
    const UPDATED_AT = 'DT_ATUALIZACAO';
    const DELETED_AT = 'DT_EXCLUSAO';

    public function perfil() {
        return $this->belongsTo(PerfilUsuario::class, 'CO_PERFIL', 'CO_SEQ_PERFIL_USUARIO');
    }

    public function especialidade() {
        return $this->belongsTo(EspecialidadeUsuario::class, 'CO_ESPECIALIDADE', 'CO_SEQ_ESPECIALIDADE_USUARIO');
    }

    public function papel() {
        return $this->belongsTo(PapelUsuario::class, 'CO_PAPEL', 'CO_SEQ_PAPEL_USUARIO');
    }

    public function status() {
        return $this->belongsTo(StatusUsuario::class, 'CO_STATUS', 'CO_SEQ_STATUS_USUARIO');
    }

    public function casos_clinicos() {
        return $this->hasMany(CasoClinico::class, 'CO_USUARIO', 'CO_SEQ_USUARIO');
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'DS_SENHA',
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
