<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Booking;
use App\Models\Time;
use Carbon\Carbon;
use App\Mail\AppointmentMail;
use Config;

class FrontEndController extends Controller
{
    public function index(Request $request)
    {
        if (auth()->check() && auth()->user()->role->name == 'doctor') {
            return redirect('/appointment');
        } if (auth()->check() && auth()->user()->role->name == 'patient') {
            return redirect('/my-booking');
        } else {
            return view('welcome');
        }
    }

    public function create(Request $request)
    {
        if($request->isMethod('POST')) {

            $post  = $request->all();
            $date = Carbon::parse($post['date'])->format('Y-m-d');

            $rules = [
                'date'  => 'required',
                'time'  => 'required|unique:bookings,time,NULL,id,date,'.$date.',patient_id,'.auth()->user()->id
            ];

            $msgs = [
                '*.required' => 'The field is required.',
                'time.unique' => 'You already made an appointment. Please check your email for the appointment!'
            ];

            $this->validate($request,$rules,$msgs);

            $input = [
                'patient_id'    => auth()->user()->id,
                'date'          => $date,
                'time'          => $post['time']
            ];

            $booking = Booking::create($input);
            
            if($booking) {
                // Send email notification
                $doctor = User::where('role_id', 1)->first();

                $mailData = [
                    'name'          => auth()->user()->name,
                    'time'          => $post['time'],
                    'date'          => $date,
                    'doctorName'    => ucwords($doctor->name)
                ];
                try {
                    \Mail::to(auth()->user()->email)->send(new AppointmentMail($mailData));
                } catch (\Exception $e) {
                    $data = ['status' => 2, 'msg' => 'Email sending failed.!'];
                }

                $data = ['status' => 1, 'msg' => 'Your appointment was booked for ' . $date . ' at ' . $post['time'], 'trigger_click' => 'report-submit'];
            } else {
                $data = ['status' => 2, 'msg' => 'Something Wrong..'];
            }

            return $data;
        } else {
            $data['times'] = Time::where('status', 0)->get();
            return view('booking.create',$data);
        }
    }

    public function myBookings(Request $request)
    {
        if($request->isMethod('POST')) {
            $post  = $request->all();

            $table = '';
            $sr    = 0;

            $query = Booking::latest();
            $query->where('patient_id', auth()->user()->id);

            if (isset($post['date']) && !empty($post['date'])) {
                $query->where('date',Carbon::parse($post['date'])->format('Y-m-d'));
            }
            if (isset($post['status']) && !empty($post['status'])) {
                $query->where('status', $post['status']);
            }

            $appointments = $query->get()->toArray();

            if(count($appointments) > 0 ) {
                foreach ($appointments as $k => $appointment) {
                    $table .= '<tr>';
                        $table .= '<td>'.++$sr.'</td>';
                        $table .= '<td>'.$appointment['date'].'</td>';
                        $table .= '<td>'.$appointment['time'].'</td>';
                        $table .= '<td><a class="btn btn-sm btn-'.@Config::get('constants.status')[$appointment['status']]['class_name'].'">'. @Config::get('constants.status')[$appointment['status']]['title'] .'</a></td>';
                        $table .= '<td> ';
                        $actions = [];
                            $actions[] = [
                                'url'   => route('booking.update_status',$appointment['id']),
                                'title' => 'Update Status',
                                'modal' => 'empty_modal'
                            ];
                        
                            $table .= view('partials.btn-group',['actions'=>$actions])->render();
                        $table .= '</td>';
                    $table .= '</tr>';
                }
            }

            echo json_encode(array('table' => $table, 'records' => $sr));
            die();

        } else {
            return view('booking.index');
        }
    }

    // Check specific update status for appointment time
    public function update_status($id,Request $request)
    {
        $booking = Booking::where('id',$id)->first();

        if($request->isMethod('POST')) {
            $post  = $request->all();
            $rules = [
                'status'  => 'required',
            ];

            $msgs = [
                '*.required' => 'The field is required.'
            ];

            $this->validate($request,$rules,$msgs);

            $input = [
                'status'                => $post['status'],
                'updated_description'   => $post['description']
            ];
            
            if($booking->fill($input)->save()) {
                $data = ['status' => 1, 'msg' => 'Status Updated Successfully !!', 'trigger_click' => 'report-submit'];
            } else {
                $data = ['status' => 2, 'msg' => 'Something Wrong..'];
            }
            return $data;
        } else {
            $data['booking'] = $booking;
            return view('booking.update_status',$data);
        }
    }
}
