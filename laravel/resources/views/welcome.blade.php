@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row mb-4 justify-content-center">
            <div class="col-md-8">
                @guest
                    <h1>Book your appointment today!</h1>
                    <h4>Use these crediential to test the app:</h4>
                    <p>Admin--email: doctor@gmail.com, password: password</p>
                    <p>Patient--email: patient@gmail.com, password: password</p>
                    <div class="mt-5">
                        <a href="{{ url('/register') }}"> <button class="btn btn-primary">Register as Patient</button></a>
                        <a href="{{ url('/login') }}"><button class="btn btn-success">Login</button></a>
                    </div>
                @endguest
            </div>
        </div>
    </div>
@endsection
