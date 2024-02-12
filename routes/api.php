<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('tasks',[TaskController::class,'index']);
Route::post('tasks/create',[TaskController::class,'store']);
Route::put('tasks/{task}',[TaskController::class,'update']);
Route::get('tasks/{task}',[TaskController::class,'show']);
Route::delete('tasks/{task}',[TaskController::class,'destroy']);
Route::get('category/{category}/task',[TaskController::class,'getTaskByCategory']);
Route::get('search/{term}/task',[TaskController::class,'getTasksByTerm']);
Route::get('order/{column}/{direction}/task',[TaskController::class,'getTasksOrderBy']);
Route::get('category',[CategoryController::class,'allcategory']);
Route::get('category/{task}',[CategoryController::class,'categoryById']);

Route::get('categories',[CategoryController::class,'index']);
