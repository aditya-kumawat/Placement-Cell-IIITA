$(document).ready(function() {

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
	
	$(document).on("click",function(e){
		if(isMenuOpen || isMenuIconOpen){
			if(e.target.className == "menu-list-items" || e.target.className == "scroller" || e.target.className == "menu-trigger") return
				console.log(e.target);
			if(isMenuIconOpen){
				$menuWrapper.removeClass("open-part");
				isMenuIconOpen = false;
			}
			if(isMenuOpen){
				$menuWrapper.removeClass("open-all");
				isMenuOpen = false;
			}
		}
	});

})