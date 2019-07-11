<?php

namespace App\Http\Controllers\API;

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
    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function signup(Request $request)
    {
        $request->validate([
            'cpf' => 'required|string|max:11|unique:users',
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed',
            'nascimento' => 'required|date',
            'foto' => 'string',
            'perfil_id' => 'required|integer|exists:perfil_usuario,id',
            'especialidade_id' => 'integer',
            'papel_id' => 'required|integer|exists:papel_usuario,id',
            'status_id' => 'required|integer|exists:status_usuario,id',
        ]);
        $user = new User([
            'cpf' => $request->cpf,
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'nascimento' => $request->nascimento,
            'foto' => $request->foto,
            'perfil_id' => $request->perfil_id,
            'especialidade_id' => $request->especialidade_id,
            'papel_id' => $request->papel_id,
            'status_id' => $request->status_id,
        ]);
        $user->save();
        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }

    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)
    {
        if (strpos($request->email, '@') == false) {
            $user = User::where('cpf', $request->email)->first();
            if (isset($user)) {
                $request->replace(['email' => $user->email]);
            }
        }
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
