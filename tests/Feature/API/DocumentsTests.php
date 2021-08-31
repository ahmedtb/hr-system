<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use App\Models\Admin;
use App\Models\Document;
use App\Models\TrainingCourse;
use Illuminate\Http\Testing\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DocumentsTests extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(Admin::factory()->create(), 'admin');
    }

    public function test_documents_png_image_can_be_uploaded_and_attacked_to_documentable_model()
    {

        $image = File::image('document3.png', 100, 100);
        // for testing only...since in testing we use mimeTypes validation
        ($image->mimeType('docx'));
        $course = TrainingCourse::factory()->create();

        $response = $this->postJson('/api/document/create', [
            'name' => $image->name,
            'content' => $image,
            'documentable_id' => $course->id,
            'documentable_type' => TrainingCourse::class,
            'type' => 'png'
        ]);
        // dd($response->json());

        $response = $this->getJson('/api/document/index', [
            'documentable_id' => $course->id,
            'documentable_type' =>  TrainingCourse::class
        ]);


        $this->assertEquals($response->json()['data'][0]['name'], 'document3.png');
    }

    public function test_documents_docx_can_be_uploaded_and_attacked_to_documentable_model()
    {
        $word = File::create('document2.docx', 500);

        // use mimetypes instead of mimes validation in testing
        ($word->mimeType('docx'));
        $course = TrainingCourse::factory()->create();

        $response = $this->postJson('/api/document/create', [
            'name' => $word->name,
            'content' => $word,
            'documentable_id' => $course->id,
            'documentable_type' => TrainingCourse::class,
            'type' => 'docx'
        ]);

        // dd($response->json());

        $response = $this->getJson('/api/document/index', [
            'documentable_id' => $course->id,
            'documentable_type' =>  TrainingCourse::class
        ]);


        $this->assertEquals($response->json()['data'][0]['name'], 'document2.docx');
    }

    public function test_documents_pdf_can_be_uploaded_and_attacked_to_documentable_model()
    {
        $pdf = File::create('document2.pdf', 500);

        // use mimetypes instead of mimes validation in testing
        ($pdf->mimeType('pdf'));
        $course = TrainingCourse::factory()->create();

        $response = $this->postJson('/api/document/create', [
            'name' => $pdf->name,
            'content' => $pdf,
            'documentable_id' => $course->id,
            'documentable_type' => TrainingCourse::class,
            'type' => 'pdf'
        ]);
        // dd($response->json());

        $response = $this->getJson('/api/document/index', [
            'documentable_id' => $course->id,
            'documentable_type' =>  TrainingCourse::class
        ]);

        $this->assertEquals($response->json()['data'][0]['name'], 'document2.pdf');
    }
}
