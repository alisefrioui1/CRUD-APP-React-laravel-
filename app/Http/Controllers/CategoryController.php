<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Task;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //
    public function index()
    {
        return Category::has('tasks')->get();
    }

    public function allcategory()
    {
        return Category::all();
    }
    public function categoryById(Task $task)
    {
        return Category::where('id',$task);
    }

}
