<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Cookie;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;


class AuthController extends Controller
{
    /**
     * Index users
     *
     * Show all users in database
     * To use, uncomment the function bellow and the corresponding route in /routes/api.php
     */
//    public function index()
//    {
//        $users = User::all();
//        return response()->json($users, 200);
//    }

    public function signup(Request $request)
    {
        $request->validate([
            'NU_CPF' => 'required|string|max:11|unique:TB_USUARIO',
            'DS_NOME' => 'required|string',
            'DS_EMAIL' => 'required|string|email|unique:TB_USUARIO',
            'DT_NASCIMENTO' => 'required|date',
            'IM_FOTO' => 'string',
            'CO_PERFIL' => 'required|integer|exists:TB_PERFIL_USUARIO,CO_SEQ_PERFIL_USUARIO',
            'CO_ESPECIALIDADE' => 'integer|exists:TB_ESPECIALIDADE_USUARIO,CO_SEQ_ESPECIALIDADE_USUARIO',
            'CO_PAPEL' => 'required|integer|exists:TB_PAPEL_USUARIO,CO_SEQ_PAPEL_USUARIO',
            'CO_STATUS' => 'required|integer|exists:TB_STATUS_USUARIO,CO_SEQ_STATUS_USUARIO',
        ]);
        $user = new User([
            'NU_CPF' => $request->NU_CPF,
            'DS_NOME' => $request->DS_NOME,
            'DS_EMAIL' => $request->DS_EMAIL,
            'DS_SENHA' => md5(rand(1, 10000)),
            'DT_NASCIMENTO' => $request->DT_NASCIMENTO,
            'IM_FOTO' => $request->IM_FOTO,
            'CO_PERFIL' => $request->CO_PERFIL,
            'CO_ESPECIALIDADE' => $request->CO_ESPECIALIDADE,
            'CO_PAPEL' => $request->CO_PAPEL,
            'CO_STATUS' => $request->CO_STATUS,
        ]);
        $user->save();
        $token = auth('api')->login($user);
        Cookie::queue('api_access_token', $token,
            auth('api')->factory()->getTTL(), null, null, false, false);
        // return redirect()->to(config('services.sabia.client_url'));
       return response()->json([
           'message' => 'Successfully created user!',
           $user,
       ], 201);
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        // $value = $request->token;
        // $token= $request->user()->tokens->find($value);
        // $token->revoke();

        Auth::logout();

        return response()->json('Deslogado com sucesso');
        //auth('api')->logout();
        // Cookie::queue(Cookie::forget('api_access_token'));
        // return response()->json([
        //     'message' => 'Successfully logged out'
        // ]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user()
    {
        return response()->json(auth()->user());
    }

    public function teste()
    {
        return response(['message' => 'testando acessou']);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }


    public function login()
    {
        // $credentials = request(['email', 'password']);

        // if (! $token = auth()->attempt($credentials)) {
        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }

        // return $this->respondWithToken($token);
    }
}
