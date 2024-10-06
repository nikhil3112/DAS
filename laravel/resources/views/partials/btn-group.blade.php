<div class="btn-group " style="float: right !important;text-align: right;">
	<a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink6" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
       <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>

       <!-- <i class="feather feather-more-horizontal"></i> -->
	</a>

    @if(count($actions) > 0)
    	
	    <div class="dropdown-menu table-action-links" aria-labelledby="dropdownMenuLink5">
	    	@foreach($actions as $k => $val)
 			<a class="dropdown-item {{@$val['add_class']}}" href="{{$val['url']}}" @if(isset($val['modal'])) data-toggle="modal" data-target="{{'#'.$val['modal']}}" @if(isset($val['modal_backdrop']) && $val['modal_backdrop'] == true) data-backdrop="static" data-keyboard="false" @endif @endif ><?php echo ((isset($val['icon']) && !empty($val['icon']))?'<i '.$val['icon'].'></i>':''); ?>  {{$val['title']}}</a>
 			@endforeach
	    </div>
	    
    @endif
</div>
