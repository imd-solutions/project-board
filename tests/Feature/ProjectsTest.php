<?php

namespace Tests\Feature;

use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProjectsTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    /**
     * Test Case: Can create a project.
     * @test
     * @group
     * @return void
     */
    public function canCreateProject()
    {
        $this->withoutExceptionHandling();

        // Arrange
        $attributes = [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph
        ];

        // Action
        $this->post('/projects', $attributes);

        // Assert
        $this->assertDatabaseHas('projects', $attributes);
        $this->get('/projects')->assertSee($attributes['title']);
    }

    /**
     * Test Case: User can view a project.
     * @test
     * @group
     * @return void
     */
    public function userCanViewProject()
    {
        $this->withoutExceptionHandling();

        // Arrange
        $project = factory(Project::class)->create();

        // Action
        $response = $this->get($project->path());

        // Assert
        $response->assertSee($project->title)->assertSee($project->description);
    }
}
