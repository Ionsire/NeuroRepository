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

    private $checkList = array();

    // Recebe o objeto retornado da consulta e verifica se ele ja esta na lista
    public function checkList($obj)
    {
        //se sim nao faz nada 

        
        // if($checklist == $obj->)
        // {

        // }
    }



    public function index_admin(Request $request) // Falta validar de verdade
    {
        $search = $request->get('busca', null);
        $casoclinico = CasoClinico::query();
        $resultados = array();

        if ($search != null) {
            if(array_key_exists('DS_DIAGNOSTICO', $search)){
                $casoclinico = $casoclinico
                                    ->where('DS_DIAGNOSTICO', 'LIKE', '%'.$search['DS_DIAGNOSTICO'].'%')->get();
                $resultados['DS_DIAGNOSTICO'] = $casoclinico;
               
                
            }
            if(array_key_exists('CO_CATEGORIA', $search)){
                $casoclinico = $casoclinico
                                    ->where('CO_CATEGORIA', '=',$search['CO_CATEGORIA'])->get();
                $resultados['CO_CATEGORIA'] = $casoclinico;
            }
            if(array_key_exists('CO_SUBCATEGORIA', $search)){
                $casoclinico = $casoclinico
                                    ->where('CO_SUBCATEGORIA', '=',$search['CO_SUBCATEGORIA'])->get();
                $resultados['CO_SUBCATEGORIA'] = $casoclinico;
            }
            if(array_key_exists('CO_USUARIO', $search)){
                $casoclinico = $casoclinico
                                    ->where('CO_USUARIO', '=',$search['CO_USUARIO'])->get();
                $resultados['CO_USUARIO'] = $casoclinico;
            }
            if(array_key_exists('DT_CRIACAO', $search)){
                $casoclinico = $casoclinico
                                    ->where('DT_CRIACAO', '=',$search['DT_CRIACAO'])->get();
                $resultados['DT_CRIACAO'] = $casoclinico;
            }
        }
        // dd($casoclinico->get());
        //dd($resultados['DS_DIAGNOSTICO']->get());
        return response()->json($resultados, 200);
    }

    /**
     * Retorna a lista de casos clínicos Homologados não inativos ou arquivados
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function index(Request $request) // Funcionando com Erro no retorno, valores duplicados
    {
        $search = $request->get('busca', null);

        // Usa o ->get() pra nao dar error
        $casoclinico = CasoClinico::query();


        // Observação importante: os casos clinicos retornados são somente os que não tem Status 1 e 6 
        // Sendo respectivamentes: Pendentes e inativos
        

        // Erro semantico, os casos clinicos com status 5 significam que estão disponiveis na base geral(Arquivados)
                            // ->whereNotIn('CO_STATUS', [1,5,6]);

        $casoclinico = $casoclinico->whereNotIn('CO_STATUS', [1,2,3,4,6]); // atualizado

        $resultados = array();       
        
        if ($search != null) {

            // if(array_key_exists('DS_DIAGNOSTICO', $search)){

            //     // $resultados['DS_DIAGNOSTICO'] = $casoclinico
            //     //                                      ->where('DS_DIAGNOSTICO', 'LIKE', '%'.$search['DS_DIAGNOSTICO'].'%')->get();


            //     $test = $casoclinico->where('DS_DIAGNOSTICO', 'LIKE', '%'.$search['DS_DIAGNOSTICO'].'%')->where('CO_CATEGORIA', '=',$search['CO_CATEGORIA'])->get();
                       
            //     return response()->json($test, 200);
            //     dd($test);
                                                    
            // }
            // if(array_key_exists('CO_CATEGORIA', $search)){
            //     $resultados['CO_CATEGORIA'] = $casoclinico
            //                                         ->where('CO_CATEGORIA', '=',$search['CO_CATEGORIA'])->get();
                                                    
            // }
            // if(array_key_exists('CO_SUBCATEGORIA', $search)){
            //     $resultados['CO_SUBCATEGORIA'] = $casoclinico
            //                                         ->where('CO_SUBCATEGORIA', '=', $search['CO_SUBCATEGORIA'])->get();
                                                    
            // }

            if(array_key_exists('DS_DIAGNOSTICO', $search)&& array_key_exists('CO_CATEGORIA', $search)&&array_key_exists('CO_SUBCATEGORIA', $search))
            {
                //dd('D,C,S');
                $resultados = $casoclinico->where('DS_DIAGNOSTICO', 'LIKE', '%'.$search['DS_DIAGNOSTICO'].'%')->where('CO_CATEGORIA', '=',$search['CO_CATEGORIA'])->where('CO_SUBCATEGORIA', '=', $search['CO_SUBCATEGORIA'])->get();
                return response()->json($resultados, 200);
            } 
            else if(array_key_exists('DS_DIAGNOSTICO', $search)&& array_key_exists('CO_CATEGORIA', $search))
            {
                //dd('D,C');
                $resultados = $casoclinico->where('DS_DIAGNOSTICO', 'LIKE', '%'.$search['DS_DIAGNOSTICO'].'%')->where('CO_CATEGORIA', '=',$search['CO_CATEGORIA'])->get();
                return response()->json($resultados, 200);
                
            } 
            else if(array_key_exists('DS_DIAGNOSTICO', $search))
            {
                //dd('D');
                $resultados = $casoclinico->where('DS_DIAGNOSTICO', 'LIKE', '%'.$search['DS_DIAGNOSTICO'].'%')->get();
                return response()->json($resultados, 200);
            }
            else if(array_key_exists('CO_CATEGORIA', $search)&&array_key_exists('CO_SUBCATEGORIA', $search))
            {
                //dd('C,S');
                $resultados = $casoclinico->where('CO_CATEGORIA', '=',$search['CO_CATEGORIA'])->where('CO_SUBCATEGORIA', '=', $search['CO_SUBCATEGORIA'])->get();
                return response()->json($resultados, 200);
            }
            else if(array_key_exists('CO_CATEGORIA', $search))
            {
                //dd('C');
                $resultados = $casoclinico->where('CO_CATEGORIA', '=',$search['CO_CATEGORIA'])->get();
                return response()->json($resultados, 200);
            }

        }
        else{
            // Resultado recebe todos os casos clinicos que não sao 1 e 6
            $resultados = $casoclinico->whereNotIn('CO_STATUS', [1,4,6])->get();
        }
        //dd($resultados['CO_CATEGORIA']->get());
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
        // $casos_da_semana = CasoClinico::all()->filter(function($caso_clinico) {
        //     if (strtotime($caso_clinico->DT_SEMANA) <= strtotime('this week monday')) {
        //         return $caso_clinico;
        //     }
        // })->sortByDesc('DT_SEMANA');
        // return response()->json($casos_da_semana, 200);

        $casoclinico = CasoClinico::query();

        // pega todos os casos com codigo Status 4: Casos da semana em andamento
        $casoclinico = $casoclinico->where('CO_STATUS', 4)->get();

        return response()->json($casoclinico, 200);


    }

    /**
     * Salva no Caso Clínico a semana referente ao seu agendamento
     *
     * @param $id
     * @param $date
     * @return \Illuminate\Http\JsonResponse
     */
    public function agendar_caso_da_semana($id, $date) // Funcionando
    {
        // atribui em $data na chave date a informacao que vem 
        $data = ['date' => $date];
        //
        $caso_clinico = CasoClinico::find($id);

        $caso_clinico = $caso_clinico->toArray();

        $caso_clinico['DT_SEMANA'] = $date;
        $caso_clinico['CO_STATUS'] = 3;

        CasoClinico::where('CO_SEQ_CASO_CLINICO', $id)->update($caso_clinico);

        return response()->json(['message' => 'Caso Clínico Agendado com Sucesso'], 200);
    }

    /**
     * Remove do Caso Clínico a semana referente ao seu agendamento
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function desagendamento_caso_da_semana($id) // Funcionando
    {
        $caso_clinico = CasoClinico::find($id);
        $caso_clinico = $caso_clinico->toArray();
        $caso_clinico['CO_STATUS'] = 2;
        CasoClinico::where('CO_SEQ_CASO_CLINICO', $id)->update($caso_clinico);

        return response()->json(['message' => 'Caso Clínico Desagendado com Sucesso'], 200);
    }

    
    public function homologar(Request $request, $agendar = null)  // Funcionando Mas precisa adicionar como update
    {

        // campo agendar opcional, se caso a data de agendamento for enviada via URL entao o campo DT_SEMANA é preenchido tbm

        $request->validate([
            //Necessita ser enviado via x-www-form-urlencoded

            // Campos para possivel edição do preceptor Administrador
            'DS_HISTORIA_CLINICA' =>'required|string',
            'DS_ACHADOS_DAS_IMAGENS'=>'required|string',   
            'DS_DIAGNOSTICO'=>'required|string',  
            
            'CO_CATEGORIA'=>'required|int|exists:TB_CATEGORIA_CASO_CLINICO,CO_SEQ_CATEGORIA_CASO_CLINICO',     
            'CO_SUBCATEGORIA'=>'required|int|exists:TB_SUBCATEGORIA_CASO_CLINICO,CO_SEQ_SUBCATEGORIA_CASO_CLINICO',

            'DS_DISCUSSAO'=>'required|string',
            'DS_REFERENCIAS'=>'required|string',
            //'NU_REJEICOES'=>'int',
            //'DS_CORRECOES'=>'string',

            //'CO_USUARIO'=>'required|int|exists:TB_USUARIO,CO_SEQ_USUARIO',
            //'CO_STATUS'=>'required|int|exists:TB_STATUS_CASO_CLINICO,CO_SEQ_STATUS_CASO_CLINICO',
        ]);

        // se o nao vem valor de agendamento entao status: 2 (apenas homologado)
        if(!$agendar){
            $request['CO_STATUS'] = 2;
        }
        // se veio entao status: 3 (reservado)
        else{
            $request['CO_STATUS'] = 3;
            $request['DT_SEMANA'] = $agendar;
        }

        //dd($request['DT_SEMANA']);

        $request = $request->all(); // convertendo de objeto Request para Array
       
        // $caso_clinico = CasoClinico::where('CO_SEQ_CASO_CLINICO', $id)->update(['CO_STATUS' => 2]);

        $caso_clinico = CasoClinico::where('CO_SEQ_CASO_CLINICO', $request['CO_SEQ_CASO_CLINICO'])->update($request);

        return response()->json(['message' => 'Caso Clinico Homologado com Sucesso'], 200);
    }


    public function tornar_caso_publico($id) // Funcionando
    {
        $caso_clinico = CasoClinico::find($id);
        $caso_clinico = $caso_clinico->toArray();
        $caso_clinico['CO_STATUS'] = 5;
        CasoClinico::where('CO_SEQ_CASO_CLINICO', $id)->update($caso_clinico);

        return response()->json(['message' => 'Caso Clínico Disponibilizado com Sucesso'], 200);
    }



    // ################################################## LISTAS DOS TIPOS DE CASOS ##############################
    public function lista_Pendentes() // Funcionando
    {
        $casoclinico = CasoClinico::query();

        // pega todos os casos com codigo Status 1: pendente de homologacao
        $casoclinico = $casoclinico->where('CO_STATUS', 1)->get();

        return response()->json($casoclinico, 200);
    }
    public function lista_Homologados()
    {
        $casoclinico = CasoClinico::query();

        // pega todos os casos com codigo Status 2: homologados
        $casoclinico = $casoclinico->where('CO_STATUS', 2)->get();

        return response()->json($casoclinico, 200);
    }
    public function lista_Agendados()
    {
        $casoclinico = CasoClinico::query();

        // pega todos os casos com codigo Status 3: agendados
        $casoclinico = $casoclinico->where('CO_STATUS', 3)->get();

        return response()->json($casoclinico, 200);
    }

    #################################################################################################


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) // Funcionando
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
                $_caso_clinico->CO_IMAGEM_CAPA = $_filename;
                
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
    public function show($id) // Funcionando
    {
        $casoclinico = CasoClinico::find($id);

        // fazendo a consulta na tabela img
        $imgcaso = Imagem::query();

        // pega as imagens que fazem parte desse caso clinico
        $imgcaso = $imgcaso->where('CO_CASO_CLINICO', '=', $id)->get();

        for($i=0;$i<sizeof($imgcaso);$i++){
            //Array recebe imagem do caso
            $array[$i] = $imgcaso[$i]->IM_IMAGEM;
            
        }

        // em caso clinico é adcionado um campo array no Json
        $casoclinico['images'] = $array;

        return response()->json($casoclinico,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) // Funcionando através do metodo PUT e com o Header Content Type: x-www-form-urlencoded
    {
        $request->validate([
            //Necessita ser enviado via x-www-form-urlencoded

            'DS_HISTORIA_CLINICA' =>'required|string',
            'DS_ACHADOS_DAS_IMAGENS'=>'required|string',   
            'DS_DIAGNOSTICO'=>'required|string',  
            
            // linha de CO_CATEGORIA estava em caixa baixa e nao tinha o TB na frente, alem do id nao ser CO_SEQ
            'CO_CATEGORIA'=>'required|int|exists:TB_CATEGORIA_CASO_CLINICO,CO_SEQ_CATEGORIA_CASO_CLINICO',     

            // Mesmo problema estava aki tbm
            'CO_SUBCATEGORIA'=>'int|exists:TB_SUBCATEGORIA_CASO_CLINICO,CO_SEQ_SUBCATEGORIA_CASO_CLINICO',


            'DS_DISCUSSAO'=>'required|string',
            'DS_REFERENCIAS'=>'required|string',
            'NU_REJEICOES'=>'int',
            'DS_CORRECOES'=>'string',

            // Logica: verifica se CO_USUARIO que veio via Request tem valor existente na tabela do banco TB_USUARIO que tem na coluna CO_SEQ_USUARIO
            'CO_USUARIO'=>'required|int|exists:TB_USUARIO,CO_SEQ_USUARIO',
            'CO_STATUS'=>'required|int|exists:TB_STATUS_CASO_CLINICO,CO_SEQ_STATUS_CASO_CLINICO',
        ]);
        $casoclinico = CasoClinico::find($id);
        $casoclinico -> fill($request->all());
        $casoclinico -> save();
        return response()->json([
            'message'=>'Caso clinico atualizado com sucesso!'
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) // Funcionou
    {
        $casoclinico = CasoClinico::find($id);
        $casoclinico->delete();
        return response()->json([
            'message'=>'Caso clinico deletado com sucesso!'
        ],200);
    }
    
}
