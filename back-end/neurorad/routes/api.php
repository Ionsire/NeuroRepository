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
    Route::post('signup', 'API\AuthController@signup')->name('signup');

    Route::group([
        'middleware' => ['jwt.auth']
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
Route::get('/agendamento', 'API\CasoClinicoController@agendar_caso_da_semana')->name('agendamentocasodasemana');
Route::get('/agendamento', 'API\CasoClinicoController@desagendamento_caso_da_semana')->name('desagendamentocasodasemana');
Route::get('/casos_clinicos_admin', 'API\CasoClinicoController@index_admin')->name('casoclinico.index_admin');
Route::get('/casos_da_semana_home', 'API\CasoClinicoController@casos_da_semana_home')->name('homepage');
