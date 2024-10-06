<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title">Update Status</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        </button>
    </div>
    <form method="post" action="{{route('appointment.action',$booking->id)}}">
        <div class="modal-body">
            <div class="form-group col-md-12">
                <label for="date" class="required">Status</label>
                <select class="select2 form-control" id="status" name="status">
                    <option value="">Select Status</option>
                    <option value="cancel">Cancel</option>
                    <option value="reject">Rejected</option>
                    <option value="postpone">Postpone</option>
                    <option value="approve">Approve</option>
                    <option value="pending">Pending</option>
                </select>
            </div>
            <div class="form-group col-md-12">
                <label for="date" class="">Comment</label>
                <textarea id="description" name="description" class="form-control" placeholder="Enter Comment"></textarea>
            </div>
        </div>
        <div class="modal-footer md-button">
            <button class="btn " data-dismiss="modal"><i class="flaticon-cancel-12"></i> Discard</button>
            <button type="button" class="btn btn-primary modal-submit" >Save</button>
        </div>
    </form>
</div>

