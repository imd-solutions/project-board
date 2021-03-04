@extends('voyager::master')

@section('page_title', __('voyager::generic.'.(isset($dataTypeContent->id) ? 'edit' : 'add')).' '.$dataType->getTranslatedAttribute('display_name_singular'))

@section('css')
    <meta name="csrf-token" content="{{ csrf_token() }}">
@stop

@section('page_header')
    <h1 class="page-title">
        <i class="{{ $dataType->icon }}"></i>
        {{ __('voyager::generic.'.(isset($dataTypeContent->id) ? 'edit' : 'add')).' '.$dataType->getTranslatedAttribute('display_name_singular') }}
    </h1>
@stop

@section('content')
    <div class="page-content container-fluid">
        <form class="form-edit-add" role="form"
              action="@if(!is_null($dataTypeContent->getKey())){{ route('voyager.'.$dataType->slug.'.update', $dataTypeContent->getKey()) }}@else{{ route('voyager.'.$dataType->slug.'.store') }}@endif"
              method="POST" enctype="multipart/form-data" autocomplete="off">
            <!-- PUT Method if we are editing -->
            @if(isset($dataTypeContent->id))
                {{ method_field("PUT") }}
            @endif
            {{ csrf_field() }}

            <div class="row">
                <div class="col-md-8">
                    <div class="panel panel-bordered">
                        {{-- <div class="panel"> --}}
                        @if (count($errors) > 0)
                            <div class="alert alert-danger">
                                <ul>
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif

                        <div class="panel-body">
                            @if(!empty($dataTypeContent->profile))
                            <div class="form-group">
                                <label for="name">{{ __('voyager::generic.name') }}</label>
                                <input type="text" class="form-control" id="d_name" name="d_name" placeholder="{{ __('voyager::generic.name') }}" disabled="disabled" value="{{ old('name', $dataTypeContent->name ?? '') }}">
                                <input type="hidden" class="form-control" id="name" name="name" placeholder="{{ __('voyager::generic.name') }}"  value="{{ old('name', $dataTypeContent->name ?? '') }}" >
                            </div>
                            @endif
                            <div class="form-group">
                                <label for="email">{{ __('voyager::generic.email') }}</label>
                                <input type="email" class="form-control" id="email" name="email" placeholder="{{ __('voyager::generic.email') }}"
                                       value="{{ old('email', $dataTypeContent->email ?? '') }}">
                            </div>

                            <div class="form-group">
                                <label for="password">{{ __('voyager::generic.password') }}</label>
                                @if(isset($dataTypeContent->password))
                                    <br>
                                    <small>{{ __('voyager::profile.password_hint') }}</small>
                                @endif
                                <input type="password" class="form-control" id="password" name="password" value="" autocomplete="new-password">
                            </div>

                            @can('editRoles', $dataTypeContent)
                                <div class="form-group">
                                    <label for="default_role">{{ __('voyager::profile.role_default') }}</label>
                                    @php
                                        $dataTypeRows = $dataType->{(isset($dataTypeContent->id) ? 'editRows' : 'addRows' )};

                                        $row     = $dataTypeRows->where('field', 'user_belongsto_role_relationship')->first();

                                        $options = $row->details;
                                    @endphp
                                    @include('voyager::formfields.relationship')
                                </div>
                            @endcan
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="panel panel-bordered">
                            <div class="panel-body">
                                <h3>Profile</h3>
                                <div class="form-group">
                                    <label for="name">Firstname</label>
                                    <input type="text" class="form-control" id="firstname" name="firstname" value="{{ old('name', $dataTypeContent->profile->firstname ?? '') }}">
                                </div>
                                <div class="form-group">
                                    <label for="name">Surname</label>
                                    <input type="text" class="form-control" id="lastname" name="lastname"  value="{{ old('name', $dataTypeContent->profile->lastname ?? '') }}">
                                </div>
                                <div class="form-group">
                                    <label for="name">Phone Number</label>
                                    <input type="text" class="form-control" id="phone_number" name="phone_number" @if(!empty($dataTypeContent->profile)) disabled="disabled" @endif value="{{ old('name', $dataTypeContent->profile->phone_number ?? '') }}">
                                </div>
                                <div class="form-group">
                                    <label for="name">Mobile Number</label>
                                    <input type="text" class="form-control" id="mobile_number" name="mobile_number" @if(!empty($dataTypeContent->profile)) disabled="disabled" @endif value="{{ old('name', $dataTypeContent->profile->mobile_number ?? '') }}">
                                </div>
                            </div>
                    </div>
                </div>
            </div>

            <button type="submit" class="btn btn-primary pull-right save">
                {{ __('voyager::generic.save') }}
            </button>
        </form>

        <iframe id="form_target" name="form_target" style="display:none"></iframe>
        <form id="my_form" action="{{ route('voyager.upload') }}" target="form_target" method="post" enctype="multipart/form-data" style="width:0px;height:0;overflow:hidden">
            {{ csrf_field() }}
            <input name="image" id="upload_file" type="file" onchange="$('#my_form').submit();this.value='';">
            <input type="hidden" name="type_slug" id="type_slug" value="{{ $dataType->slug }}">
        </form>
    </div>
@stop

@section('javascript')
    <script>
        $('document').ready(function () {
            $('.toggleswitch').bootstrapToggle();
        });
    </script>
@stop
