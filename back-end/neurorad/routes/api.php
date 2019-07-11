<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
//    Route::get('/', 'API\AuthController@index');
    Route::post('login', 'API\AuthController@login');
    Route::post('signup', 'API\AuthController@signup')->name('singup');

    Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'API\AuthController@logout');
        Route::get('user', 'API\AuthController@user');
    });
});
Route::apiResources([
    'perfilusuario' => 'API\PerfilUsuarioController',
    'especialidadeusuario' => 'API\EspecialidadeUsuarioController',
    'papelusuario' => 'API\PapelUsuarioController',
    'statususuario' => 'API\StatusUsuarioController',
    'casoclinico' => 'API\CasoClinicoController',
    'casodasemana' => 'API\CasoDaSemanaController',
    'agendamentocasodasemana' => 'API\AgendamentoCasoDaSemanaController',
]);
Route::get('/agendamentocasodasemana/create', 'API\AgendamentoCasoDaSemanaController@create')->name('agendamentocasodasemana.create');
Route::get('/list_casos_clinicos', 'API\CasoClinicoController@index_common_user')->name('casoclinico.list');
Route::get('/proximas_semanas', 'API\CasoDaSemanaController@proximas_semanas')->name('casodasemana.semanas');

Route::get('/proximas_semanas', 'API\CasoDaSemanaController@proximas_semanas');
