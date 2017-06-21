<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib uri="/struts-tags" prefix="s"%>
<html>
<script src="js/jquery.validate.js"></script>
<script type="text/javascript">
	(function($, W, D) {
		var JQUERY4U = {};

		JQUERY4U.UTIL = {
			setupFormValidation : function() {
				//form validation rules
				$("#formDangNhap").validate({
					rules : {
						tenDangNhap : "required",
						matKhau : {
							required : true,
							minlength : 8
						},
						agree : "required"
					},
					submitHandler : function(form) {
						form.submit();
					}
				});
			}
		}

		//when the dom has loaded setup form validation rules
		$(D).ready(function($) {
			JQUERY4U.UTIL.setupFormValidation();
		});

	})(jQuery, window, document);
	</script>
<body>
	<s:include value="header.jsp"></s:include>
	<div style="margin-top: 20px;"
		class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		<div class="col-lg-12" style="border-bottom-style: ridge">
			<p style="font-weight: bold; font-size: 30px">書籍の編集</p>
		</div>
		<div class="col-lg-12" id="leftdiv">
			<s:form action="add-book" method="post">
				<div class="col-lg-12" style="margin-top: 20px">
					<label>書籍名</label>
				</div>
				<div class="col-lg-12" style="margin-bottom: 20px">
					<input type="text" class="form-control" name="book.bookName">
				</div>
				<div class="col-lg-12">
					<label>出版社</label>
				</div>
				<div class="col-lg-12" style="margin-bottom: 20px">
					<input type="text" class="form-control" name="book.publisher">
				</div>
				<div class="col-lg-12">
					<label>ページ数</label>
				</div>
				<div class="col-lg-12" style="margin-bottom: 20px">
					<input type="text" class="form-control" name="book.pageNumber">
				</div>

				<p>
					<input type="submit" value="送信" class="btn btn-success col-lg-12" />
				</p>
			</s:form>
			<a class="btn btn-default col-lg-3" style="margin: 20px 0px;"
				href="show-list-book.action">戻る</a>
		</div>

	</div>

</body>
</html>