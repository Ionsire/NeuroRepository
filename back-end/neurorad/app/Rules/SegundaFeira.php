<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class SegundaFeira implements Rule
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
        return date('D', strtotime($value)) === 'Mon';
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'A data informada deve ser uma segunda-feira.';
    }
}
