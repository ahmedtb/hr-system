<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use App\Models\Admin;
use App\Models\Document;
use App\Models\TrainingCourse;
use Illuminate\Http\Testing\File;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DocumentsTests extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(Admin::factory()->create(),'admin');
    }
    
    public function test_documents_png_image_can_be_uploaded_and_attacked_to_documentable_model(){

        $image = File::image('document3.png', 100,100);

        $course = TrainingCourse::factory()->create();
        
        Document::create([
            'name' => $image->name,
            'content' => base64_encode(file_get_contents($image->path())),
            'documentable_id' => $course->id,
            'documentable_type' => TrainingCourse::class,
            'type' => 'png'
        ]);
               
    }  

    public function test_documents_docx_can_be_uploaded_and_attacked_to_documentable_model(){
        $word = File::create('document2.docx', 500);

        ($word->mimeType('docx'));
        // dd($word->getMimeType());
        $course = TrainingCourse::factory()->create();

        $response = $this->postJson('/api/document/create',[
            'name' => $word->name,
            'content' => $word,
            'documentable_id' => $course->id,
            'documentable_type' => TrainingCourse::class,
            'type' => 'docx'
        ]);
            
        dd($response->json());
        // Document::create([
        //     'name' => $word->name,
        //     'content' => base64_encode(file_get_contents($word->path())),
        //     'documentable_id' => $course->id,
        //     'documentable_type' => TrainingCourse::class,
        //     'type' => 'docx'
        // ]);  
    }
}
