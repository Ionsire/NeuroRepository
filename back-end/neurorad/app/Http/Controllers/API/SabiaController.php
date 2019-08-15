<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Cookie;
use App\Http\Controllers\Controller;
use App\User;
use Socialite;

class SabiaController extends Controller
{
    /**
     * Redirect the user to the GitHub authentication page.
     *
     * @return \Illuminate\Http\Response
     */
    public function redirectToProvider()
    {
        return Socialite::driver('sabia')->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback()
    {
        $usuario_sabia = Socialite::driver('sabia')->stateless()->user();
        $usuario = User::where('DS_EMAIL', $usuario_sabia->email)
            ->orWhere('NU_CPF', $usuario_sabia->id)
            ->first();
        if (isset($usuario)) {
            $usuario->DS_EMAIL = $usuario_sabia->email;
            $usuario->save();
            $token = auth('api')->login($usuario);
            Cookie::queue('api_access_token', $token,
                auth('api')->factory()->getTTL(), null, null, false, false);
            return redirect()->to(config('services.sabia.client_url'));
        }

        return response()->json($usuario_sabia, 200);
        // TODO: Mudar para uma Resource
    }
}
