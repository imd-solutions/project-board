<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectRequest;
use Illuminate\Http\RedirectResponse;
use App\Models\Project;
use Illuminate\View\View;

class ProjectsController extends Controller
{
    /**
     * Function Case: Show all the projects.
     *
     * @return View
     */
    public function index()
    {
        $projects = Project::all();

        return view('projects.index', compact('projects'));
    }

    /**
     * Function Case: Add the new project.
     *
     * @param ProjectRequest $request
     * @return RedirectResponse redirect
     */
    public function store(ProjectRequest $request)
    {
        // Insert the data.
        Project::create($request->all());

        // Return to the projects index page.
        return redirect()->route('projects.index');
    }

    /**
     * Function Case: Show the selected project.
     *
     * @param Project $project
     * @return View
     */
    public function show(Project $project)
    {
        // View the project page.
        return view('projects.show', compact('project'));
    }
}
