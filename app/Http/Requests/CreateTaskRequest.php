<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'title'=>'required|max:255',
            'body'=>'required|max:5000',
            'category_id'=>'required'
        ];
    }
    public function messages()
    {
     return [
        'category_id.required'=>'Category field is required',
        'title.required'=>'the title is required ',
        'body.required'=>'the description is required'
     ];
    }
}
