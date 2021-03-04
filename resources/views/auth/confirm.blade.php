@extends('layouts.app')

@section('content')
    <div class="flex-center position-ref full-height row">

        <div class="content {{ $data["css"] }} col-10">
            <h2>{{ $data["info"] }}</h2>
            <div class="title">
                {{ $data["message"] }}
            </div>
        </div>
    </div>
@endsection
