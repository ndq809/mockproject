var seft;
var DSNguPhapGoiY,selectedTab='#dangHoc';;
$(function() {
	var $liCollection = $(".listItems .subItems");
	var $firstListItem = $liCollection.first();
	$firstListItem.addClass("active1");
	activebv();
	 $("#luuBaiViet").click(function(){
		 $("#chiaSe").val($('input[name=xacNhan]:checked').val());
	        $("#baiVietThanhVien").submit();
	    });
});
function nextbv() {
	var $liCollection = $(".listItems .show");
	var $firstListItem = $liCollection.first();
	var $activeListItem = $(".active1");

	var $nextListItem;
	var bv = $(".active1").attr('id');
	$('#bv' + bv).removeClass("activebv");
	$('#bv' + bv).addClass("noneActivebv");
	for (var i = 0; i < $liCollection.length; i++) {
		if ($activeListItem.eq(0).attr('id') == $liCollection.eq(i).attr('id')) {
			if (i == $liCollection.length - 1)
				$nextListItem = $firstListItem;
			else
				$nextListItem = $liCollection.eq(i+1);
		}
	}
	$activeListItem.removeClass("active1");

	$nextListItem.addClass("active1");
	var bv = $(".active1").attr('id');
	$('#bv' + bv).removeClass("noneActivebv");
	$('#bv' + bv).addClass("activebv");
	activebv();
	getBaiViet("'" + bv + "'");
}
function prevbv() {
	var $liCollection = $(".listItems .show");
	var $lastListItem = $liCollection.last();
	var $activeListItem = $(".active1")
	var bv = $(".active1").attr('id');
	
		$('#bv' + bv).removeClass("activebv");
		$('#bv' + bv).addClass("noneActivebv");

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
		var bv = $(".active1").attr('id');
		$('#bv' + bv).removeClass("noneActivebv");
		$('#bv' + bv).addClass("activebv");
		activebv();
		getBaiViet("'" + bv + "'");
	
}
function selectbv(caller) {
	var $liCollection = $(".listItems .show");
	var $firstListItem = $liCollection.first();
	var $activeListItem = $(".active1")
	var bv = $(".active1").attr('id');
	$('#bv' + bv).removeClass("activebv");
	$('#bv' + bv).addClass("noneActivebv");

	$activeListItem.removeClass("active1");
	caller.parent('div').addClass("active1");
	var bv = $(".active1").attr('id');
	$('#bv' + bv).removeClass("noneActivebv");
	$('#bv' + bv).addClass("activebv");

	getBaiViet("'" + bv + "'");

	activebv();
}
function activebv() {
	$('.activebv').show();
	$('.noneActivebv').hide();
}

function ghiNhombv() {
	var dSNhombv = $("#nhomBaiViet option");
	if ($("#doKhoBaiViet").val() == '0') {
		for (var i = 1; i < dSNhombv.length; i++) {
			dSNhombv.eq(i).addClass("show");
			dSNhombv.eq(i).removeClass("unShow");
		}
	} else {
		for (var j = 1; j < dSNhombv.length; j++) {
			var x = dSNhombv.eq(j).attr('class').split(' ');
			if (x[0] == $("#doKhoBaiViet").val().trim()) {
				dSNhombv.eq(j).addClass("show");
				dSNhombv.eq(j).removeClass("unShow");
			} else {
				dSNhombv.eq(j).addClass("unShow");
				dSNhombv.eq(j).removeClass("show");
			}
		}
	}
	$("#nhomBaiViet").val('0');
	$(".show").show();
	$(".unShow").hide();
}

function ghiBaiViet() {
	var dSBaiVietNP = $(".listItems .subItems");
	if ($("#nhomBaiViet").val() == '0' && $("#doKhoBaiViet").val() == '0') {
		for (var i = 0; i < dSBaiVietNP.length; i++) {
			dSBaiVietNP.eq(i).addClass("show");
			dSBaiVietNP.eq(i).removeClass("unShow");
		}
	} else {
		if ($("#nhomBaiViet").val() == '0') {
			var dSOption = $("#nhomBaiViet .show");
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
		} else {
			for (var j = 0; j < dSBaiVietNP.length; j++) {
				var x = dSBaiVietNP.eq(j).attr('class').split(' ');
				if (x[0] == $("#nhomBaiViet").val().trim()) {
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
	activebv();
	var maBaiViet = $firstListItem.attr('id');
	getBaiVietbv("'" + maBaiViet + "'");
}

function getBaiViet(id) {
	$('#tieuDeBV').html("");
	$('#noiDungBVTA').html("");
	$.ajax({
		url : "lay-noi-dung-bv.action",
		type : "post",
		dataType: "json",
		data : {
			maBaiViet : id
		},
		beforeSend : function() {
			$("#while-load").show();
		},
		success : function(result) {
			$("#while-load").hide();
			var baiViet=result.baiVietTiengAnh;
			$('#tieuDeBV').append(baiViet.tenBaiViet);
			$('#noiDungBVTA').append(baiViet.noiDungBV);
			var np=$(".active1").attr('id');
			getBinhLuanBaiViet(np);
		},
		error : function(xhr, status, error) {
			$("#loi").modal("show");
			
		}
	});
}
function goiYNguPhap(tuKhoa) {
	$("#danhSachGoiY").html("");
	$("#danhSachGoiY").append("<div style='text-align:center;'>Danh sách ngữ pháp gợi ý</div>");
	$.ajax({
		type : "POST",
		url : "goi-y-ngu-phap.action",
		data : {
			tuKhoa : tuKhoa
		},
		dataType: "json",
		success : function(response){
			DSNguPhapGoiY=response.DSNguPhapGoiY;
			for(var i=0; i<DSNguPhapGoiY.length; i++){
				$("#danhSachGoiY").append("<a class='col-lg-12' onclick=hienThiNguPhap('"+i+"'); style='text-align:center;'>" +DSNguPhapGoiY[i].tenBaiViet+"</a>");
			}
		},
		error : function(errormessage){
			alert("error" +errormessage);
		}
	});	
}

function kiemTraChinhTa(tuKhoa) {
	$("#danhSachTuGoiY").hide();
	$("#thongBao").hide();
	$.ajax({
		type : "POST",
		url : "kiem-tra-chinh-ta.action",
		data : {
			tuCanKiemTra : tuKhoa
		},
		dataType: "json",
		success : function(response){
			var ketQua=response.ketQua;
			if(ketQua==1){
				$("#thongBao").show();
				var DSTuGoiY=response.DSTuGoiY;
				$("#danhSachTuGoiY").html("");
				var dem=0;
				if(DSTuGoiY.length!=0){
				for(var i=0; i<DSTuGoiY.length; i++){
					
					$("#danhSachTuGoiY").append("<div style='text-align:center;' class='col-lg-12'>"+DSTuGoiY[i]+"</div>");
					dem++;
					if(dem==5)
						return;
				}
				}
				else
					$("#danhSachTuGoiY").append("<div style='text-align:center;' class='col-lg-12'>Rất tiếc không có gợi ý nào</div>");
			}
			
		},
		error : function(errormessage){
			alert("error" +errormessage);
		}
	});	
}

function hienThiNguPhap(thuTu) {
	$("#tenBV").html("");
	$("#noiDungBV").html("");
	$("#tenBV").append(DSNguPhapGoiY[thuTu].tenBaiViet);
	$("#noiDungBV").append(DSNguPhapGoiY[thuTu].noiDungBaiViet);
	$("#nguPhapGoiY").modal("show");
}

function chuyenTab() {
	$("#doKho").html("");
	$("#chuDe").html("");
	$("#doKho").append($('#doKhoBaiViet option:selected').text());
	$("#chuDe").append($('#nhomBaiViet option:selected').text());
}

function hienThiGoiY() {
	$("#danhSachTuGoiY").show();
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
	var word = $(".active1").attr('id');
	activebv();
	getBaiViet("'" + word + "'");
}

function setBinhLuanBaiViet(){
	var np=$(".active1").attr('id');
	var noiDungBinhLuan=$("#noiDungBL").val();
	$( "#btBinhLuan" ).prop( "disabled", true );
	$.ajax({
		url : "them-binh-luan-bai-viet.action",
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

function getBinhLuanBaiViet(id){
	$('#commentList').html("");
	$.ajax({
		url : "lay-binh-luan-bai-viet.action",
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

function theoDoiBaiViet(maBaiViet){
	$.ajax({
		type : "POST",
		url : "theo-doi-bai-viet.action",
		dataType: "json",
		data : {
			maBaiViet : maBaiViet
		},
		beforeSend : function() {
			$("#while-load").show();
		},
		success : function(response){
			alert("Đã thêm vào danh sách theo dõi");
			$("#"+maBaiViet).remove();
			$("#daThuoc .listItems").prepend("<div class='"+response.baiVietTiengAnh.maNhomBV+" subItems show' id='"+response.baiVietTiengAnh.maBaiViet+"'></div>");
			$("#"+maBaiViet).append("<span class='glyphicon glyphicon-fire' style='color: red; margin-right: 5px'> </span>");
			$("#"+maBaiViet).append("<a onclick='selectbv($(this));'>"+response.baiVietTiengAnh.tenBaiViet+"</a>");
			$("#"+maBaiViet).append("<button class='btn btn-default' style='padding: 1px 4px; float: right;' onclick=boTheoDoiBaiViet('"+response.baiVietTiengAnh.maBaiViet+"');>Bỏ theo dõi</button>");
			$("#"+maBaiViet).append("<div class='col-lg-12' style='margin-bottom: 20px'></div>");
			$("#"+maBaiViet).append("<div class='col-lg-12' style='border-bottom-style: dotted; margin-bottom: 20px;'></div>");
			$("#while-load").hide();
		},
		error : function(errormessage){
			alert("Theo dõi bài viết lỗi xin thử lại!!!");
		}
	});	
}

function boTheoDoiBaiViet(maBaiViet){
	$.ajax({
		type : "POST",
		url : "bo-theo-doi-bai-viet.action",
		dataType: "json",
		data : {
			maBaiViet : maBaiViet
		},
		beforeSend : function() {
			$("#while-load").show();
		},
		success : function(response){
			alert("Đã xóa khỏi danh sách theo dõi");
			$("#"+maBaiViet).remove();
			$("#dangHoc .listItems").prepend("<div class='"+response.baiVietTiengAnh.maNhomBV+" subItems show' id='"+response.baiVietTiengAnh.maBaiViet+"'></div>");
			$("#"+maBaiViet).append("<span class='glyphicon glyphicon-fire' style='color: red; margin-right: 5px'> </span>");
			$("#"+maBaiViet).append("<a onclick='selectbv($(this));'>"+response.baiVietTiengAnh.tenBaiViet+"</a>");
			$("#"+maBaiViet).append("<button class='btn btn-default' style='padding: 1px 4px; float: right;' onclick=theoDoiBaiViet('"+response.baiVietTiengAnh.maBaiViet+"');>Theo dõi</button>");
			$("#"+maBaiViet).append("<div class='col-lg-12' style='margin-bottom: 20px'></div>");
			$("#"+maBaiViet).append("<div class='col-lg-12' style='border-bottom-style: dotted; margin-bottom: 20px;'></div>");
			$("#while-load").hide();
		},
		error : function(errormessage){
			alert("xóa khỏi danh sách theo dõi lỗi xin thử lại!!!");
		}
	});	
}

