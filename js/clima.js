/**
 * @file
 * Implementación del consumo de la API via Ajax.
 */

 (function ($) {
  Drupal.behaviors.clima = {
    attach: function (context, settings) {

      // Genera contenido para ciudad por defecto (Medellín).	
      ajax('Medellín');	

      // Genera contenido en respuesta a la ciudad seleccionada por el usuario.
      $('#clima-block-form select').change(function() {
          var ciudad = this.value;
          ajax(ciudad);
      });

      /**
      * Define función ajax.
      *
      * Consume información de la API y la agrega al documento HTML.
      *
      * @param string
      *   Ciudad para la que debe consumirse información.
      */
	  function ajax(ciudad) {

	  	$( "#info" ).html('Cargando...');

        $.ajax({
		  url:  "node/get/ajax",
		  dataType: "json",
		  success: function(cf) {

		    $.ajax({
		      type: "GET",
		      url:  cf.base_endpoint,
		      data: {q:ciudad,appid:cf.appid,units:cf.units}, 
		      success: function(data) {
                $( "#info" ).html('');
		        $( "#info" ).append("<div class='row'><span class='label'>Temp</span><span class='value'>"+data.main.temp+"</span></div>");
		        $( "#info" ).append("<div class='row'><span class='label'>Temp Max</span><span class='value'>"+data.main.temp_max+"</span></div>");
		        $( "#info" ).append("<div class='row'><span class='label'>Temp Min</span><span class='value'>"+data.main.temp_min+"</span></div>");
		        $( "#info" ).append("<div class='row'><span class='label'>Humidity</span><span class='value'>"+data.main.humidity+"</span></div>");
		        $( "#info" ).append("<div class='row'><span class='label'>Pressure</span><span class='value'>"+data.main.pressure+"</span></div>");
		      }
		    });
		  }
		});
	  }
    }
  };
}(jQuery));