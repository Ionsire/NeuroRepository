<?php

namespace App\Http\Controllers\API;

use App\CasoClinico;
use App\Imagem;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Rules\SegundaFeira;

class CasoClinicoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index_admin(Request $request)
    {
        $search = $request->get('busca', null);
        $casoclinico = CasoClinico::query();
        $resultados = array();

        if ($search != null) {
            if(array_key_exists('DS_DIAGNOSTICO', $search)){
                $casoclinico = $casoclinico
                                    ->where('DS_DIAGNOSTICO', 'LIKE', '%'.$search['DS_DIAGNOSTICO'].'%');
                $resultados['DS_DIAGNOSTICO'] = $casoclinico;
            }
            if(array_key_exists('CO_CATEGORIA', $search)){
                $casoclinico = $casoclinico
                                    ->where('CO_CATEGORIA', '=',$search['CO_CATEGORIA']);
                $resultados['CO_CATEGORIA'] = $casoclinico;
            }
            if(array_key_exists('CO_SUBCATEGORIA', $search)){
                $casoclinico = $casoclinico
                                    ->where('CO_SUBCATEGORIA', '=',$search['CO_SUBCATEGORIA']);
                $resultados['CO_SUBCATEGORIA'] = $casoclinico;
            }
            if(array_key_exists('CO_USUARIO', $search)){
                $casoclinico = $casoclinico
                                    ->where('CO_USUARIO', '=',$search['CO_USUARIO']);
                $resultados['CO_USUARIO'] = $casoclinico;
            }
            if(array_key_exists('DT_CRIACAO', $search)){
                $casoclinico = $casoclinico
                                    ->where('DT_CRIACAO', '=',$search['DT_CRIACAO']);
                $resultados['DT_CRIACAO'] = $casoclinico;
            }
        }
        return response()->json($resultados, 200);
    }

    /**
     * Retorna a lista de casos clínicos Homologados não inativos ou arquivados
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function index(Request $request)
    {
        $search = $request->get('busca', null);
        $casoclinico = CasoClinico::query();
        $casoclinico = $casoclinico
                            ->whereNotIn('CO_STATUS', [1,5,6]);

        $resultados = array();        

        if ($search != null) {
            if(array_key_exists('DS_DIAGNOSTICO', $search)){
                $resultados['DS_DIAGNOSTICO'] = $casoclinico
                                                    ->where('DS_DIAGNOSTICO', 'LIKE', '%'.$search['DS_DIAGNOSTICO'].'%');
            }
            if(array_key_exists('CO_CATEGORIA', $search)){
                $resultados['CO_CATEGORIA'] = $casoclinico
                                                    ->where('CO_CATEGORIA', '=',$search['CO_CATEGORIA']);
            }
            if(array_key_exists('CO_SUBCATEGORIA', $search)){
                $resultados['CO_SUBCATEGORIA'] = $casoclinico
                                                    ->where('CO_SUBCATEGORIA', '=', $search['CO_SUBCATEGORIA']);
            }
        }
        return response()->json($resultados, 200);
    }

    /**
     * Retorna todos os Casos Clínicos pertencentes a semana atual e as semanas já passadas
     *
     * Referente a página inicial da aplicação
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function casos_da_semana_home()
    {
        $casos_da_semana = CasoClinico::all()->filter(function($caso_clinico) {
            if (strtotime($caso_clinico->DT_SEMANA) <= strtotime('this week monday')) {
                return $caso_clinico;
            }
        })->sortByDesc('DT_SEMANA');
        return response()->json($casos_da_semana, 200);
    }

    /**
     * Salva no Caso Clínico a semana referente ao seu agendamento
     *
     * @param $id
     * @param $date
     * @return \Illuminate\Http\JsonResponse
     */
    public function agendar_caso_da_semana($id, $date)
    {
        $data = ['date' => $date];
        $data->validate(['date' => ['date', new SegundaFeira]]);
        $caso_clinico = CasoClinico::where($id);
        $caso_clinico['DT_SEMANA'] = $date;
        $caso_clinico->save();
        return response()->json(['message' => 'Caso Clínico Agendado com Sucesso'], 200);
    }

    /**
     * Remove do Caso Clínico a semana referente ao seu agendamento
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function desagendamento_caso_da_semana($id)
    {
        $caso_clinico = CasoClinico::where($id);
        $caso_clinico['DT_SEMANA'] = null;
        $caso_clinico->save();
        return response()->json(['message' => 'Caso Clínico Desagendado com Sucesso'], 200);
    }

    
    public function homologar($id)
    {
        $caso_clinico = CasoClinico::where($id);
        $caso_clinico['CO_STATUS'] = 2;
        $caso_clinico->save();
        return response()->json(['message' => 'Caso Clínico Homologado com Sucesso'], 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'DS_HISTORIA_CLINICA' =>'required|string',
            'DS_ACHADOS_DAS_IMAGENS'=>'required|string',
            'DS_DIAGNOSTICO'=>'required|string',
            'CO_CATEGORIA'=>'required|int|exists:TB_CATEGORIA_CASO_CLINICO,CO_SEQ_CATEGORIA_CASO_CLINICO',
            'CO_SUBCATEGORIA'=>'int|exists:TB_SUBCATEGORIA_CASO_CLINICO,CO_SEQ_SUBCATEGORIA_CASO_CLINICO',
            'DS_DISCUSSAO'=>'required|string',
            'DS_REFERENCIAS'=>'required|string',
            'NU_REJEICOES'=>'int',
            'DS_CORRECOES'=>'string',
            'CO_USUARIO'=>'required|int|exists:TB_USUARIO,CO_SEQ_USUARIO',
            'CO_STATUS'=>'int|exists:TB_STATUS_CASO_CLINICO,CO_SEQ_STATUS_CASO_CLINICO',
            // 'DT_CRIACAO'=>'required|date'
        ]);
    
        // Salva o caso clínico e recupera o ID recém criado
        $_caso_clinico = CasoClinico::create($request->all());
        $_id_caso = $_caso_clinico->CO_SEQ_CASO_CLINICO;

        //Define o caminho padrão de upload
        $_upload_path = "storage/images";

        $i = 0;
        foreach ($request->images as $image) {
            $_dados_imagem = array(
                'IM_IMAGEM' => $_upload_path,               
                'CO_CASO_CLINICO' => $_id_caso
            );
            $_imagem = Imagem::create($_dados_imagem);
            $_id_imagem = $_imagem->CO_SEQ_IMAGEM;
            $_extension = $image->getClientOriginalExtension();

            $_imagem->IM_IMAGEM = "{$_upload_path}/{$_id_imagem}.{$_extension}";
            $_imagem->save();

            $_filename = "{$_id_imagem}.{$_extension}";
            //Realiza o Upload na pasta do projeto: public/storage/images/filename
            $image->storeAs('images', $_filename);

            //Atualiza a imagem de capa
            if ($i == 0) {
                $_caso_clinico->CO_IMAGEM_CAPA = $_id_imagem;
                $_caso_clinico->save();
            }
            $i++;
        }

        return response()->json([
            'message' => 'Caso clinico cadastrado com sucesso!'
        ], 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $casoclinico = CasoClinico::find($id);
        return response()->json($casoclinico,200);
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
        $request->validate([
            'DS_HISTORIA_CLINICA' =>'required|string',
            'DS_ACHADOS_DAS_IMAGENS'=>'required|string',
            'DS_DIAGNOSTICO'=>'required|string',
            'CO_CATEGORIA'=>'required|int|exists:categoria_caso_clinico,id',
            'CO_SUBCATEGORIA'=>'int|exists:subcategoria_caso_clinico,id',
            'DS_DISCUSSAO'=>'required|string',
            'DS_REFERENCIAS'=>'required|string',
            'NU_REJEICOES'=>'int',
            'DS_CORRECOES'=>'string',
            'CO_USUARIO'=>'required|int|exists:users,id',
            'CO_STATUS'=>'required|int|exists:status_caso_clinico,id',
        ]);
        $casoclinico = CasoClinico::find($id);
        $casoclinico -> fill($request->all());
        $casoclinico -> save();
        return response()->json([
            'message'=>'Caso clinico cadastrado com sucesso!'
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
        $casoclinico = CasoClinico::find($id);
        $casoclinico->delete();
        return response()->json([
            'message'=>'Caso clinico deletado com sucesso!'
        ],200);
    }
}
