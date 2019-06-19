<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
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
        $user = Socialite::driver('sabia')->user();

        return response()->json($user, 200);
        // $user->token;
    }
}