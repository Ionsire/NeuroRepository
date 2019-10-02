<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::all();
        return response()->json($user);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       //Nao usa store
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        return response()->json($user,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // No postman o tipo de formulario é x-www-form-urluncoded 

        $request->validate([
            'CO_PERFIL'=>'required|int',
            'CO_ESPECIALIDADE'=>'required|int',
            'CO_PAPEL'=>'required|int',
            'CO_STATUS'=>'required|int'    
        ]);
        
        $user = User::find($id);
        $user->fill($request->all());
        $user->save();
        return response()->json([
            'message'=>'Dados atualizados com sucesso'
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json([
            'message'=>'Usuario deletado com sucesso'
        ],200);
    }

    public function acessoEspecial(Request $request) // Funcionando
    {
        $request->validate([
            'CO_PERFIL'=>'required|int',
            'CO_ESPECIALIDADE'=>'required|int',
            'CO_PAPEL'=>'required|int',
            'CO_SEQ_USUARIO'=>'required|int',
            'DS_EMAIL'=>'required|string',
            'DT_NASCIMENTO'=>'required|string'
        ]);

        $user = User::find($request->get('CO_SEQ_USUARIO'));

        $user = $user->toArray(); // necessita converter em Array para dar o update

        $user['CO_STATUS'] = 2; // vira pendente, 2 refere-se a pendente para homologacao de papel
        $user['CO_PERFIL'] = $request->get('CO_PERFIL');
        $user['CO_ESPECIALIDADE'] = $request->get('CO_ESPECIALIDADE');
        $user['CO_PAPEL'] = $request->get('CO_PAPEL');
        $user['DS_EMAIL'] = $request->get('DS_EMAIL');
        $user['DT_NASCIMENTO'] = $request->get('DT_NASCIMENTO');

        User::where('CO_SEQ_USUARIO', $request->get('CO_SEQ_USUARIO'))->update($user);

        return response()->json(['message' => 'Socilitacao enviada com sucesso'], 200);
    }

    public function pendencias_usuario(){

        $user = User::query();

        // pega todos os casos com codigo Status 2: pendente de homologacao
        $user = $user->where('CO_STATUS', 2)->get();

        return response()->json($user, 200);
    }
}
