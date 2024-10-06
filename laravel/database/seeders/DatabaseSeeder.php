<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Role;
use App\Models\Time;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);

        Role::create(['name' => 'doctor']);
        Role::create(['name' => 'patient']);

        $admin = new User([
            "name" => 'Doctor',
            "email" => 'doctor@gmail.com',
            "email_verified_at" => now(),
            'password' => Hash::make('password'),
            'role_id' => 1,
            'gender' => 'male',
            'remember_token' => Str::random('10'),
        ]);

        $admin->save();

        $patient = new User([
            "name" => 'Patient',
            "email" => 'patient@gmail.com',
            "email_verified_at" => now(),
            'password' => Hash::make('password'),
            'role_id' => 2,
            'gender' => 'male',
            'remember_token' => Str::random('10'),
        ]);

        $patient->save();

        //times data
        Time::create(['time' => '10am']);
        Time::create(['time' => '10.20am']);
        Time::create(['time' => '10.40am']);
        Time::create(['time' => '11am']);
        Time::create(['time' => '11.20am']);
        Time::create(['time' => '11.40am']);
        Time::create(['time' => '12pm']);
        Time::create(['time' => '12.20pm']);
        Time::create(['time' => '12.40pm']);
        Time::create(['time' => '1pm']);
        Time::create(['time' => '1.20pm']);
        Time::create(['time' => '1.40pm']);
        Time::create(['time' => '2pm']);
        Time::create(['time' => '2.20pm']);
        Time::create(['time' => '2.40pm']);
        Time::create(['time' => '3pm']);
        Time::create(['time' => '3.20pm']);
        Time::create(['time' => '3.40pm']);
        Time::create(['time' => '4pm']);
        Time::create(['time' => '4.20pm']);
        Time::create(['time' => '4.40pm']);
        Time::create(['time' => '5pm']);
        Time::create(['time' => '5.20pm']);
        Time::create(['time' => '5.40pm']);
        Time::create(['time' => '6pm']);
        Time::create(['time' => '6.20pm']);
        Time::create(['time' => '6.40pm']);
        Time::create(['time' => '7pm']);
        Time::create(['time' => '7.20pm']);
        Time::create(['time' => '7.40pm']);
        Time::create(['time' => '8pm']);
        Time::create(['time' => '8.20pm']);
        Time::create(['time' => '8.40pm']);
        Time::create(['time' => '9pm']);
        Time::create(['time' => '9.20pm']);
        Time::create(['time' => '9.40pm']);
        Time::create(['time' => '10pm']);
        Time::create(['time' => '10.20pm']);
        Time::create(['time' => '10.40pm']);
        Time::create(['time' => '11pm']);
        Time::create(['time' => '11.20pm']);
        Time::create(['time' => '11.40pm']);
        Time::create(['time' => '12pm']);
    }
}
