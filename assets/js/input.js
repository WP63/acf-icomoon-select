(function($){
	$(document).on('click', '[data-acf-icomoon-choice]', function(e){
		e.preventDefault();

		var svg;
		var field = $(this);
		var parent = field.parent();
		var value = field.attr('data-acf-icomoon-choice');
		var icons = parent.find('[data-acf-icomoon-choice]');

		parent.parent().siblings('[data-acf-icomoon-choice-field]').val(value);

		$.each( icons, function() {
			if ( $(this).attr('data-acf-icomoon-choice') === value ){
				$(this).addClass('active');
				svg = $(this).find('.svg');
			}
		});

		var html = $(svg).html();
		html += '<p>' + value + '<br><a href="#" data-acf-icomoon-remove-choice>Remove</a></p>';
		parent.siblings('[data-icomoon-icon-preview]').html(html).show();
		parent.hide();
		parent.siblings('[data-acf-icomoon-select-cancel-button]').hide();
	});

	$(document).on('click', '[data-acf-icomoon-select-choose-button]', function(e){
		e.preventDefault();
		// toggleSelectionList(true);

		var parent = $(this).parent();

		parent.find('.acf-icomoon_select-icon-list').show();
		parent.find('[data-acf-icomoon-select-choose-button]').hide();
		parent.find('[data-acf-icomoon-select-cancel-button]').show();
	});

	$(document).on('click', '[data-acf-icomoon-select-cancel-button]', function(e){
		e.preventDefault();
		// toggleSelectionList(false);

		var parent = $(this).parent();

		parent.find('[data-acf-icomoon-select-cancel-button]').hide();
		parent.find('[data-acf-icomoon-select-choose-button]').show();
		parent.find('.acf-icomoon_select-icon-list').hide();
	});

	$(document).on('click', '[data-acf-icomoon-remove-choice]', function(e){
		e.preventDefault();

		var field = $(this).parents('.acf-icomoon_select-selection');

		field.find('[data-acf-icomoon-choice]').removeClass('active');
		field.find('[data-icomoon-icon-preview]').empty().hide();
		field.find('[data-acf-icomoon-select-choose-button]').show();
		field.siblings('[data-acf-icomoon-choice-field]').val('');
	});

	if( typeof acf.add_action !== 'undefined' ) {

		/*
		*  ready append (ACF5)
		*
		*  These are 2 events which are fired during the page load
		*  ready = on page load similar to $(document).ready()
		*  append = on new DOM elements appended via repeater field
		*
		*  @type	event
		*  @date	20/07/13
		*
		*  @param	$el (jQuery selection) the jQuery element which contains the ACF fields
		*  @return	n/a
		*/

		acf.add_action('ready append', function( $el ){

			/**
			* Loop through the type settings and hide/show choices
			*/
			var types = $('[data-name="selection_json_type"]');
			$.each(types, function(){
				var selection = $(this).find('select').val();
				toggleSettings(this, selection);
			});

			$(document).on('change', '[data-name="selection_json_type"] select', function(){
				var selection = $(this).val();
				toggleSettings(this, selection);
			});

			function toggleSettings(element, selection) {
				var path_choice = $(element).parents('table').find('[data-name="selection_json_path"]');
				var file_choice = $(element).parents('table').find('[data-name="selection_json_file"]');
				if ( selection === 'selection_json_file' ){
					$(path_choice).hide();
					$(file_choice).show();
					return;
				}
				$(file_choice).hide();
				$(path_choice).show();
			}

			// search $el for fields of type 'FIELD_NAME'
			acf.get_fields({ type : 'icomoon_select'}, $el).each(function(){

				initialize_field( $(this) );
			});
		});
	} else {
		/*
		*  acf/setup_fields (ACF4)
		*
		*  This event is triggered when ACF adds any new elements to the DOM.
		*
		*  @type	function
		*  @since	1.0.0
		*  @date	01/01/12
		*
		*  @param	event		e: an event object. This can be ignored
		*  @param	Element		postbox: An element which contains the new HTML
		*
		*  @return	n/a
		*/

		$(document).on('acf/setup_fields', function(e, postbox){
			$(postbox).find('.field[data-field_type="icomoon_select"]').each(function(){
				initialize_field( $(this) );
			});
		});
	}
})(jQuery);
