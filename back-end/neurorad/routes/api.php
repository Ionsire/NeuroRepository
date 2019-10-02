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
    'categoriacasoclinico' => 'API\CategoriaCasoController',
    'subcategoriacasoclinico' => 'API\SubCategoriaCasoController',
    'casoclinico' => 'API\CasoClinicoController',
    'usuario' => 'API\UserController',
]);
Route::get('/agendamento/{id}/{date}', 'API\CasoClinicoController@agendar_caso_da_semana')->name('agendamentocasodasemana');
Route::get('/desagendamento/{id}', 'API\CasoClinicoController@desagendamento_caso_da_semana')->name('desagendamentocasodasemana');

Route::get('/casos_clinicos_admin', 'API\CasoClinicoController@index_admin')->name('casoclinico.index_admin');
Route::get('/casos_da_semana_home', 'API\CasoClinicoController@casos_da_semana_home')->name('homepage');

Route::get('/list_homologar', 'API\CasoClinicoController@lista_Pendentes')->name('listhomologar');
Route::get('/lista_homologados', 'API\CasoClinicoController@lista_Homologados')->name('listahomologados');
Route::get('/lista_agendados', 'API\CasoClinicoController@lista_Agendados')->name('listaagendados');

Route::post('/homologar/{agendar?}', 'API\CasoClinicoController@homologar')->name('homologar');
Route::get('/disponibilizar/{id}', 'API\CasoClinicoController@tornar_caso_publico')->name('disponibilizar');

Route::post('/acesso_especial', 'API\UsersController@acessoEspecial')->name('acessoEspecial');
Route::get('/pendencias_usuarios', 'API\UsersController@pendencias_usuario')->name('pendenciasusuario');