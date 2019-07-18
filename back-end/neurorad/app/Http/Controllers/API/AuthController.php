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
            'cpf' => 'required|string|max:11|unique:users',
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'nascimento' => 'required|date',
            'foto' => 'string',
            'perfil_id' => 'required|integer|exists:perfil_usuario,id',
            'especialidade_id' => 'integer|exists:especialidade_usuario,id',
            'papel_id' => 'required|integer|exists:papel_usuario,id',
            'status_id' => 'required|integer|exists:status_usuario,id',
        ]);
        $user = new User([
            'cpf' => $request->cpf,
            'name' => $request->name,
            'email' => $request->email,
            'password' => md5(rand(1, 10000)),
            'nascimento' => $request->nascimento,
            'foto' => $request->foto,
            'perfil_id' => $request->perfil_id,
            'especialidade_id' => $request->especialidade_id,
            'papel_id' => $request->papel_id,
            'status_id' => $request->status_id,
        ]);
        $user->save();
        $token = auth('api')->login($user);
        Cookie::queue('api_access_token', $token,
            auth('api')->factory()->getTTL(), null, null, false, false);
        return redirect()->to(config('services.sabia.client_url'));
//        return response()->json([
//            'message' => 'Successfully created user!',
//            $user,
//        ], 201);
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        auth()->logout();
        Cookie::queue(Cookie::forget('api_access_token'));
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
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
}
