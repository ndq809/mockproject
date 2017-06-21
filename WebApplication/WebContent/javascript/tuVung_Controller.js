var slider, interval, time,selectedTab='#dangHoc';
function caiDat() {
	time = 4000;
	$("#mySlider1").AnimatedSlider({
		prevButton : "#btn_prev1",
		nextButton : "#btn_next1",
		visibleItems : 3,
		infiniteScroll : true,
		willChangeCallback : function(obj, item) {
			$("#statusText").text("Will change to " + item);
		},
		changedCallback : function(obj, item) {
			$("#statusText").text("Changed to " + item);
		}
	});
	slider = $("#mySlider1").data("AnimatedSlider");
	slider.setItem(0);
	var includes = $('.include');
	jQuery.each(includes, function() {
		var file = $(this).data('include') + '.jsp';
		$(this).load(file);
	});

	$('input[type=checkbox]').change(function() {
		var id = $(this).attr('id');
		if ($(this).is(":checked")) {
			// 'checked' event code
			$('.' + id + 'Div').show();

		} else {
			$('.' + id + 'Div').hide();
		}
		// Here do the stuff you want to do when 'unchecked'
	});

	$("#thoiGian").change(function() {
		$("#thoiGian option:selected").each(function() {

			time = $(this).val();
		});
	})
	chuyenTab(1);
}

function chonHinh(caller) {
	if ($('#hocBt').text().trim() == 'Tạm Dừng') {
		$('#hocBt').html('<span></span> Học Tự Động');
		$('#hocBt span').addClass('glyphicon glyphicon-play');
		clearInterval(interval);
	}
	var $liCollection = $(".listItems .subItems");
	var $firstListItem = $liCollection.first();
	var $activeListItem = $(".active1")
	var word = $(".active1").attr('id');
	$('#word' + word).removeClass("activeWord");
	$('#word' + word).addClass("noneActiveWord");

	$activeListItem.removeClass("active1");
	caller.parent('div').addClass("active1");
	var word = $(".active1").attr('id');
	$('#word' + word).removeClass("noneActiveWord");
	$('#word' + word).addClass("activeWord");
	if ($('#hinhAnh').is(":checked")) {
		// 'checked' event code

		slider.setItem(word - 1);

	}
	playAudio();
	activeWord();
};
function playWord() {
	var $liCollection = $(selectedTab+" .listItems .subItems");
	var $firstListItem = $liCollection.first();
	if ($('#hocBt').text().trim() == 'Học Tự Động') {
		$('#hocBt').html('<span></span>Tạm Dừng');
		$('#hocBt span').addClass('glyphicon glyphicon-pause');

		interval = setInterval(function() {
			var $activeListItem = $(".active1")
			var word = $(".active1").attr('id');
			$('#word' + word).removeClass("activeWord");
			$('#word' + word).addClass("noneActiveWord");

			$activeListItem.removeClass("active1");
			var $nextListItem = $activeListItem.next();
			if ($nextListItem.length == 0) {
				$nextListItem = $firstListItem;
			}
			$nextListItem.addClass("active1");
			var word = $(".active1").attr('id');
			$('#word' + word).removeClass("noneActiveWord");
			$('#word' + word).addClass("activeWord");
			if ($('#hinhAnh').is(":checked")) {
				// 'checked' event code

				slider.setItem(word - 1);

			}
			playAudio();
			activeWord();

		}, time);
	} else {
		$('#hocBt').html('<span></span> Học Tự Động');
		$('#hocBt span').addClass('glyphicon glyphicon-play');
		clearInterval(interval);
	}
}
function activeWord() {
	$('.activeWord').show();
	$('.noneActiveWord').hide();
}
function next() {
	if ($('#hocBt').text().trim() == 'Tạm Dừng') {
		$('#hocBt').html('<span></span> Học Tự Động');
		$('#hocBt span').addClass('glyphicon glyphicon-play');
		clearInterval(interval);
	}
	var $liCollection = $(selectedTab+" .listItems .show");
	var $firstListItem = $liCollection.first();
	var $activeListItem = $(".active1")
	var word = $(".active1").attr('id');
	$('#word' + word).removeClass("activeWord");
	$('#word' + word).addClass("noneActiveWord");

	$activeListItem.removeClass("active1");
	var $nextListItem ;
	for (var i = 0; i < $liCollection.length; i++) {
		if ($activeListItem.eq(0).attr('id') == $liCollection.eq(i).attr('id')) {
			if (i == $liCollection.length - 1)
				$nextListItem = $firstListItem;
			else
				$nextListItem = $liCollection.eq(i+1);
		}
	}
	$nextListItem.addClass("active1");
	var word = $(".active1").attr('id');
	$('#word' + word).removeClass("noneActiveWord");
	$('#word' + word).addClass("activeWord");
	if ($('#hinhAnh').is(":checked")) {
		// 'checked' event code

		slider.setItem(word - 1);

	}
	playAudio();
	activeWord();
}
function back() {
	if ($('#hocBt').text().trim() == 'Tạm Dừng') {
		$('#hocBt').html('<span></span> Học Tự Động');
		$('#hocBt span').addClass('glyphicon glyphicon-play');
		clearInterval(interval);
	}
	slider.prevItem();
	var $liCollection = $(selectedTab+" .listItems .show");
	var $lastListItem = $liCollection.last();
	var $activeListItem = $(".active1")
	var word = $(".active1").attr('id');
	$('#word' + word).removeClass("activeWord");
	$('#word' + word).addClass("noneActiveWord");

	$activeListItem.removeClass("active1");
	var $nextListItem ;
	for (var i = 0; i < $liCollection.length; i++) {
		if ($activeListItem.eq(0).attr('id') == $liCollection.eq(i).attr('id')) {
			if (i == 0)
				$nextListItem = $lastListItem;
			else
				$nextListItem = $liCollection.eq(i-1);
		}
	}
	$nextListItem.addClass("active1");
	var word = $(".active1").attr('id');
	$('#word' + word).removeClass("noneActiveWord");
	$('#word' + word).addClass("activeWord");
	if ($('#hinhAnh').is(":checked")) {
		// 'checked' event code

		slider.setItem(word - 1);

	}
	playAudio();
	activeWord();
}

function ghiNhomTV() {
	var dSNhomNP = $("#nhomTuVung option");
	if ($("#dMTuVung").val() == '0') {
		for (var i = 0; i < dSNhomNP.length; i++) {
			dSNhomNP.eq(i).addClass("show");
			dSNhomNP.eq(i).removeClass("unShow");
		}
	} else {
		for (var j = 1; j < dSNhomNP.length; j++) {
			var x = dSNhomNP.eq(j).attr('class').split(' ');
			if (x[0] == $("#dMTuVung").val().trim()) {
				dSNhomNP.eq(j).addClass("show");
				dSNhomNP.eq(j).removeClass("unShow");
			} else {
				dSNhomNP.eq(j).addClass("unShow");
				dSNhomNP.eq(j).removeClass("show");
			}
		}
	}
	$("#nhomTuVung").val('0');
	$(".show").show();
	$(".unShow").hide();
}

function ghiBaiVietTV() {
	var dSBaiVietNP = $(selectedTab+" .listItems .subItems");
	if ($("#nhomTuVung").val() == '0' && $("#dMTuVung").val() == '0') {
		for (var i = 0; i < dSBaiVietNP.length; i++) {
			dSBaiVietNP.eq(i).addClass("show");
			dSBaiVietNP.eq(i).removeClass("unShow");
		}
	} else {
		if ($("#nhomTuVung").val() == '0') {
			var dSOption = $("#nhomTuVung .show");
			for (var i = 0; i < dSBaiVietNP.length; i++) {
				dSBaiVietNP.eq(i).addClass("unShow");
				dSBaiVietNP.eq(i).removeClass("show");
			}
			for (var k = 1; k < dSOption.length; k++) {
				var optionClass = dSOption.eq(k).val();
				for (var n = 0; n < dSBaiVietNP.length; n++) {
					var wordClass = dSBaiVietNP.eq(n).attr('class').split(' ');
					if (optionClass == wordClass[0]) {
						dSBaiVietNP.eq(n).addClass("show");
						dSBaiVietNP.eq(n).removeClass("unShow");
					}
				}
			}
		} else {
			for (var j = 0; j < dSBaiVietNP.length; j++) {
				var x = dSBaiVietNP.eq(j).attr('class').split(' ');
				if (x[0] == $("#nhomTuVung").val().trim()) {
					dSBaiVietNP.eq(j).addClass("show");
					dSBaiVietNP.eq(j).removeClass("unShow");
				} else {
					dSBaiVietNP.eq(j).addClass("unShow");
					dSBaiVietNP.eq(j).removeClass("show");
				}
			}
		}
	}
	$(".show").show();
	$(".unShow").hide();
	var $liCollection = $(selectedTab+" .listItems .show");
	var $firstListItem = $liCollection.first();
	var $activeListItem = $(".active1");
	var word = $(".active1").attr('id');
	$('#word' + word).removeClass("activeWord");
	$('#word' + word).addClass("noneActiveWord");

	$activeListItem.removeClass("active1");
	$firstListItem.addClass("active1");
	var word = $(".active1").attr('id');
	$('#word' + word).removeClass("noneActiveWord");
	$('#word' + word).addClass("activeWord");
	if ($('#hinhAnh').is(":checked")) {
		// 'checked' event code

		slider.setItem(word - 1);

	}
	activeWord();
	playAudio();
	
}

function playAudio(){
	if ($('#amThanh').is(":checked")) {
		// 'checked' event code

		var fileNghe = $('.activeWord .fileNghe')[0]; 
		fileNghe.play();

	}
}

function luuTuVungDaThuoc(maTuVung){
	$.ajax({
		type : "POST",
		url : "luu-tu-vung-da-thuoc.action",
		dataType: "json",
		data : {
			maTuVung : maTuVung
		},
		beforeSend : function() {
			$("#while-load").show();
		},
		success : function(response){
			alert("Đã thêm vào danh sách từ vựng đã thuộc");
			$("#"+maTuVung).remove();
			$("#daThuoc .listItems").prepend("<div class='"+response.tuVungTiengAnh.maNhomTuVung+" subItems show' id='"+response.tuVungTiengAnh.maTuVung+"'></div>");
			$("#"+maTuVung).append("<span class='glyphicon glyphicon-fire' style='color: red; margin-right: 5px'> </span>");
			$("#"+maTuVung).append("<a onclick='chonHinh($(this));'>"+response.tuVungTiengAnh.tenTuVung+"</a>");
			$("#"+maTuVung).append("<button class='btn btn-default' style='padding: 1px 4px; float: right;' onclick=xoaTuVungDaThuoc('"+response.tuVungTiengAnh.maTuVung+"');>Đã quên</button>");
			$("#"+maTuVung).append("<div class='col-lg-12' style='margin-bottom: 20px'></div>");
			$("#"+maTuVung).append("<div class='col-lg-12' style='border-bottom-style: dotted; margin-bottom: 20px;'></div>");
			$("#while-load").hide();
		},
		error : function(errormessage){
			alert("Thêm từ vựng đã thuộc lỗi xin thử lại!!!");
		}
	});	
}

function xoaTuVungDaThuoc(maTuVung){
	$.ajax({
		type : "POST",
		url : "xoa-tu-vung-da-thuoc.action",
		dataType: "json",
		data : {
			maTuVung : maTuVung
		},
		beforeSend : function() {
			$("#while-load").show();
		},
		success : function(response){
			alert("Đã xóa khỏi danh sách từ vựng đã thuộc");
			$("#"+maTuVung).remove();
			$("#dangHoc .listItems").prepend("<div class='"+response.tuVungTiengAnh.maNhomTuVung+" subItems show' id='"+response.tuVungTiengAnh.maTuVung+"'></div>");
			$("#"+maTuVung).append("<span class='glyphicon glyphicon-fire' style='color: red; margin-right: 5px'> </span>");
			$("#"+maTuVung).append("<a onclick='chonHinh($(this));'>"+response.tuVungTiengAnh.tenTuVung+"</a>");
			$("#"+maTuVung).append("<button class='btn btn-default' style='padding: 1px 4px; float: right;' onclick=luuTuVungDaThuoc('"+response.tuVungTiengAnh.maTuVung+"');>Đã thuộc</button>");
			$("#"+maTuVung).append("<div class='col-lg-12' style='margin-bottom: 20px'></div>");
			$("#"+maTuVung).append("<div class='col-lg-12' style='border-bottom-style: dotted; margin-bottom: 20px;'></div>");
			$("#while-load").hide();
		},
		error : function(errormessage){
			alert("xóa từ vựng đã thuộc lỗi xin thử lại!!!");
		}
	});	
}

function chuyenTab(selectedTabNumber){
	if(selectedTabNumber==1)
		selectedTab="#dangHoc";
	else
		selectedTab="#daThuoc";
	var $liCollection = $(selectedTab+" .listItems .show");
	var $firstListItem = $liCollection.first();
	var $activeListItem = $(".active1");
	var word = $(".active1").attr('id');
	$('#word' + word).removeClass("activeWord");
	$('#word' + word).addClass("noneActiveWord");
	$activeListItem.removeClass("active1");
	$firstListItem.addClass("active1");
	var word = $(".active1").attr('id');
	$('#word' + word).removeClass("noneActiveWord");
	$('#word' + word).addClass("activeWord");
	if ($('#hinhAnh').is(":checked")) {
		// 'checked' event code
		slider.setItem(word - 1);

	}
	activeWord();
	playAudio();
}