<div class="modal-content">
    <div class="modal-header modal-header-bg-style">
        <h5 class="modal-title" style="color: #fff!important">Add New Booing</h5>
        <button type="button" class="close modal-close" data-dismiss="modal" aria-label="Close">
            <i class="fa fa-close"></i>
        </button>
    </div>
    <form method="post" action="{{route('booking.add.new')}}">
        <div class="modal-body">
            <div class="form-group col-md-12">
                <label for="date" class="required">Date</label>
                <input type="text" class="form-control date" name="date" placeholder="Please Select Date">
            </div>
            <div class="form-group col-md-12">
                <label for="date" class="required">Time</label>
                <div class="row">
                    @foreach ($times as $time)
                        <div class="col-md-3">
                            <label class="btn btn-outline-primary btn-block">
                                <input type="radio" name="time" value="{{ $time->time }}">
                                <span>{{ $time->time }}</span>
                            </label>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
        <div class="modal-footer md-button">
            <button class="btn " data-dismiss="modal"><i class="flaticon-cancel-12"></i> Discard</button>
            <button type="button" class="btn btn-primary modal-submit" >Save</button>
        </div>
    </form>
</div>

<script type="text/javascript">
    jQuery(document).ready(function () {
        jQuery('.date').flatpickr({
            dateFormat: "m/d/Y"
        });
    }); 
</script>


