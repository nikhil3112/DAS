jQuery(document).ready(function () {
	

 	//Initialize Select2 Elements
	    if($('.select2').length > 0){
		    jQuery(".select2").select2({
		   		templateResult: template,
			   	templateSelection: template_selected,
			   	escapeMarkup: function(m) {
		      		return m;
			   	}
			});
	    }
     /* ********************** */
     
	if( jQuery('.fix-height-modal').length > 0 ) {
		var $max_height = ( parseInt($(window).height()) - 200 ) + 'px';
		jQuery('.fix-height-modal').css('max-height', $max_height);
 	}

});


function template_selected(data) {
	var $tmp_option = data.text.split('__');
	return $tmp_option[0];
}

function template(data) {
	var $tmp_option = data.text.split('__');
	var $option = '<span class="comboboxItemName">' + $tmp_option[0] + '</span>';

	if( $tmp_option[1] != undefined && $tmp_option[1] != '' ) {
		$option += '<span class="comboboxSubType">' + $tmp_option[1] + '</span>';
	}

	return $option;
}