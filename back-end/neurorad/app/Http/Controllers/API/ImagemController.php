<?php

namespace App\Http\Controllers\API;

use App\Imagem;
use Illuminate\Http\Request;

class ImagemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $imagem= Imagem::all();
        return response()->json($imagem, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
       //
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
            'IM_IMAGEM' =>'required|string',
            'CO_CASO_CLINICO'=>'required|int|exists:caso_clinico,id',
        ]);

        Imagem::create($request->all());

        return response()->json([
            'message' => 'Imagem cadastrada com sucesso!'
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
        $imagem = Imagem::find($id);
        return response()->json($imagem,200 );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
            'IM_IMAGEM' =>'required|string',
            'CO_CASO_CLINICO'=>'required|int|exists:caso_clinico,id',
        ]);

        $imagem = Imagem::find($id);
        $imagem->fill($request->all());
        $imagem->save();
        return response()->json([
            'message'=>'Imagem atualizada com sucesso!'
        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $imagem = Imagem::find($id);
        $imagem->delete();
        return response()->json([
            'message'=>'Imagem deletada com sucesso!'
        ],200);
    }
}
