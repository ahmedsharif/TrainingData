
// Scrolbar Script
(function($){
    $(window).on("load",function(){ 
        $(".scroll-content").mCustomScrollbar(); 
        $(".editable").mCustomScrollbar(); 
    });
})(jQuery);



$(document).ready(function () {

	// Append HTML Script
	$('#add_division').click(function() {
        htmlToBeInserted = "<div class=\"col-md-6 col-sm-6\"><div class=\"input-container\"><input type=\"text\" name=\"\" id=\"\" required=\"required\"><label>5.</label><div class=\"bar\"></div></div></div>";
        $("#append-devision").append(htmlToBeInserted);
    });


// Tabs Script
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})
});



// Input Type File Script
'use strict';

;( function ( document, window, index )
{
	var inputs = document.querySelectorAll( '.inputfile' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});

		// Firefox bug fix
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});
}( document, window, 0 ));

  

// Gallery Script
  var parameters = {
          gridContainer: '#grid-container',
          gridItems: '.grid-item',
          enableImagesLoaded: true
        };
        var grid = new justifiedGrid(parameters);
		$('body').imagesLoaded( function() {
   grid.initGrid();
})