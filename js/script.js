$(document).ready(function() {

	navbarOperations();
	$('.slider').slider();
	$('.materialboxed').materialbox();
	if($("#course_overview")){
		coursesOperations();
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
			$("li.menu-list-items.show-submenu-body").removeClass("show-submenu-body");
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