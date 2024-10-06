@extends('layouts.app')

@section('title') My Appointments  @endsection
@section('content')       
    <div class="container mt-2">
        <div class="row layout-top-spacing layout-spacing">
          
            <div class="col-lg-12">
                <div class="statbox widget box box-shadow">
                    <div class="widget-content widget-content-area">
                         <form method="post" action="{{route('my.booking')}}">
                            <div class="form-row mb-12">
                                <div class="form-group col-md-2">
                                    <label for="data">Date</label>
                                    <input type="text" name="date" id="report-filter-to-date" class="form-control" placeholder="Date" readonly="true">
                                </div>

                                <div class="form-group col-md-2">
                                    <label for="status">Status</label>
                                    <select class="form-control select2" name="status" id="status">
                                        <option value="">All</option>
                                        <option value="cancel">Cancel</option>
                                        <option value="postpone">Postpone</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-8" style="text-align: right;">
                                    <button type="button" class="report-submit mt-4 btn btn-danger"> Get Data</button>
                                    <a href="{{route('booking.add.new')}}" class=" mt-4 btn btn-primary"  data-toggle="modal" data-target="#empty_lg_modal"> Add New Booking</a>
                                </div>
                            </div>
                        </form>
                        <table id="report-table-details"  class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="checkbox-column dt-no-sorting"> # </th>
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
