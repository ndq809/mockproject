var seft,selectedTab='#dangHoc';
function caiDat(ngheObj) {
	activeSong();
	seft=ngheObj;
	$('.jp-playlist').hide();
	chuyenTab(1);
}
function playSong(n) {
	seft.play(n);
}
function nextSong() {
	var $liCollection = $( selectedTab+" .listItems .show");
	var $firstListItem = $liCollection.first();
	var $activeListItem = $(".active1")
	var song=$(".active1").attr('id');
	$('#song'+song).removeClass("activeSong");
	$('#song'+song).addClass("noneActiveSong");
	
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
	var song=$(".active1").attr('id');
	$('#song'+song).removeClass("noneActiveSong");
	$('#song'+song).addClass("activeSong");
	activeSong();
	seft.play(song-1);
}
function prevSong() {
	var $liCollection = $(selectedTab+" .listItems .show");
	var $lastListItem = $liCollection.last();
	var $activeListItem = $(".active1")
	var song=$(".active1").attr('id');
	
	$('#song'+song).removeClass("activeSong");
	$('#song'+song).addClass("noneActiveSong");
	
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
	var song=$(".active1").attr('id');
	$('#song'+song).removeClass("noneActiveSong");
	$('#song'+song).addClass("activeSong");
	activeSong();
	seft.play(song-1);
	
}
function selectSong(caller) {
	var $liCollection = $(selectedTab+" .listItems .show");
	var $firstListItem = $liCollection.first();
	var $activeListItem = $(".active1")
	var song=$(".active1").attr('id');
	$('#song'+song).removeClass("activeSong");
	$('#song'+song).addClass("noneActiveSong");
	
	$activeListItem.removeClass("active1");
	caller.parent('div').addClass("active1");
	var song=$(".active1").attr('id');
	$('#song'+song).removeClass("noneActiveSong");
	$('#song'+song).addClass("activeSong");
		
	seft.play(song-1);

	activeSong();
}
function activeSong() {
	$('.activeSong').show();
	$('.noneActiveSong').hide();
	$("#dapAnHeThong").text("");
	$("#dapAnCuaBan").text("");
}

function ghiBaiNghe() {
	var dSBaiNghe = $(".listItems .subItems");
	if ($("#doKhoBaiNghe").val() == '0') {
		for (var i = 0; i < dSBaiNghe.length; i++) {
			dSBaiNghe.eq(i).addClass("show");
			dSBaiNghe.eq(i).removeClass("unShow");
		}
	} else {
		for (var j = 0; j < dSBaiNghe.length; j++) {
			var x = dSBaiNghe.eq(j).attr('class').split(' ');
			if (x[0] == $("#doKhoBaiNghe").val().trim()) {
				dSBaiNghe.eq(j).addClass("show");
				dSBaiNghe.eq(j).removeClass("unShow");
			} else {
				dSBaiNghe.eq(j).addClass("unShow");
				dSBaiNghe.eq(j).removeClass("show");
			}
		}
	}
	$(".show").show();
	$(".unShow").hide();
	var $liCollection = $(selectedTab+" .listItems .show");
	var $firstListItem = $liCollection.first();
	var $activeListItem = $(".active1");
	$activeListItem.removeClass("active1");
	$firstListItem.addClass("active1");
	activeSong();
	var song=$firstListItem.attr('id');
	seft.play(song-1);
}

function kiemTraDapAn(){
	var dem=0;
	var song=$(".active1").attr('id');
	var dapAnCuaBan=$("#dapAnCuaBan").text().trim().split(" ");
	var dapAnHeThong=$("#noiDung"+song).val().trim().split(" ");
	for(var i=0;i<dapAnCuaBan.length;i++){
		for(var j=0;j<dapAnHeThong.length;j++){
			if(dapAnCuaBan[i].toLowerCase()==dapAnHeThong[j].toLowerCase()){
				dem++;
				break;
			}
		}
	}
	var phanTram=Math.floor((dem/dapAnHeThong.length)*100);
	$("#ketQuaNghe").text("");
	$("#ketQuaNghe").text("Bạn đã nghe được "+phanTram+"% của bài nghe");
	
}

function xemDapAn(){
	var song=$(".active1").attr('id');
	$("#dapAnHeThong").text($("#noiDung"+song).val());
	$("#xemDapAn").modal("hide");
}

function chuyenTab(selectedTabNumber){
	if(selectedTabNumber==1)
		selectedTab="#dangHoc";
	else
		selectedTab="#daThuoc";
	var $liCollection = $(selectedTab+" .listItems .show");
	var $firstListItem = $liCollection.first();
	var $activeListItem = $(".active1")
	var song=$(".active1").attr('id');
	$('#song'+song).removeClass("activeSong");
	$('#song'+song).addClass("noneActiveSong");
	
	$activeListItem.removeClass("active1");
	$firstListItem.addClass("active1");
	var song=$(".active1").attr('id');
	$('#song'+song).removeClass("noneActiveSong");
	$('#song'+song).addClass("activeSong");
		
	seft.play(song-1);

	activeSong();
}

function luuBaiNgheDaNghe(maBaiNghe){
	$.ajax({
		type : "POST",
		url : "luu-bai-nghe-da-nghe.action",
		dataType: "json",
		data : {
			maBaiNghe : maBaiNghe
		},
		beforeSend : function() {
			$("#while-load").show();
		},
		success : function(response){
			alert("Đã thêm vào danh sách bài nghe đã nghe");
			$("#"+maBaiNghe).remove();
			$("#daThuoc .listItems").prepend("<div class='"+response.baiNgheTiengAnh.maDoKhoBN+" subItems show' id='"+response.baiNgheTiengAnh.maBaiNghe+"'></div>");
			$("#"+maBaiNghe).append("<span class='glyphicon glyphicon-fire' style='color: red; margin-right: 5px'> </span>");
			$("#"+maBaiNghe).append("<a onclick='selectSong($(this));'>"+response.baiNgheTiengAnh.tenBaiNghe+"</a>");
			$("#"+maBaiNghe).append("<button class='btn btn-default' style='padding: 1px 4px; float: right;' onclick=xoaBaiNgheDaNghe('"+response.baiNgheTiengAnh.maBaiNghe+"');>Đã quên</button>");
			$("#"+maBaiNghe).append("<div class='col-lg-12' style='margin-bottom: 20px'></div>");
			$("#"+maBaiNghe).append("<div class='col-lg-12' style='border-bottom-style: dotted; margin-bottom: 20px;'></div>");
			$("#while-load").hide();
		},
		error : function(errormessage){
			alert("Thêm bài nghe đã nghe lỗi xin thử lại!!!");
		}
	});	
}

function xoaBaiNgheDaNghe(maBaiNghe){
	$.ajax({
		type : "POST",
		url : "xoa-bai-nghe-da-nghe.action",
		dataType: "json",
		data : {
			maBaiNghe : maBaiNghe
		},
		beforeSend : function() {
			$("#while-load").show();
		},
		success : function(response){
			alert("Đã xóa khỏi danh sách bài nghe đã nghe");
			$("#"+maBaiNghe).remove();
			$("#dangHoc .listItems").prepend("<div class='"+response.baiNgheTiengAnh.maDoKhoBN+" subItems show' id='"+response.baiNgheTiengAnh.maBaiNghe+"'></div>");
			$("#"+maBaiNghe).append("<span class='glyphicon glyphicon-fire' style='color: red; margin-right: 5px'> </span>");
			$("#"+maBaiNghe).append("<a onclick='selectSong($(this));'>"+response.baiNgheTiengAnh.tenBaiNghe+"</a>");
			$("#"+maBaiNghe).append("<button class='btn btn-default' style='padding: 1px 4px; float: right;' onclick=luuBaiNgheDaNghe('"+response.baiNgheTiengAnh.maBaiNghe+"');>Đã thuộc</button>");
			$("#"+maBaiNghe).append("<div class='col-lg-12' style='margin-bottom: 20px'></div>");
			$("#"+maBaiNghe).append("<div class='col-lg-12' style='border-bottom-style: dotted; margin-bottom: 20px;'></div>");
			$("#while-load").hide();
		},
		error : function(errormessage){
			alert("xóa bài nghe đã nghe lỗi xin thử lại!!!");
		}
	});	
}
