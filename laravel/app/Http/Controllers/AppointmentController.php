<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Booking;
use Config;

class AppointmentController extends Controller
{
    public function index(Request $request)
    {
        $patient_ids = [];

        $appointment = Booking::with('patients')->get()->toArray();

        $patient_ids = array_unique(array_column($appointment,'patient_id'));

        if($request->isMethod('POST')) {
            $post  = $request->all();

            $table = '';
            $sr    = 0;

            $query = Booking::with('patients');

            if (isset($post['patient']) && !empty($post['patient'])) {
                $query->where('patient_id', $post['patient']);
            }

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
                        
                        $table .= '<td>'.$appointment['patients']['name'].'</td>';
                        $table .= '<td>'.$appointment['date'].'</td>';
                        $table .= '<td>'.$appointment['time'].'</td>';

                        $table .= '<td><a class="btn btn-sm btn-'.@Config::get('constants.status')[$appointment['status']]['class_name'].'">'. @Config::get('constants.status')[$appointment['status']]['title'] .'</a></td>';
                        $table .= '<td> ';
                        $actions = [];
                            $actions[] = [
                                'url'   => route('appointment.action',$appointment['id']),
                                'title' => 'Action',
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
            $data = [];
            if (count($patient_ids)>0) {
                $data['patients'] = User::whereIn('id',$patient_ids)->get()->toArray();
            }
            return view('appointment.index',$data);
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
                'status'     			=> $post['status'],
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
        	return view('appointment.update_status',$data);
    	}
    }
}
