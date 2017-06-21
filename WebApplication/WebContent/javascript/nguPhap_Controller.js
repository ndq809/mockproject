var seft,selectedTab='#dangHoc';
$(function() {
	var $liCollection = $(selectedTab+" .listItems .subItems");
	var $firstListItem = $liCollection.first();
	$firstListItem.addClass("active1");
	activenp();
	chuyenTab(1);
});
function nextNP() {
	var $liCollection = $(selectedTab+" .listItems .show");
	var $firstListItem = $liCollection.first();
	var $activeListItem = $(".active1")
	var maBaiViet=$("#maBaiViet").val();
	maBaiViet++;
	var np=$(".active1").attr('id');
	$('#np'+np).removeClass("activenp");
	$('#np'+np).addClass("noneActivenp");
	
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
	var np=$(".active1").attr('id');
	$('#np'+np).removeClass("noneActivenp");
	$('#np'+np).addClass("activenp");
	activenp();
	getBaiVietNP("'"+np+"'");
}
function prevNP() {
	var $liCollection = $(selectedTab+" .listItems .show");
	var $lastListItem = $liCollection.last();
	var $activeListItem = $(".active1")
	var np=$(".active1").attr('id');
	
	$('#np'+np).removeClass("activenp");
	$('#np'+np).addClass("noneActivenp");
	
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
	var np=$(".active1").attr('id');
	$('#np'+np).removeClass("noneActivenp");
	$('#np'+np).addClass("activenp");
	activenp();
	getBaiVietNP("'"+np+"'");
	
}
function selectNP(caller) {
	var $liCollection = $( selectedTab+" .listItems .show");
	var $firstListItem = $liCollection.first();
	var $activeListItem = $(".active1")
	var np=$(".active1").attr('id');
	$('#np'+np).removeClass("activenp");
	$('#np'+np).addClass("noneActivenp");
	
	$activeListItem.removeClass("active1");
	caller.parent('div').addClass("active1");
	var np=$(".active1").attr('id');
	$('#np'+np).removeClass("noneActivenp");
	$('#np'+np).addClass("activenp");
		
	getBaiVietNP("'"+np+"'");

	activenp();
}
function activenp() {
	$('.activenp').show();
	$('.noneActivenp').hide();
}

function ghiNhomNP() {
	var dSNhomNP = $("#nhomNguPhap option");
	if ($("#dMNguPhap").val() == '0') {
		for (var i = 1; i < dSNhomNP.length; i++) {
			dSNhomNP.eq(i).addClass("show");
			dSNhomNP.eq(i).removeClass("unShow");
		}
	} else {
		for (var j = 1; j < dSNhomNP.length; j++) {
			var x = dSNhomNP.eq(j).attr('class').split(' ');
			if (x[0] == $("#dMNguPhap").val().trim()) {
				dSNhomNP.eq(j).addClass("show");
				dSNhomNP.eq(j).removeClass("unShow");
			} else {
				dSNhomNP.eq(j).addClass("unShow");
				dSNhomNP.eq(j).removeClass("show");
			}
		}
	}
	$("#nhomNguPhap").val('0');
	$(".show").show();
	$(".unShow").hide();
}

function ghiBaiVietNP() {
	var dSBaiVietNP = $(".listItems .subItems");
	if ($("#nhomNguPhap").val() == '0' && $("#dMNguPhap").val() == '0') {
		for (var i = 0; i < dSBaiVietNP.length; i++) {
			dSBaiVietNP.eq(i).addClass("show");
			dSBaiVietNP.eq(i).removeClass("unShow");
		}
	} else {
		if ($("#nhomNguPhap").val() == '0') {
			var dSOption = $("#nhomNguPhap .show");
			for (var i = 0; i < dSBaiVietNP.length; i++) {
				dSBaiVietNP.eq(i).addClass("unShow");
				dSBaiVietNP.eq(i).removeClass("show");
			}
			for (var k = 0; k < dSOption.length; k++) {
				var optionClass = dSOption.eq(k).val();
				for (var n = 0; n < dSBaiVietNP.length; n++) {
					var wordClass = dSBaiVietNP.eq(n).attr('class').split(' ');
					if (optionClass == wordClass[0]) {
						dSBaiVietNP.eq(n).addClass("show");
						dSBaiVietNP.eq(n).removeClass("unShow");
					}
				}
			}
		}
		else{
		for (var j = 0; j < dSBaiVietNP.length; j++) {
			var x = dSBaiVietNP.eq(j).attr('class').split(' ');
			if (x[0] == $("#nhomNguPhap").val().trim()) {
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
	$activeListItem.removeClass("active1");
	$firstListItem.addClass("active1");
	activenp();
	var maBaiViet=$firstListItem.attr('id');
	getBaiVietNP("'"+maBaiViet+"'");
}

function getBaiVietNP(id) {
	$('#tieuDeNP').html("");
	$('#noiDungNP').html("");
	$.ajax({
		url : "lay-noi-dung-bai-viet.action",
		type : "post",
		dataType: "json",
		data : {
			maNguPhap : id
		},
		beforeSend : function() {
			$("#while-load").show();
		},
		success : function(result) {
			var baiViet=result.baiVietNguPhap;
			$('#tieuDeNP').append(baiViet.tenBaiViet);
			$('#noiDungNP').append(baiViet.noiDungBaiViet);
			$('#maBaiViet').val(baiViet.maBaiVietNP);
			var np=$(".active1").attr('id');
			getBinhLuanNguPhap(np);
			$("#while-load").attr("style", "display: none;");
		},
		error : function(xhr, status, error) {
			$("#loi").modal("show");
			
		}
	});
	
}

function getBinhLuanNguPhap(id){
	$('#commentList').html("");
	$.ajax({
		url : "lay-binh-luan-ngu-phap.action",
		type : "post",
		dataType: "json",
		data : {
			maBaiViet : id
		},
		beforeSend : function() {
			$("#while-load").show();
		},
		success : function(result) {
			var dSBinhLuan=result.DSBinhLuan;
			for(var i=0;i<dSBinhLuan.length;i++){
				var maBinhLuan=dSBinhLuan[i].maBinhLuan;
			$('#commentList').prepend("<li id='bl"+maBinhLuan+"'></li>");
			$('#bl'+maBinhLuan).append("<div class='commenterImage'></div>");
			$('#bl'+maBinhLuan+" .commenterImage").append("<img src='images/"+dSBinhLuan[i].anhDaiDienTV+"'/>");
			$('#bl'+maBinhLuan).append("<div class='commentText'></div>");
			$('#bl'+maBinhLuan+" .commentText").append("<p>"+dSBinhLuan[i].noiDungBinhluan+"</p>");
			$('#bl'+maBinhLuan+" .commentText").append("<span class='date sub-text'>"+dSBinhLuan[i].ngayBinhLuan+"</span>");
			$("#while-load").attr("style", "display: none;");
			}
		},
		error : function(xhr, status, error) {
			$("#loi").modal("show");
			
		}
	});
}

function setBinhLuanNguPhap(){
	var np=$(".active1").attr('id');
	var noiDungBinhLuan=$("#noiDungBL").val();
	$( "#btBinhLuan" ).prop( "disabled", true );
	$.ajax({
		url : "them-binh-luan-ngu-phap.action",
		type : "post",
		dataType: "json",
		data : {
			maBaiViet : np,
			noiDungBinhLuan : noiDungBinhLuan
		},
		beforeSend : function() {
			$("#while-load").show();
		},
		success : function(result) {
			var binhLuan=result.binhLuan;
				var maBinhLuan=binhLuan.maBinhLuan;
			$('#commentList').prepend("<li id='bl"+maBinhLuan+"'></li>");
			$('#bl'+maBinhLuan).append("<div class='commenterImage'></div>");
			$('#bl'+maBinhLuan+" .commenterImage").append("<img src='images/"+binhLuan.anhDaiDienTV+"'/>");
			$('#bl'+maBinhLuan).append("<div class='commentText'></div>");
			$('#bl'+maBinhLuan+" .commentText").append("<p>"+binhLuan.noiDungBinhluan+"</p>");
			$('#bl'+maBinhLuan+" .commentText").append("<span class='date sub-text'>"+binhLuan.ngayBinhLuan+"</span>");
			$("#noiDungBL").val("");
			$( "#btBinhLuan" ).prop( "disabled", false );
			$("#while-load").attr("style", "display: none;");
		},
		error : function(xhr, status, error) {
			$("#loi").modal("show");
			
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
	
	$activeListItem.removeClass("active1");
	$firstListItem.addClass("active1");
	var np=$(".active1").attr('id');
	getBaiVietNP("'"+np+"'");

	activenp();
}

function luuNguPhapDaHoc(maNguPhap){
	$.ajax({
		type : "POST",
		url : "luu-ngu-phap-da-hoc.action",
		dataType: "json",
		data : {
			maNguPhap : maNguPhap
		},
		beforeSend : function() {
			$("#while-load").show();
		},
		success : function(response){
			alert("Đã thêm vào danh sách ngữ pháp đã học");
			$("#"+maNguPhap).remove();
			$("#daThuoc .listItems").prepend("<div class='"+response.baiVietNguPhap.maNhomNP+" subItems show' id='"+response.baiVietNguPhap.maBaiVietNP+"'></div>");
			$("#"+maNguPhap).append("<span class='glyphicon glyphicon-fire' style='color: red; margin-right: 5px'> </span>");
			$("#"+maNguPhap).append("<a onclick='selectNP($(this));'>"+response.baiVietNguPhap.tenBaiViet+"</a>");
			$("#"+maNguPhap).append("<button class='btn btn-default' style='padding: 1px 4px; float: right;' onclick=xoaNguPhapDaHoc('"+response.baiVietNguPhap.maBaiVietNP+"');>Đã quên</button>");
			$("#"+maNguPhap).append("<div class='col-lg-12' style='margin-bottom: 20px'></div>");
			$("#"+maNguPhap).append("<div class='col-lg-12' style='border-bottom-style: dotted; margin-bottom: 20px;'></div>");
			$("#while-load").hide();
		},
		error : function(errormessage){
			alert("Thêm ngữ pháp đã học lỗi xin thử lại!!!");
		}
	});	
}

function xoaNguPhapDaHoc(maNguPhap){
	$.ajax({
		type : "POST",
		url : "xoa-ngu-phap-da-hoc.action",
		dataType: "json",
		data : {
			maNguPhap : maNguPhap
		},
		beforeSend : function() {
			$("#while-load").show();
		},
		success : function(response){
			alert("Đã xóa khỏi danh sách ngữ pháp đã học");
			$("#"+maNguPhap).remove();
			$("#dangHoc .listItems").prepend("<div class='"+response.baiVietNguPhap.maNhomNP+" subItems show' id='"+response.baiVietNguPhap.maBaiVietNP+"'></div>");
			$("#"+maNguPhap).append("<span class='glyphicon glyphicon-fire' style='color: red; margin-right: 5px'> </span>");
			$("#"+maNguPhap).append("<a onclick='selectNP($(this));'>"+response.baiVietNguPhap.tenBaiViet+"</a>");
			$("#"+maNguPhap).append("<button class='btn btn-default' style='padding: 1px 4px; float: right;' onclick=luuNguPhapDaHoc('"+response.baiVietNguPhap.maBaiVietNP+"');>Đã thuộc</button>");
			$("#"+maNguPhap).append("<div class='col-lg-12' style='margin-bottom: 20px'></div>");
			$("#"+maNguPhap).append("<div class='col-lg-12' style='border-bottom-style: dotted; margin-bottom: 20px;'></div>");
			$("#while-load").hide();
		},
		error : function(errormessage){
			alert("xóa ngữ pháp đã học lỗi xin thử lại!!!");
		}
	});	
}
