<?php

namespace App\Http\Controllers\API;

use App\SubCategoriaCasoClinico;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class SubCategoriaCasoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subcategoriacaso = SubCategoriaCasoClinico::all();
        return response()->json($subcategoriacaso,200);
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
           'subcategoriacaso'=>'required|string',
        ]);
        SubCategoriaCasoClinico::create($request->all());

        return response()->json([
           'message'=>'Sub categoria de caso clínico cadastrado com sucesso!'
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
        $subcategoriacaso = SubCategoriaCasoClinico::find($id);
        return response()->json($subcategoriacaso,200);
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
        $subcategoriacaso = SubCategoriaCasoClinico::find($id);
        $subcategoriacaso->fill($request->all());
        $subcategoriacaso->save();
        return response()->json([
            'message'=>'Subcategoria de caso clinico atualizada com sucesso!'
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
        $subcategoriacaso = SubCategoriaCasoClinico::find($id);
        $subcategoriacaso->delete();
        return response()->json([
            'message'=>'Sub categoria de caso clinico deletada com sucesso!'
        ],200);
    }
}
