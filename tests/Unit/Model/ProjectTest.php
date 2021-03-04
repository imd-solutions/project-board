<?php

namespace Tests\Unit\Model;

use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test Case: The model should have a path that we can call.
     * @test
     * @group
     * @return void
     */
    public function hasOwnPath()
    {
        // Arrange
        $project = factory(Project::class)->create();

        // Action
        $path = $project->path();

        // Assert
        $this->assertEquals('/projects/' . $project->id, $path);

    }
}
