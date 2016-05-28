$(document).ready(function() {

	navbarOperations();
	$('.slider').slider();
	$('.materialboxed').materialbox();
	if($("#course_overview")){
		coursesOperations();
	}

	try{
		if(!google){
			throw new Error('google not defined');
		}
		else{
			if($("#reach_us_map #map"))
				mapInit();
		}
	}
	catch(e){
	}

	try{
		if(!d3){
			throw new Error('google not defined');
		}
		else{
			if($(".demographics")){
				var ugDataset = [
					{label: "IT", count : 282},
					{label: "ECE", count : 91}
				];

				var pgDataset = [
					{label: "CLIS", count : 11},
					{label: "SE", count : 10},
					{label: "Bioinformatics", count : 6},
					{label: "IS", count : 9},
					{label: "Robotics", count : 7},
					{label: "HCI", count : 8},
					{label: "WCC", count : 12},
					{label: "Microelectronics", count : 10}
				];
				demographicsInit(ugDataset, "#ug_demographics .svg-wrapper");
				demographicsInit(pgDataset, "#pg_demographics .svg-wrapper");
			}
		}
	}
	catch(e){
	}
});

function navbarOperations(){
	var $menuTrigger = $(".menu-trigger "),
		$menuWrapper = $(".menu-wrapper"),
		isMenuIconOpen = false,
		isMenuOpen = false;

	$menuTrigger.on("mouseover",function(e){
		if(!isMenuIconOpen && !isMenuOpen){
			$menuWrapper.addClass("open-part");
			isMenuIconOpen = true;
		}
	});

	$menuTrigger.on("click",function(e){
		if(!isMenuIconOpen && !isMenuOpen){
			$menuWrapper.addClass("open-part")
			isMenuIconOpen = true;
		}
		else{
			if(isMenuOpen){
				$menuWrapper.removeClass("open-all");
				isMenuOpen = false;
			}
			else{
				$menuWrapper.addClass("open-all");
				isMenuOpen = true;
				$menuWrapper.removeClass("open-part");
				isMenuIconOpen = false;
			}
			$("li.menu-list-items.show-submenu-body")
				.removeClass("show-submenu-body")
				.find(".submenu-body")
				.slideToggle();
		}
		e.stopPropagation();
	});

	$menuWrapper.on("mouseover",function(){
		if(!isMenuOpen){
			$menuWrapper.addClass("open-all");
			isMenuOpen = true;
			$menuWrapper.removeClass("open-part");
			isMenuIconOpen = false;
		}
	});

	//Currently not needed.
	// $menuWrapper.on("mouseout",function(){
	// 	if(isMenuOpen){
	// 		$menuWrapper.removeClass("open-all");
	// 		isMenuOpen = false;
	// 	}
	// });

	$(".menu-list-items a,.menu-list-items i").on("click",function(e){
		e.stopPropagation();
	})
	
	var $menuListItems = $("li.menu-list-items"),
		$submenuHeadAnchors = $("li.menu-list-items > .submenu-head > a");
		
	$submenuHeadAnchors.on("click",function(e){

		if($(this).closest(".menu-list-items").hasClass("show-submenu-body")){
			$("li.menu-list-items.show-submenu-body")
				.removeClass("show-submenu-body")
				.find(".submenu-body")
				.slideToggle();			
			return;
		}

		$("li.menu-list-items.show-submenu-body")
			.removeClass("show-submenu-body")
			.find(".submenu-body")
			.slideToggle();

		if($(this).closest(".menu-list-items").children().length != 1 ){
			$(this).closest(".menu-list-items").addClass("show-submenu-body")
					.find(".submenu-body").slideToggle();
		}
	})

	$(document).on("click",function(e){
		if(isMenuOpen || isMenuIconOpen){
			if(e.target.className == "submenu-head" || e.target.className == "scroller" || e.target.className == "menu-trigger") return;
			if(isMenuIconOpen){
				$menuWrapper.removeClass("open-part");
				isMenuIconOpen = false;
			}
			if(isMenuOpen){
				$menuWrapper.removeClass("open-all");
				isMenuOpen = false;
			}
			$("li.menu-list-items.show-submenu-body")
				.removeClass("show-submenu-body")
				.find(".submenu-body")
				.slideToggle();
		}
	});
}

function coursesOperations(){
	var $toggleCourseBodies = $(".course-head");
	$toggleCourseBodies.on("click",function(e){
		$(this)
			.closest(".course-container")
			.toggleClass("course-body-open")
			.toggleClass("course-body-closed")
			.find(".course-body")
			.slideToggle("slow");
	});

}

function mapInit(){
	myCenter = new google.maps.LatLng(25.431487, 81.771044);
	var map = new google.maps.Map(document.getElementById('map'), {
	    center: myCenter,
    	zoom: 14,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
  	});
  	var marker=new google.maps.Marker({
		position:myCenter,
	});
	marker.setMap(map);
}

function demographicsInit(arr, target){

	function returnDataSet(arr){
		var t = [];
		var total = 0;
		arr.forEach(function(el, i){
			total += el.count;
		});

		arr.forEach(function(el, i){
			var o = {};
			o.label = el.label;
			o.count = el.count * 100/ total;
			t.push(o); 
		});
		console.log(t);
		return t;
	}

    var width = 420;
    var height = 420;
    var radius = Math.min(width, height) / 2;
	var donutWidth = 75;
	var legendRectSize = 18;
	var legendSpacing = 1;  

    var color = d3.scale.category20b();

    var svg = d3.select(target)
	            .append('svg')
	            .attr('width', width)
	            .attr('height', height)
	            .append('g')
	            .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    var arc = d3.svg.arc()
	            .innerRadius(radius - donutWidth)
	            .outerRadius(radius);

    var pie = d3.layout.pie()
		        .value(function(d) { return d.count; })
		        .sort(null);

    var path = svg.selectAll('path')
		          .data(pie(returnDataSet(arr)))
		          .enter()
		          .append('path')
		          .attr('d', arc)
		          .attr('fill', function(d, i) { 
		        	  return color(d.data.label);
		          });

    var legend = svg.selectAll('.legend')
		            .data(color.domain())
		            .enter()      
		            .append('g') 
		            .attr('class', 'legend')                           
		            .attr('transform', function(d, i) {                
		            	var height = legendRectSize + legendSpacing;     
			            var offset =  height * color.domain().length / 2;
			            var horz = -2 * legendRectSize;                  
			            var vert = i * height - offset;                  
			            return 'translate(' + horz + ',' + vert + ')';   
		          	});                                                

    legend.append('rect')                                
	      .attr('width', legendRectSize)                     
	      .attr('height', legendRectSize)                    
	      .style('fill', color)                              
	      .style('stroke', color);                           
          
    legend.append('text')                                
          .attr('x', legendRectSize + legendSpacing)         
          .attr('y', legendRectSize - legendSpacing)         
          .text(function(d) { return d; });   
}