
jQuery('#professions').multiselect({
    enableFiltering: true,
    enableCaseInsensitiveFiltering: true,
    nonSelectedText: 'Select Profession',
    includeSelectAllOption:true,
    onChange:function (option, checked) {
        populateSpecialty(specialty);
        multiselectListenTouchScreen();
    },
    onSelectAll:function () {
        populateSpecialty(specialty);
        multiselectListenTouchScreen();
    },
    onDeselectAll:function () {
        populateSpecialty(specialty);
        multiselectListenTouchScreen();
    }
});



jQuery('#specialities').multiselect({
    enableFiltering: true,
    enableCaseInsensitiveFiltering: true,
    includeSelectAllOption:true,
    enableClickableOptGroups:true,
    indentGroupOptions:2,
    nonSelectedText: 'Select Specialty',
});

jQuery('#job_type').multiselect({
    enableFiltering: true,
    enableCaseInsensitiveFiltering: true,
    includeSelectAllOption:true,
    enableClickableOptGroups:true,
    indentGroupOptions:2,
    nonSelectedText: 'Select Job Type',
});

/*jQuery('#state_id').multiselect({
    enableFiltering: true,
    enableCaseInsensitiveFiltering: true,
    includeSelectAllOption:true,
    enableClickableOptGroups:true,
    indentGroupOptions:2,
    nonSelectedText: 'Select Location',
});*/

jQuery('#state_id').multiselect({
    enableFiltering: true,
    enableCaseInsensitiveFiltering: true,
    nonSelectedText: 'Select State',
    includeSelectAllOption:true,
    onChange:function (option, checked) {
        populateCity(city);
        multiselectListenTouchScreen();
    },
    onSelectAll:function () {
        populateCity(city);
        multiselectListenTouchScreen();
    },
    onDeselectAll:function () {
        populateCity(city);
        multiselectListenTouchScreen();
    }
});


jQuery('#city_id').multiselect({
    enableFiltering: true,
    enableCaseInsensitiveFiltering: true,
    includeSelectAllOption:true,
    enableClickableOptGroups:true,
    indentGroupOptions:2,
    nonSelectedText: 'Select City',
});


function multiselectListenTouchScreen(){
   jQuery(".multiselect-container button.dropdown-item").on('touchstart touchmove',
        function(event){
            event.stopPropagation();
            //jQuery(".multiselect-container button.dropdown-item").css('pointer-events','none');
     }); 
        jQuery(".multiselect-container button.dropdown-item").on('touchend click',function(event){
            //jQuery(".multiselect-container button.dropdown-item").css('pointer-events','all');
    }); 
}

function populateSpecialty(specialty){
  const profSpecialties = [];
  jQuery('#professions option:selected').each(function(index,profession){
    const filtered = specialty[profession.value]; 
    profSpecialties.push({
        label:profession.label,
        children:filtered
    });
  });

  console.log('profSpecialties :',profSpecialties)

  jQuery('#specialities').multiselect('dataprovider', profSpecialties);

  if (typeof selected_speciality != 'undefined') {
   jQuery('#specialities').val(selected_speciality);
  }

  jQuery('#specialities').multiselect('refresh');
}


function populateCity(city){
  const profCities = [];
  jQuery('#state_id option:selected').each(function(index,state_id){
    const filtered = city[state_id.value]; 
    profCities.push({
        label:state_id.label,
        children:filtered
    });
  });

  jQuery('#city_id').multiselect('dataprovider', profCities);

  if (typeof selected_city != 'undefined') {
   jQuery('#city_id').val(selected_city);
  }

  jQuery('#city_id').multiselect('refresh');
}