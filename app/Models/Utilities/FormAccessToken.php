<?php

namespace App\Models\Utilities;

use App\Models\FormStructure;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Prophecy\Call\Call;

class FormAccessToken extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function structure(){
        return $this->belongsTo(FormStructure::class,'form_structure_id','id');
    }

    public function isExpired(){
        return Carbon::today()->gte($this->expiration_date);
    }

    public function hasCopies()
    {
        return $this->copies > 0;
    }
    
    public function stillValid()
    {
        return !$this->isExpired() &&  $this->hasCopies();
    }

    public function deleteCopy(){
        // $this->copies = $this->copies - 1;
        $this->update(['copies' => $this->copies - 1 ]);
        if(!$this->stillValid()){
            $this->delete();
        }
    }
}
