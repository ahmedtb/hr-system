<?php

namespace Tests\Feature\DB;

use Tests\TestCase;
use App\Models\Document;
use App\Models\TrainingCourse;
use Illuminate\Http\Testing\File;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DocumentsTest extends TestCase
{
    use RefreshDatabase;

    public function test_documents_can_be_image_pdf_word_excel_or_any_file()
    {
        $pdf = File::create('document1,pdf', 4000);
        $word = File::create('document2.docx', 1500);
        $image = File::image('document3.png', 100,100);

        $course = TrainingCourse::factory()->create();
        
        Document::create([
            'name' => $image->name,
            'content' => base64_encode(file_get_contents($image->path())),
            'documentable_id' => $course->id,
            'documentable_type' => TrainingCourse::class,
            'type' => 'png'
        ]);
                
        Document::create([
            'name' => $word->name,
            'content' => base64_encode(file_get_contents($word->path())),
            'documentable_id' => $course->id,
            'documentable_type' => TrainingCourse::class,
            'type' => 'docx'
        ]);        
        Document::create([
            'name' => $pdf->name,
            'content' => base64_encode(file_get_contents($pdf->path())),
            'documentable_id' => $course->id,
            'documentable_type' => TrainingCourse::class,
            'type' => 'pdf'
        ]);
    }
}
