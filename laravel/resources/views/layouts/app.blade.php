<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ 'Doctor Appointment System' }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('laravel/public/css/app.css') }}" rel="stylesheet">

    <!-- Fonts -->

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">
    <link href="{{asset('assets/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/compact_theme/css/plugins.css')}}" rel="stylesheet" type="text/css" />

    <!-- <link rel="stylesheet" type="text/css" href="{{asset('/assets/plugins/fontawesome/css/font-awesome.min.css')}}"/> -->

    <link rel="stylesheet" href="{{asset('/assets/plugins/fontawesome/css/font-awesome.min.css')}}">

    <link rel="stylesheet" href="{{asset('/assets/plugins/font-icons/feather-icon.css')}}">

    <link href="{{asset('/assets/plugins/flatpickr/flatpickr.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('/assets/plugins/flatpickr/custom-flatpickr.css')}}" rel="stylesheet" type="text/css">


    <link href="{{ asset('assets/plugins/sweetalerts/sweetalert2.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/plugins/sweetalerts/sweetalert.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/components/custom-sweetalert.css') }}" rel="stylesheet" type="text/css" />

    <link rel="stylesheet" type="text/css" href="{{asset('/assets/plugins/jquery-ui/jquery-ui.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('/assets/plugins/select2/select2.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('/assets/plugins/bootstrap-multiselect/bootstrap-multiselect.min.css')}}">

    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/forms/theme-checkbox-radio.css') }}" />
    <link href="{{asset('/assets/plugins/animate/animate.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('/assets/compact_theme/css/components/custom-modal.css')}}" rel="stylesheet" type="text/css" />

    @stack('styles')

    <link href="{{ asset('assets/css/custom.css') }}" rel="stylesheet" type="text/css" />
</head>

<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ 'Doctor Appointment System' }}
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @if (auth()->check() && auth()->user()->role->name === 'patient')
                            <li class="nav-item">
                                <a class="nav-link {{ Request::segment(1) == 'my-booking' ? 'active':'' }} " href="{{ route('my.booking') }}">{{ __('My Appointments') }}</a>
                            </li>
                        @endif

                        @if (auth()->check() && auth()->user()->role->name === 'doctor')
                            <li class="nav-item">
                                <a class="nav-link {{ Request::segment(1) == 'appointment' ? 'active':'' }}" href="{{ route('appointment.index') }}">{{ __('Appointments') }}</a>
                            </li>
                        @endif

                        @guest
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                            @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                </li>
                            @endif
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    <i class="fa fa-user pr-1" aria-hidden="true"></i>{{ Auth::user()->name }}
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                
                                    <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault();
                                                                    document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>

        @include('partials.modals')
    </div>

    <footer>
        <script src="{{ asset('assets/js/libs/jquery-3.1.1.min.js') }}"></script>
        <script src="{{ asset('assets/bootstrap/js/popper.min.js') }}"></script>
        <script src="{{ asset('assets/bootstrap/js/bootstrap.min.js') }}"></script>
            
        <script src="{{ asset('assets/plugins/sweetalerts/promise-polyfill.js') }}"></script>
        <script src="{{ asset('assets/plugins/sweetalerts/sweetalert2.min.js') }}"></script>
        <script src="{{ asset('assets/plugins/sweetalerts/custom-sweetalert.js') }}"></script>

        <script src="{{asset('/assets/plugins/jquery-ui/jquery-ui.min.js')}}"></script>
        <script src="{{asset('/assets/plugins/jquery-form/jquery.form.js')}}"></script>
        <script src="{{ asset('assets/plugins/notification/snackbar/snackbar.min.js') }}"></script>

        <script src="{{ asset('assets/plugins/select2/select2.min.js') }}"></script>
        <script src="{{ asset('assets/plugins/bootstrap-multiselect/bootstrap-multiselect.js') }}"></script>
        <script src="{{ asset('assets/plugins/select2/custom-select2.js') }}"></script>

        <script src="{{ asset('assets/plugins/flatpickr/flatpickr.js') }}"></script>
        
        
        <script src="{{ asset('assets/compact_theme/js/custom.js') }}"></script>

        <script src="{{ asset('assets/js/customscripts.js') }}?asset_version=1.0"></script>
        @stack('scripts')
    </footer>
</body>

</html>
