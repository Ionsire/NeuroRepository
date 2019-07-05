<?php

namespace App;

use Faker\Provider\Image;
use Illuminate\Database\Eloquent\Model;

class CasoClinico extends Model
{
    protected $table = 'caso_clinico';
    //comment
    protected $fillable = ['historia_clinica', 'descricao_achados_da_imagem', 'diagnostico', 'categoria_id', 'subcategoria_id', 'discussao', 'referencias', 'rejeicoes', 'correcoes', 'usuario_id', 'status_id', 'publicacao'];

    public function users() {
        return $this->belongsTo(User::class);
    }

    public function categoria() {
        return $this->belongsTo(CategoriaCasoClinico::class);
    }

    public function subcategoria() {
        return $this->belongsTo(SubCategoriaCasoClinico::class);
    }

    public function status() {
        return $this->belongsTo(StatusCasoClinico::class);
    }

    public function imagem() {
        return $this->hasMany(Image::class);
    }
}
