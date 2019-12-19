<?php

namespace App\Rules;

use App\CasoClinico;
use Illuminate\Contracts\Validation\Rule;

class SemanaDisponivel implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $numero_casos = CasoClinico::all()->where('semana', '=', $value)->count();
        return $numero_casos < 3;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'A semana escolhida não tem disponibilidade para mais Casos Clínicos.';
    }
}
