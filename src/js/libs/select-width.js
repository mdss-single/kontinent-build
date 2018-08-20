$(function($, window){
	$.fn.resizeselect = function(settings) {  
		return this.each(function() { 
			$(this).change(function(){
				var $this = $(this);
				// create test element
				var text = $this.find("option:selected").text();
				var $test = $("<span style=\"font-size:"+$this.css("font-size")+"\">").html(text);
				// add to parent, get width, and get out
				$test.appendTo($this.parent());
				var width = $test.width();
				$test.remove();
				// set select width
				$this.width(width);
				// run on start
			}).change();
		});
	};
}(jQuery));