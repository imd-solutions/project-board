<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'description'
    ];

    /**
     * Function Case:
     *
     * @param
     * @return string
     */
    public function path()
    {
        return "/projects/{$this->id}";
    }
}
