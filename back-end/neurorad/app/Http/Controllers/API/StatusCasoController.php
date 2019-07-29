<?php

namespace App\Http\Controllers\API;

use App\StatusCasoClinico;
use Illuminate\Http\Request;

class StatusCasoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $statuscaso = StatusCasoClinico::all();
        return response()->json($statuscaso,200);
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
        StatusCasoClinico::create($request->all());

        return response()->json([
           'message'=>'Status do caso criado com sucesso!'
        ],200);


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $statuscaso = StatusCasoClinico::find($id);
        return response()->json($statuscaso,200);
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
        $statuscaso = StatusCasoClinico::find($id);
        $statuscaso->fill($request->all());
        $statuscaso->save();
        return response()->json([
           'message'=>'Status do caso atualizado com sucesso!'
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
        $statuscaso = StatusCasoClinico::find($id);
        $statuscaso->delete();
        return response()->json([
            'message'=>'Status do caso deletado com sucesso!'
        ],200);
    }
}
