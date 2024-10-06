@extends('layouts.app')

@section('title') Appointments  @endsection
@section('content')       
    <div class="container mt-2">
        <div class="row layout-top-spacing layout-spacing">
          
            <div class="col-lg-12">
                <div class="statbox widget box box-shadow">
                    <div class="widget-content widget-content-area">
                         <form method="post" action="{{route('appointment.index')}}">
                            <div class="form-row mb-12">
                                <div class="form-group col-md-2">
                                    <label for="status">Patients</label>
                                    <select class="form-control select2" name="patient" id="patient">
                                        <option value="">Select Patient</option>
                                        @if(isset($patients) && count($patients)>0)
                                            @foreach ($patients as $patient)
                                                <option value="{{$patient['id']}}">{{$patient['name']}}</option>
                                            @endforeach
                                        @endif
                                    </select>
                                </div>

                                <div class="form-group col-md-2">
                                    <label for="data">Date</label>
                                    <input type="text" name="date" id="report-filter-to-date" class="form-control" placeholder="Date" readonly="true">
                                </div>

                                <div class="form-group col-md-2">
                                    <label for="status">Status</label>
                                    <select class="form-control select2" name="status" id="status">
                                        <option value="">All</option>
                                        <option value="pending">Pending</option>
                                        <option value="cancel">Cancel</option>
                                        <option value="reject">Reject</option>
                                        <option value="postpone">Postpone</option>
                                        <option value="approve">Approve</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-6" style="text-align: right;">
                                    <button type="button" class="report-submit mt-4 btn btn-danger" style="display: none1"> Get Data</button>
                                </div>
                            </div>
                           
                        </form>
                        <table id="report-table-details"  class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="checkbox-column dt-no-sorting"> # </th>
                                    <th>Patient Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                    <th class="text-right dt-no-sorting" >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
<!-- endsection  --> 
@push('scripts')
    
<script type="text/javascript">
    jQuery(document).ready(function () {
        jQuery(".report-submit").trigger( "click" );
    }); 
</script>
   
@endpush
