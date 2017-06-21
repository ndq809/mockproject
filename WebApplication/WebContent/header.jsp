<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib uri="/struts-tags" prefix="s"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="javascript/bootstrap.min.js"></script>
<script src="javascript/jquery-1.11.2.min.js"></script>
<script src="javascript/slimtable.js"></script>
<link rel="stylesheet" href="css/slimtable.css">
<link rel="stylesheet" href="css/bootstrap.min.css">
<script src="javascript/bootstrap-datepicker.js"></script>
<link rel="stylesheet" href="css/datepicker.css">
<title>Web Application</title>
<script type="text/javascript">
	$(document).ready(function() {
		$("#danhSach").slimtable();

		$('form .submit-link').on({
			click : function(event) {
				event.preventDefault();
				$(this).closest('form').submit();
			}
		});
		setTimeout(function() {
			//your code here
			if ($("#message").length) {
				if ($("#message").val() != "")
					alert($("#message").val());
			}
		}, 250);

	});
</script>
</head>
<body>
	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
		style="background: red;">
		<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<a class="navbar-brand">グイン デッン クイ FPT一万人ブリッジSE</a>
			</div>
			<ul class="nav navbar-nav">
				<li class="active"><a href="show-list-book.action">書籍一覧</a></li>

			</ul>
		</div>
		</nav>


	</div>
	<!-- header end-->
</body>
</html>