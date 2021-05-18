<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    protected $table = 'ratings';
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function ouvrage()
    {
        return $this->belongsTo('App\Ouvrage');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
