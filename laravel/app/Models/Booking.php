<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Booking extends Model
{
    use HasFactory;

    protected $guarded = [];
    
    public function patients()
    {
        return $this->belongsTo(User::class,'patient_id','id');
    }
}
