
$(document).ready(function() {
	$.ajaxSetup({
		headers: {
			'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
		}
	});

	$('body').on('click', '[data-toggle="modal"]', function(){
		$($(this).data("target")+' .modal-dialog').load($(this).attr('href'));
    });

  	$('[data-toggle="tooltip"]').tooltip();

	//universal ajax submit function
	jQuery(document).on('click', '.ajax-submit', function (e) {
	
		e.preventDefault();
		e.stopPropagation();
		var submit_btn = jQuery(this);
		var btn_name = jQuery(this).html();
		var new_btn_name = 'Loading...'
		var form = jQuery(this).parents('form:first');
		var method = jQuery(form).attr('method');
		var url = jQuery(form).attr('action');
		
		if( jQuery('input[name="button_action"]').length == 1 && jQuery(this).val() != '' && jQuery(this).val() != undefined ) {
			jQuery('input[name="button_action"]').val(jQuery(this).val());
		}
		
		jQuery(form).ajaxSubmit({
			type: method,
			url: url,
			dataType : 'JSON',
			beforeSend : function() {
				jQuery(submit_btn).html(new_btn_name);
				jQuery(submit_btn).attr('disabled', true);
				jQuery(form).find('.form-group').removeClass('has-error');
				jQuery(form).find('.help-block').remove();

				jQuery(document).find('#invoice-created').hide();
			},
			success: function (data) {
		        if (data.status == 1) {
		          jQuery(submit_btn).attr('disabled', true);

		          if (data.close_modal && data.close_modal == true) {
		            jQuery('#' + data.modal_id).find('.modal-body').html(data);
		            jQuery('#' + data.modal_id).modal('hide');
		          }

		          if (data.type == 'notify') {
		            showNotification(data.msg, 'success');

		            if (data.redirect && data.redirect != 'undefined') {
		              setTimeout(function () { location.replace(data.redirect); }, 2000);
		            } else if (data.triggerclick && data.triggerclick != 'undefined') {
		              setTimeout(function () { jQuery(document).find('.' + data.triggerclick).trigger('click'); }, 2000);
		            } else if (typeof data.refresh != 'undefined') {
		              setTimeout(function () { location.reload(); }, 2000);
		            }
		          } else {
		            
		            swal({   
						title: "Done",   
						text: data.msg,   
						type: "success", 
						allowEscapeKey: false		
 					}).then(function (result) {
						if( data.redirect && data.redirect != 'undefined' ) {
							location.replace(data.redirect);
						} else if( data.triggerclick && data.triggerclick != 'undefined' ) {
							jQuery(document).find('.' + data.triggerclick).trigger('click');
						} else if(typeof data.hide_by_class != 'undefined') {
							jQuery(document).find('.' + data.hide_by_class).hide();
						} else if(typeof data.remove_by_class != 'undefined') {
							jQuery(document).find('.' + data.remove_by_class).remove();
						}  else if(typeof data.refresh != 'undefined'){
							location.reload();
						}else if(typeof data.closswal != 'undefined') {
							swal.close();
							if( data.swaltriggerclick && data.swaltriggerclick != 'undefined' ) {
								jQuery('.' + data.swaltriggertrigger).trigger(data.swaltriggerclick);
							} else{
								jQuery('.'+data.swaltriggertrigger).trigger('change');
							}
						}else if(data.modalclose != 'undefined' && data.trigger_class != 'undefined' && data.trigger_type != 'undefined') {
							jQuery('#' + data.modalclose).modal('hide');
							jQuery('#' + data.modalclose).on("hidden.bs.modal", function () {});
							jQuery('.'+data.trigger_class).trigger(data.trigger_type);
						} else {
							location.reload();	
						}
				  	});
				  	
		          }

		          if (data.txt_box_name != undefined && data.txt_box_value != undefined) {
		            jQuery(document).find('input[name="' + data.txt_box_name + '"]').val(data.txt_box_value);
		          }

		          if (data.html_div != undefined && data.html_data != undefined) {
		            jQuery(document).find('.'+data.html_div).html(data.html_data);
		          }

		          if (data.append_html_div != undefined && data.append_html_data != undefined) {
		            jQuery(document).find('.'+data.append_html_div).append(data.append_html_data);
		          }

		          if (data.ac_id != undefined && data.ac_id_value != undefined) {
		            jQuery(document).find('input[name="' + data.ac_id + '"]').val(data.ac_id_value);
		          }

		          if (data.ac_name != undefined && data.ac_name_value != undefined) {
		            jQuery(document).find('input[name="' + data.ac_name + '"]').val(data.ac_name_value);
		          }

		          if (data.trigger_class != undefined && data.trigger_type != undefined) {
		            jQuery(document).find('.' + data.trigger_class).trigger(data.trigger_type);
		          }
		        } else if (data.status == 2) {
		          if (data.type == 'swal') {
		            sweetAlert("Oops...", data.msg, "error");
		          } else if (data.type == 'notify') {
		            showNotification(data.msg, 'error');
		          }

		          if (data.redirect && data.redirect != 'undefined') {
		            setTimeout(function () { location.replace(data.redirect); }, 5000);
		          } else if (data.triggerclick && data.triggerclick != 'undefined') {
		            setTimeout(function () { jQuery(document).find('.' + data.triggerclick).trigger('click'); }, 5000);
		          } else if (typeof data.refresh != 'undefined') {
		            setTimeout(function () { location.reload(); }, 5000);
		          }
		        }else if (data.status == 3) {
		          if (data.load_script_function && data.load_script_function != 'undefined') {
		            window[data.load_script_function](data.has_tax);
		          }
		        }
		      },
			error : function (data) {
			    jQuery.each(data.responseJSON.errors, function (key, index) {
			    	if(~key.indexOf(".")){
				        key = key.replace(/\./gi, '-');
				        jQuery('#'+key).closest('.form-group').addClass('has-error').append('<span class="help-block">'+index[0]+'</span>');
			    	} else {
			    		var input = jQuery(form).find('[name="'+key+'"]');
				        input.closest('.form-group').addClass('has-error').append('<span class="help-block">'+index[0]+'</span>');
			    	}
			    });
			},
			complete : function(){
				jQuery(submit_btn).html(btn_name);
				jQuery(submit_btn).attr('disabled', false);
			}
		});
	});
	

	jQuery(document).on('click', '.modal-submit', function (e) {
	
		e.preventDefault();
		e.stopPropagation();
		var submit_btn = jQuery(this);
		var btn_name = jQuery(this).html();
		var new_btn_name = 'Loading...'
		var form = jQuery(this).parents('form:first');
		var method = jQuery(form).attr('method');
		var url 	= jQuery(form).attr('action');
		var modal 	= jQuery(this).closest('.modal').attr('id');

		if($(form).find('[name=myfield]').val() != undefined) {
			var htmlCk = CKEDITOR.instances.myfield.getData();
			jQuery("#content-ck").text(htmlCk);
		}
		
		jQuery(form).ajaxSubmit({
			type: method,
			url: url,
			dataType : 'JSON',
			beforeSend : function() {
				jQuery(submit_btn).html(new_btn_name);
				jQuery(submit_btn).attr('disabled', true);
				jQuery(form).find('.form-group').removeClass('has-error');
				jQuery(form).find('.help-block').remove();
			},
			success: function (data) {
		        if (data.status == 1) {
		          	jQuery(submit_btn).attr('disabled', true);
		          	jQuery('#'+modal).modal('hide');
		        	jQuery("#"+modal).on("hidden.bs.modal", function(){
				      jQuery(".modal-content").html(" ");
				    });


			        if (data.type == 'notify') {
			            showNotification(data.msg, 'success');

			            if (data.redirect && data.redirect != 'undefined') {
			              setTimeout(function () { location.replace(data.redirect); }, 2000);
			            } else if (data.triggerclick && data.triggerclick != 'undefined') {
			              setTimeout(function () { jQuery(document).find('.' + data.triggerclick).trigger('click'); }, 2000);
			            } else if (typeof data.refresh != 'undefined') {
			              setTimeout(function () { location.reload(); }, 2000);
			            }
			        } else {
			            swal({
			              title: "Done",
			              text: data.msg,
			              type: "success",
			              closeOnConfirm: true,
			              allowEscapeKey: false
			            }).then(function(result) {
			           		if (data.trigger_click && data.trigger_click != 'undefined') {
			                	jQuery(document).find('.' + data.trigger_click).trigger('click');
			              	} 

							if (data.append_html != '' && data.append_html != 'undefined') {
							    jQuery('.'+data.html).append(data.append_html);
							} 

			           		if (data.html != 'undefined' && data.trigger != 'undefined') {
			                	jQuery('.'+data.html).trigger(data.trigger);
			              	} 

			               	if (typeof data.refresh != 'undefined') {
			                	setTimeout(function () { location.reload(); }, 1000);
			               	}

			               	if (data.redirect && data.redirect != 'undefined') {
				              setTimeout(function () { location.replace(data.redirect); }, 2000);
				            }

			            });
			        }

				} else if (data.status == 2) {
		          if (data.type == 'swal') {
		            sweetAlert("Oops...", data.msg, "error");
		            if (typeof data.refresh != 'undefined') {
	                   setTimeout(function () { location.reload(); }, 1000);
	                }
		          } else if (data.type == 'notify') {
		            showNotification(data.msg, 'error');
		          }
				} else if(data.status == 3){
					jQuery(submit_btn).attr('disabled', true);
                    jQuery('#'+modal).modal('hide'); 
					if (data.triggerclick && data.triggerclick != 'undefined') {
		                //setTimeout(function () {
			          	  jQuery(document).find('.' + data.triggerclick).trigger('click'); 
			          	//}, 2000);
		            } else if (typeof data.refresh != 'undefined') {
		              setTimeout(function () { location.reload(); }, 2000);
		            }
				}
		    },
			error : function (data) {
			    jQuery.each(data.responseJSON.errors, function (key, index) {
			    	if(~key.indexOf(".")){
				        key = key.replace(/\./gi, '-');
				        jQuery('#'+key).closest('.form-group').addClass('has-error').append('<span class="help-block">'+index[0]+'</span>');
			    	} else {
			    		var input = jQuery(form).find('[name="'+key+'"]');
				        input.closest('.form-group').addClass('has-error').append('<span class="help-block">'+index[0]+'</span>');
			    	}
			    });
			},
			complete : function(){
				jQuery(submit_btn).html(btn_name);
				jQuery(submit_btn).attr('disabled', false);
			}
		});
	});
	
 	jQuery(document).on('click', '.frm-submit', function (e) {
	    e.preventDefault();
	    e.stopPropagation();
	    var submit_btn = jQuery(this);
	    var btn_name = jQuery(this).html();
	    var new_btn_name = 'Loading...';
	    var form = jQuery(this).parents('form:first');
	    var method = jQuery(form).attr('method');
	    var url = jQuery(form).attr('action');

	    if (jQuery('input[name="button_action"]').length == 1 && jQuery(this).val() != '' && jQuery(this).val() != undefined) {
	      jQuery('input[name="button_action"]').val(jQuery(this).val());
	    }

	    jQuery(form).ajaxSubmit({
	      type: method,
	      url: url,
	      dataType: 'JSON',
	      beforeSend: function () {
	        jQuery(submit_btn).html(new_btn_name);
	        jQuery(submit_btn).attr('disabled', true);
	        jQuery(form).find('.form-fild').removeClass('has-error');
	        jQuery(form).find('.form-group').removeClass('has-error');
	        jQuery(form).find('.invalid-feedback').remove();
	      },
	      error: function (data) {
	        jQuery.each(data.responseJSON.errors, function (key, index) {
	          if (~key.indexOf(".")) {
	            key = key.replace(/\./gi, '-');
	            console.log(key);
	            jQuery('#' + key).closest('.form-group').addClass('has-error').append('<span class="invalid-feedback">' + index[0] + '</span>');
	          } else {
	            var input = jQuery(form).find('[name="' + key + '"]');
	            console.log(key);
	            input.closest('.form-fild').addClass('has-error').append('<span class="invalid-feedback">' + index[0] + '</span>');
	          }
	        });

	        jQuery(form).addClass('custom-validated');
	      },
	      success: function (data) {
	        if (data.status == 1) {
	          jQuery(submit_btn).attr('disabled', true);

	          if (data.close_modal && data.close_modal == true) {
	            jQuery('#' + data.modal_id).find('.modal-body').html(data);
	            jQuery('#' + data.modal_id).modal('hide');
	          }

	          if (data.type == 'notify') {
	            showNotification(data.msg, 'success');

	            if (data.redirect && data.redirect != 'undefined') {
	              setTimeout(function () { location.replace(data.redirect); }, 2000);
	            } else if (data.triggerclick && data.triggerclick != 'undefined') {
	              setTimeout(function () { jQuery(document).find('.' + data.triggerclick).trigger('click'); }, 2000);
	            } else if (typeof data.refresh != 'undefined') {
	              setTimeout(function () { location.reload(); }, 2000);
	            }
	          } else {
	            swal({
	              title: "Done",
	              text: data.msg,
	              type: "success",
	              closeOnConfirm: true,
	              allowEscapeKey: false
	            },
	            function () {
	              if (data.redirect && data.redirect != 'undefined') {
	                location.replace(data.redirect);
	              } else if (data.triggerclick && data.triggerclick != 'undefined') {
	                jQuery(document).find('.' + data.triggerclick).trigger('click');
	              } else if (typeof data.refresh != 'undefined') {
	                location.reload();
	              }
	            });
	          }

	          if (data.txt_box_name != undefined && data.txt_box_value != undefined) {
	            jQuery(document).find('input[name="' + data.txt_box_name + '"]').val(data.txt_box_value);
	          }

	          if (data.html_div != undefined && data.html_data != undefined) {
	            jQuery(document).find('.'+data.html_div).html(data.html_data);
	          }

	          if (data.append_html_div != undefined && data.append_html_data != undefined) {
	            jQuery(document).find('.'+data.append_html_div).append(data.append_html_data);
	          }

	          if (data.ac_id != undefined && data.ac_id_value != undefined) {
	            jQuery(document).find('input[name="' + data.ac_id + '"]').val(data.ac_id_value);
	          }

	          if (data.ac_name != undefined && data.ac_name_value != undefined) {
	            jQuery(document).find('input[name="' + data.ac_name + '"]').val(data.ac_name_value);
	          }

	          if (data.trigger_class != undefined && data.trigger_type != undefined) {
	            jQuery(document).find('.' + data.trigger_class).trigger(data.trigger_type);
	          }
	        } else if (data.status == 2) {
	          if (data.type == 'swal') {
	            sweetAlert("Oops...", data.msg, "error");
	          } else if (data.type == 'notify') {
	            showNotification(data.msg, 'error');
	          }

	          if (data.redirect && data.redirect != 'undefined') {
	            setTimeout(function () { location.replace(data.redirect); }, 5000);
	          } else if (data.triggerclick && data.triggerclick != 'undefined') {
	            setTimeout(function () { jQuery(document).find('.' + data.triggerclick).trigger('click'); }, 5000);
	          } else if (typeof data.refresh != 'undefined') {
	            setTimeout(function () { location.reload(); }, 5000);
	          }
	        }else if (data.status == 3) {
	          if (data.load_script_function && data.load_script_function != 'undefined') {
	            window[data.load_script_function](data.has_tax);
	          }
	        }
	      },
	      complete: function () {
	        jQuery(submit_btn).html(btn_name);
	        jQuery(submit_btn).attr('disabled', false);
	      }
	    });
  	});


	jQuery(document).on('click','.tab-ajax',function () {
       	var url = jQuery(this).attr('href');
        jQuery.ajax({
            type: 'GET',
            url: url,
            dataType : 'HTML',
            beforeSend : function() {
            	jQuery('.tab-pane').html('<div><h3 class="text-center" style="margin: 50px 0;"><i class="fa fa-spin fa-refresh"></i>&nbsp;Wait for data ....</h3></div>');
            },
            success : function(data) {
              jQuery('.tab-pane').html(data);
            },
        });    
    });

	jQuery(".select2").select2({
   		templateResult: template,
	   	templateSelection: template_selected,
	   	escapeMarkup: function(m) {
      		return m;
	   	}
	});

	jQuery(document).on('change', '.select-change', function (e) {

		e.preventDefault();
	    e.stopPropagation();
	   
	    var val		= jQuery(this).val();
	    var target  = jQuery(this).attr('data-target');
	    var string 	= jQuery(this).attr('data-string');
	    var url 	= jQuery(this).attr('data-url');
	    var type 	= jQuery(this).attr('data-type');
	    var other   = jQuery(this).attr('data-other-target');
	    var trigger = jQuery(this).attr('select-trigger');

    	/*jQuery('.state-url').css('display','none');*/
    	jQuery('.city-url').css('display','none');

    
	    jQuery.ajax({
            type: type,
            url: url+'?'+string+'='+val,
            dataType : 'JSON',
            beforeSend : function() {
                jQuery('#'+target).html('<option value="">Loading..</option>');

                if( other != '' && other != 'undefined' ) {

                	jQuery('.'+other).html('<option value="">Choose..</option>');
                }
            },
            success : function(data) {
            	if(data.parent_id != '' && data.parent_id != undefined){
                    jQuery('.'+data.child_class).show();

            		jQuery('.'+data.sub_child_class).show();
            
	            	if(data.child_class != '' && data.child_url != ''){
	            		jQuery('.'+data.child_class).attr('href',data.child_url);
	            	}

            	}else{
                    jQuery('.'+data.child_class).css('display','none');
    	            jQuery('.'+data.sub_child_class).css('display','none');
            	}

                jQuery('#'+target).html(data.options);
                
                if( trigger != '' && trigger != 'undefined' ) {
                	jQuery("."+trigger).trigger( "change" );
                }
            },
        });

	});

	jQuery(document).on('click', '.html-submit', function (e) {
		var url  	= jQuery(this).attr('action');
		var target  = jQuery(this).attr('target');
		var method  = jQuery(this).attr('method');
		jQuery.ajax({
			type: method,
			dataType : 'JSON',
			url: url,
			headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
			beforeSend : function() {
				jQuery(target).html('');
			},
			success : function(data) {
				console.log(data);
				jQuery('.'+target).html(data.html);
			}
		});

	});

	jQuery(document).on('click', '.report-submit', function (e) {

		e.preventDefault();
		e.stopPropagation();
		var submit_btn 		= jQuery(this);
		var btn_name 		= jQuery(this).html();
		var new_btn_name 	= 'Loading...'
		var form 			= jQuery(this).parents('form:first');
		var method 			= jQuery(form).attr('method');
		var url 			= jQuery(form).attr('action');

		var is_paginate = 0;
		var page_reset = $('#page_input_reset').val();

		if(jQuery(this).attr('data-pagination') != 'undefined' && jQuery(this).attr('data-pagination') == 'true') {
			is_paginate = 1;
		}

		var page_number = $('#page_input_field').val();
      	
  		if (is_paginate == 1) {
  		}
		
		jQuery(form).ajaxSubmit({
			type: method,
			url: url,
			dataType : 'JSON',
			beforeSend : function() {
				jQuery(submit_btn).html(new_btn_name);
				jQuery(submit_btn).attr('disabled', true);
				jQuery(form).find('.form-group').removeClass('has-error');
				jQuery(form).find('.help-block').remove();
			},
			success : function(data) {
				if( jQuery('#report-table-details').length > 0 ) {
					if( data['records'] != '' ) {
						jQuery(document).find('.total-records span').html(data['records']);
					} else {
						jQuery(document).find('.total-records span').html(0);
					}

					if(data['records'] > 0) {
						jQuery('.print').show();
						jQuery('#export').show();
					} else {
						jQuery('.print').hide();
						jQuery('#export').hide();
					}

					if( data['table'] != '' ) {
						if (data['thead'] != undefined && data['thead'] == 'true') {
						    jQuery('#report-table-details').html(data['table']);
						} else {
							jQuery('#report-table-details').find('tbody').html(data['table']);
						}
					} else {
						$td_count = jQuery('#report-table-details').find('thead tr th').length;
						jQuery('#report-table-details').find('tbody').html('<tr><td colspan="'+ $td_count +'" class="text-center"> No Records </td></tr>');
					}

					if( typeof data['tfoot'] != 'undefined'  && data['tfoot'] != '' ) {
						jQuery('#report-table-details').find('tfoot').html(data['tfoot']);
					}

					if( typeof data['pagination'] != 'undefined'  && data['pagination'] != '' ) {
						jQuery('.table-pagination-div').html(data['pagination']);
					} else {
						jQuery('.table-pagination-div').html('');
					}	

					if( typeof data['page_reset'] != 'undefined'  && data['page_reset'] == 1 ) {
						$('#page_input_field').val(1);
						$('#page_input_reset').val(0);
					}

				}
			},
			error : function (data) {
			    jQuery.each(data.responseJSON, function (key, index) {
			    	if(~key.indexOf(".")){
				        key = key.replace(/\./gi, '-');
				        jQuery('#'+key).closest('.form-group').addClass('has-error').append('<span class="help-block">'+index[0]+'</span>');
			    	} else {
			    		var input = jQuery(form).find('[name="'+key+'"]');
				        input.closest('.form-group').addClass('has-error').append('<span class="help-block">'+index[0]+'</span>');
			    	}
			    });
			},
			complete : function(){
				jQuery(submit_btn).html(btn_name);
				jQuery(submit_btn).attr('disabled', false);
			}
		});
	});


	//modal ajax submit for get table data
	jQuery(document).on('click', '.modal-data-get-submit', function (e) {
		e.preventDefault();
		e.stopPropagation();
		var submit_btn 		= jQuery(this);
		var btn_name 		= jQuery(this).html();
		var new_btn_name 	= 'Loading...'
		var form 			= jQuery(this).parents('form:first');
		var method 			= jQuery(form).attr('method');
		var url 			= jQuery(form).attr('action');
		var table_blank     = false;
		if( jQuery(this).attr('data-table') != undefined && jQuery(this).attr('data-table') != '' && jQuery(this).attr('data-table') == 'blank') {
			var table_blank = true;			
		}
	
		if( jQuery(this).attr('data-submit') != undefined && jQuery(this).attr('data-submit') != '' && jQuery(this).attr('data-submit') == 'sortTable') {
			$('#modal-data-table-details').trigger('sortRestart').trigger('filterReset');
		}

		jQuery(form).ajaxSubmit({
			type: method,
			url: url,
			dataType : 'JSON',
			beforeSend : function() {
				jQuery(submit_btn).html(new_btn_name);
				jQuery(submit_btn).attr('disabled', true);
				jQuery(form).find('.form-group').removeClass('has-error');
				jQuery(form).find('.help-block').remove();
				jQuery('.total-trauery').hide();
				if(table_blank != undefined  && table_blank == true) {
					jQuery('#modal-data-table-details').html('');
				} else {
					$th_count = jQuery('#modal-data-table-details').find('thead tr th').length;
					$o_th_count = jQuery('#modal-data-table-details').attr('data-totalth');

					if($o_th_count != undefined && $o_th_count != '') {
						$th_count = $o_th_count;
					}

					jQuery('#modal-data-table-details').find('tfoot').html('  ');
					jQuery('#modal-data-table-details').find('tbody').html('<tr><td colspan="'+ $th_count +'"><h2 class="text-center" style="margin: 50px 0;"><i class="fa fa-spin fa-refresh"></i>&nbsp;Loading....</h2></td></tr>');
				}
			},
			success : function(data) {
				if( jQuery('#modal-data-table-details').length > 0 ) {
					if( data['records'] != '' ) {
						jQuery(document).find('.total-records span').html(data['records']);
					} else {
						jQuery(document).find('.total-records span').html(0);
					}

					if(data['records'] > 0) {
						jQuery('.print').show();
						jQuery('#export').show();
					} else {
						jQuery('.print').hide();
						jQuery('#export').hide();
					}

					if( data['table'] != '' ) {
						if (data['thead'] != undefined && data['thead'] == 'true') {
						    jQuery('#modal-data-table-details').html(data['table']);
						} else {
							jQuery('#modal-data-table-details').find('tbody').html(data['table']);
						}
					} else {
						$td_count = jQuery('#modal-data-table-details').find('thead tr th').length;
						jQuery('#modal-data-table-details').find('tbody').html('<tr><td colspan="'+ $td_count +'">No Data To Show !!</td></tr>');
					}

					if( typeof data['tfoot'] != 'undefined'  && data['tfoot'] != '' ) {
						jQuery('#modal-data-table-details').find('tfoot').html(data['tfoot']);
					}
					if (typeof data['tableSort'] != 'undefined'  && data['tableSort'] == 1 && data['table'] != '') {
						sortTable(data['sortTable']);
					}

					if (typeof data['datatable'] != 'undefined' ) {
						var dTable = '';
						if(data['datatable'] == true) {
							dTable  = jQuery('#modal-data-table-details').DataTable({"retrieve": true,"paging":   false});
						}
					}
					
					if (typeof data['sticky'] != 'undefined'  && data['sticky'] == 'true') {
						jQuery('#modal-data-table-details').stickySort();
					}
					
					if( data['trigger'] && data['trigger'] != 'undefined' ) {
						jQuery(document).find('.' + data['trigger_class']).trigger('click');
					}

					if (typeof data['tableSort'] != 'undefined'  && data['tableSort'] == 1 && data['table'] != '') {
						sortTable(data['sortTable']);
					}

					if( typeof data['popover'] != 'undefined'  && data['popover'] != '' ){
						jQuery('[data-toggle="popover"]').popover();
					}
					

					jQuery("html, body").animate({ scrollTop: 1 }, "slow");

					if( jQuery('#modal-data-table-details thead').find('th.default-sorting-asc').length == 1 ) {
						setTimeout(jQuery('#modal-data-table-details thead').find('th.default-sorting-asc').trigger('click'), 100);
					}

					if( jQuery('#modal-data-table-details thead').find('th.default-sorting-desc').length == 1 ) {
						setTimeout(jQuery('#modal-data-table-details thead').find('th.default-sorting-desc').trigger('click'), 100);
						setTimeout(jQuery('#modal-data-table-details thead').find('th.default-sorting-desc').trigger('click'), 100);
					}
				}
			},
			complete : function(){
				jQuery(submit_btn).html(btn_name);
				jQuery(submit_btn).attr('disabled', false);
			}
		});
	});


	jQuery(document).on('click', '.custom_pagination_ajax', function (e) {
		var clicked_page = $(this).data('pagenumber');
		$('#page_input_field').val(clicked_page);
		$('#page_input_reset').val(1);
		jQuery(".report-submit").trigger("click");

	});


	jQuery(document).on('click', '.ajax-table-report-submit', function (e) {
		e.preventDefault();
		e.stopPropagation();
		var submit_btn 		= jQuery(this);
		var btn_name 		= jQuery(this).html();
		var new_btn_name 	= 'Loading...'
		var form 			= jQuery(this).parents('form:first');
		var method 			= jQuery(form).attr('method');
		var url 			= jQuery(form).attr('action');
		var table_name 		= '#'+jQuery(this).data('tableid');

		var table_blank     = false;
		if( jQuery(this).attr('data-table') != undefined && jQuery(this).attr('data-table') != '' && jQuery(this).attr('data-table') == 'blank') {
			var table_blank = true;			
		}

		if( jQuery(this).attr('data-submit') != undefined && jQuery(this).attr('data-submit') != '' && jQuery(this).attr('data-submit') == 'sortTable') {
			$(table_name).trigger('sortRestart').trigger('filterReset');
		}
		if( jQuery('input[name="button_action"]').length == 1 && jQuery(this).val() != '' && jQuery(this).val() != undefined ) {
			jQuery('input[name="button_action"]').val(jQuery(this).val());
		}

		
		jQuery(form).ajaxSubmit({
			type: method,
			url: url,
			dataType : 'JSON',
			beforeSend : function() {
				jQuery(submit_btn).html(new_btn_name);
				jQuery(submit_btn).attr('disabled', true);
				jQuery(form).find('.form-group').removeClass('has-error');
				jQuery(form).find('.help-block').remove();

				if(table_blank != undefined  && table_blank == true) {
					jQuery(table_name).html('');
				} else {
					$th_count = jQuery(table_name).find('thead tr th').length;
					$o_th_count = jQuery(table_name).attr('data-totalth');

					if($o_th_count != undefined && $o_th_count != '') {
						$th_count = $o_th_count;
					}

					jQuery(table_name).find('tfoot').html('  ');
					jQuery(table_name).find('tbody').html('<tr><td colspan="'+ $th_count +'"><h2 class="text-center" style="margin: 50px 0;"><i class="fa fa-spin fa-refresh"></i>&nbsp;Loading....</h2></td></tr>');
				} 

				if(submit_btn.attr('data-submit') != undefined && submit_btn.attr('data-submit') != '' && submit_btn.attr('data-submit') == 'sortTable') {
					$.tablesorter.destroy(table_name, true, function(table) {});
				}
			},
			success : function(data) {
				if( jQuery(table_name).length > 0 ) {
					if( data['records'] != '' ) {
						jQuery(document).find('.detail-total-records span').html(data['records']);
					} else {
						jQuery(document).find('.detail-total-records span').html(0);
					}				

					if(data['records'] > 0) {
						jQuery('.print').show();
						jQuery('#detail-export').show();
					} else {
						jQuery('.print').hide();
						jQuery('#detail-export').hide();
					}

					if( data['table'] != '' ) {
						if (data['thead'] != undefined && data['thead'] == 'true') {
						    jQuery(table_name).html(data['table']);
						} else {
							jQuery(table_name).find('tbody').html(data['table']);
						}
					} else {
						$td_count = jQuery(table_name).find('thead tr th').length;
						jQuery(table_name).find('tbody').html('<tr><td colspan="'+ $td_count +'">No Data To Show !!</td></tr>');
					}

					if( typeof data['tfoot'] != 'undefined'  && data['tfoot'] != '' ) {
						jQuery(table_name).find('tfoot').html(data['tfoot']);
					}
					/*if (typeof data['tableSort'] != 'undefined'  && data['tableSort'] == 1 && data['table'] != '') {
						sortTable(data['sortTable']);
					}*/

					if (typeof data['datatable'] != 'undefined' ) {
						var dTable = '';
						if(data['datatable'] == true) {
							dTable  = jQuery(table_name).DataTable({"retrieve": true,"paging":   false});
						}
					}
					
					if (typeof data['sticky'] != 'undefined'  && data['sticky'] == 'true') {
						jQuery(table_name).stickySort();
					}
					
					if( data['trigger'] && data['trigger'] != 'undefined' ) {
						jQuery(document).find('.' + data['trigger_class']).trigger('click');
					}

					if( typeof data['popover'] != 'undefined'  && data['popover'] != '' ){
						jQuery('[data-toggle="popover"]').popover();
					}


					jQuery("html, body").animate({ scrollTop: 1 }, "slow");

					if( jQuery(table_name+' thead').find('th.default-sorting-asc').length == 1 ) {
						setTimeout(jQuery(table_name+' thead').find('th.default-sorting-asc').trigger('click'), 100);
					}

					if( jQuery(table_name+' thead').find('th.default-sorting-desc').length == 1 ) {
						setTimeout(jQuery(table_name+' thead').find('th.default-sorting-desc').trigger('click'), 100);
						setTimeout(jQuery(table_name+' thead').find('th.default-sorting-desc').trigger('click'), 100);
					}
				}
			},
			complete : function(){
				jQuery(submit_btn).html(btn_name);
				jQuery(submit_btn).attr('disabled', false);
			}
		});
	});


	//universal delete function
	jQuery(document).on('click', '.btn-delete', function (e) {
		e.preventDefault();
		var url 	= jQuery(this).attr('href');
		var $title 	= "Delete Data";
		var $msg 	= "Are You Sure You Want To Delete Data";
		var $method = "DELETE";
		swal({   
			title 					: $title,
			text 					: $msg,
			type 					: "warning",
			showCancelButton 		: true,
			closeOnConfirm 			: false,
			showLoaderOnConfirm 	: true,
		}).then(function(result) {
	      if (result.value) {
	        jQuery.ajax({
				type: $method,
                data: {_method: $method},
				dataType : 'JSON',
				url: url,
				success : function(data) {
				
					if(data.response == 1){
						swal({
							title: "Done",   
							text: data.msg,   
							type: "success", 
							closeOnConfirm: true,
							allowEscapeKey: false
						}).then(function(result)  {
							if( data.trigger_click && data.trigger_click != 'undefined' ) {
								jQuery(document).find('.' + data.trigger_click).trigger('click');
							}

							if(typeof data.remove_by_class != 'undefined') {
								jQuery(document).find('.' + data.remove_by_class).remove();
							}
						});
					} else if (data.response == 2){
						swal("Oops...", data.msg, "error");
					}  else if (data.response == 3){
						swal(data.msg);
						if( data.triggerclick && data.triggerclick != 'undefined' ) {
							jQuery(document).find('.' + data.triggerclick).trigger('click');
						}
					} 
				},
			});
	      } 
	    });
		
	});

	jQuery(document).on('click', '.warning-apply-job', function (e) {
		e.preventDefault();
		var url 	= jQuery(this).attr('href');
		var $title 	= "Something Wrong..!";
		var $msg 	= "You can't apply, because You are login as admin ";
		var $method = "GET";
		swal({   
			title 					: $title,
			text 					: $msg,
			type 					: "warning",
			showCancelButton 		: false,
			closeOnConfirm 			: false,
			showLoaderOnConfirm 	: true,
		}).then(function(result) {
	      
	    });
		
	});

	

    jQuery('#report-filter-from-date').flatpickr({
        dateFormat: "m/d/Y",
        onClose: function(dateObj, dateStr, instance) {
            console.log(dateStr);
            jQuery('#report-filter-to-date').flatpickr({
                dateFormat: "m/d/Y",
                minDate: dateStr
            });
        }
    });

    jQuery('#report-filter-to-date').flatpickr({
        dateFormat: "m/d/Y"
    });
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

function showNotification(text, theme, life, pos_hor, pos_ver) {
  life = typeof life !== 'undefined' ? life : 7500;
  theme = typeof theme !== 'undefined' ? theme : 'success';
  pos_hor = typeof pos_hor !== 'undefined' ? pos_hor : 'bottom';
  pos_ver = typeof pos_ver !== 'undefined' ? pos_ver : 'right';

  n_text_olor = '#fff';
  n_background_olor = '#3b3f5c';

  if (theme == 'success') {
    n_background_olor = '#1abc9c';
  } else if (theme == 'error') {
    n_background_olor = '#e7515a';
  } else if (theme == 'warning') {
    n_background_olor = '#e2a03f';
  } else if (theme == 'info') {
    n_background_olor = '#2196f3';
  }

  Snackbar.show({
    text: text,
    duration: life,
    pos: pos_hor + '-' + pos_ver,
    actionTextColor: n_text_olor,
    backgroundColor: n_background_olor,
    actionText: 'X'
  });
}
