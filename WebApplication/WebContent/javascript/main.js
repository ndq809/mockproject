function tab() {
	$('.tab_content').hide();
	$('.tab_content:first').show();
	$('.tab_nav li a:first').addClass('active');
	$('.tab_nav li a').click(function() {
		var id_content = $(this).attr("href");
		$('.tab_content').hide();
		$(id_content).fadeIn();
		$('.tab_nav li a').removeClass('active');
		$(this).addClass('active');
		return false;
	});
}
function tuDienOnline() {
	var tuCanTra = $("#tuCanTra").val();
	$.ajax({
		type : "POST",
		url : "https://glosbe.com/gapi/translate",
		data : "from=eng&dest=vie&format=json&phrase=" + tuCanTra
				+ "&callback=?",
		dataType : "json",
		beforeSend : function() {
			$("#while-load").show();
		},
		error : function(xhr, status, error) {
			$("#while-load").attr("style", "display: none;");
		},
		success : function(response) {
			$("#ketQuaTraTu").html("");
			var tuc = response.tuc;
			var dem=0;
			if(tuc.length==0){
				$("#ketQuaTraTu").append("<div class='col-lg-12'>Từ bạn vừa tra không tìm thấy hãy kiểm tra lại dữ liệu nhập vào</div>");
				return;
			}
			for (var i = 0; i < tuc.length;i++) {
				var object = tuc[i];
				
				$("#ketQuaTraTu").append("<div class='col-lg-12'> " + object.phrase.text+ "</div>");
				dem++;
				if(dem==5){
					$("#while-load").attr("style", "display: none;");
					return;
				}
					
			}
			$("#while-load").attr("style", "display: none;");
		}
	});
}

function setCauHoiTuVung() {
	$("#cauHoi").html("");
	$("#khungCauHoi").hide();
	$.ajax({
		type : "POST",
		url : "lay-cau-hoi-ngau-nhien.action",
		dataType: "json",
		beforeSend : function() {
			$("#while-load").show();
		},
		success : function(response){
			dSTuVungTiengAnh=response.DSTuVungTiengAnhChuaThuoc;
			var x = Math.floor((Math.random() * 4));
			$("#cauHoi").text("What the '"+dSTuVungTiengAnh[x].tenTuVung+"' mean?");
			$("#cauHoi").removeClass();
			$("#cauHoi").addClass(dSTuVungTiengAnh[x].maTuVung);
			for(var i=1;i<=dSTuVungTiengAnh.length;i++){
				$("#dapAn"+i).html("");
				$("#r"+i).val(dSTuVungTiengAnh[i-1].maTuVung);
				$("#dapAn"+i).text(dSTuVungTiengAnh[i-1].dichNghia);
			}
			$("#while-load").hide();
			$("#khungCauHoi").show();
			
		},
		error : function(errormessage){
			alert("error" +errormessage);
		}
	});	
}

function traLoiCauHoi(){
	if($('input[name=optradio]:checked').val()==$("#cauHoi").attr('class')){
		alert("xin chúc mừng câu trả lời chính xác hệ thống sẽ tải câu hỏi mới")
		setCauHoiTuVung();
	}
	else
		alert("rất tiếc chưa chính xác bạn hãy thử lại xem");
}

function kiemTraTab(){
	var x=$("#maTab").val();
	var menu=$("#menuAdmin li");
	for(var i=1;i<menu.length;i++){
		if(i==x){
			menu.eq(i).addClass("active");
		}
		else{
			menu.eq(i).removeClass("active");
		}
	}
}
