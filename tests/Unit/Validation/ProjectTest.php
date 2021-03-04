<?php

namespace Tests\Unit\Validation;

use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProjectTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    /**
     * Test Case: Validate that the project has a title.
     * @test
     * @group validation
     * @return void
     */
    public function shouldHaveTitle()
    {
        // Arrange
        $attributes = factory(Project::class)->raw([
            'title' => '',
        ]);

        // Action
        $response = $this->post('/projects', $attributes);

        // Assert
        $response->assertSessionHasErrors('title');
    }

    /**
     * Test Case: Validate that the project has a description.
     * @test
     * @group validation
     * @return void
     */
    public function shouldHaveDescription()
    {
        // Arrange
        $attributes = factory(Project::class)->raw([
            'description' => ''
        ]);

        // Action
        $response = $this->post('/projects', $attributes);

        // Assert
        $response->assertSessionHasErrors('description');
    }
}
