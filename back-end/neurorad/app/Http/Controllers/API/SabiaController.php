<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Cookie;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use App\User;
use Socialite;

class SabiaController extends Controller
{



    public $code = 'QmAw1derAHSLiUXX4oDDm3JeJt0VoP';


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
        //return response()->json($usuario_sabia->user);
        //return response()->json($usuario_sabia->user['avatar']);
        //return response()->json($usuario_sabia->user['cpf']);
        //return response()->json($usuario_sabia->user['email']);
        //return response()->json($usuario_sabia->user['name']);
        if (isset($usuario)) { //funcionando
            $usuario->DS_EMAIL = $usuario_sabia->email;
            $usuario->save();

            $usuario_log = $usuario;

            

            $token = auth('api')->login($usuario);

            // tentando adicionar ao usuario o token no objeto nao funciona ainda mas so oq precisa é juntar os dados
            // do usuario e o token JWT
            $usuario_log->remember_token = $token;

            //return response()->json($usuario_sabia, 200);
            return response()->json($token, 200);


            /*  ###################  Tentando entender como funciona essa logica para o services  ##################### */
            // Cookie::queue('api_access_token', $token,
            //     auth('api')->factory()->getTTL(), null, null, false, false);
            //return redirect()->to(config('services.sabia.client_url'));
        }
        else{
            // precisa cadastrar um novo usuario no banco
            //return response()->json('usuario nao encontrado');
            $user = new User([
                'NU_CPF' => $usuario_sabia->user['cpf'], 
                'DS_NOME' => $usuario_sabia->user['name'], 
                'DS_EMAIL' => $usuario_sabia->user['email'], 
                'DS_SENHA' => md5(rand(1, 10000)),
                'DT_NASCIMENTO' => '2019-01-01', // valor Default
                'IM_FOTO' => $usuario_sabia->user['avatar'],
                //'CO_PERFIL' => '1', 
                //'CO_ESPECIALIDADE' => '1', 
                'CO_PAPEL' => '6', //Usuario Comum
                'CO_STATUS' => '1', // ativo
            ]);
            $user->save();
            if($user){
                //return response()->json('novo usuario adicionado com sucesso', 200);
            }
            else{
                //return response()->json('ERROR no novo usuario');
            }
            // criando o token
            $token = auth('api')->login($user);

            return response()->json($token, 200);

            //return response()->json('não autorizado', 401);
        }

        //return response()->json($usuario_sabia, 200);
        // TODO: Mudar para uma Resource
    }
}
