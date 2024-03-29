<?php

namespace App\Http\Controllers\API;

use App\CategoriaCasoClinico;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class CategoriaCasoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    //oi
    public function index()
    {
        $categoriacaso = CategoriaCasoClinico::all();
        return response()->json($categoriacaso,200);
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
           'DS_DESCRICAO'=>'required|string',
        ]);
        CategoriaCasoClinico::create($request->all());
        return response()->json([
           'message'=>'Categoria de caso cadastrada com sucesso!'
        ],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $categoriacaso = CategoriaCasoClinico::find($id);
        return response()->json($categoriacaso,200);
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
           'DS_DESCRICAO'=>'required|string',
        ]);
        $categoriacaso = CategoriaCasoClinico::find($id);
        $categoriacaso->fill($request->all());
        $categoriacaso->save();
        return response()->json([
           'message'=>'Categoria de caso atualizada!'
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
        $categoriacaso = CategoriaCasoClinico::find($id);
        $categoriacaso->delete();
        return response()->json([
            'message'=>'Categoria de caso excluida!'
        ],200);
    }
}
