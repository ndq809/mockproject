<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib uri="/struts-tags" prefix="s"%>
<html>
<body>
	<s:include value="header.jsp"></s:include>
	<div style="margin-top: 20px;"
		class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		<div class="col-lg-12" style="border-bottom-style: ridge">
			<p style="font-weight: bold; font-size: 30px">感想の編集</p>
		</div>
		<div class="col-lg-12" id="leftdiv">
			<s:form action="impression-update" method="post">
				<s:hidden name="impression.bookId" value="%{bookId}" ></s:hidden>
				<s:hidden name="impression.impressionId" value="%{impressionId}" ></s:hidden>
				<s:hidden name="bookId"></s:hidden>
				<s:hidden name="impressionId"></s:hidden>
				<div class="col-lg-12">
					<label>コメント</label>
				</div>
				
				<div class="col-lg-12" style="margin-bottom: 20px">
					<textarea rows="4" class="form-control" name="impression.impressionName"><s:property value="impression.impressionName"/></textarea>
				</div>
				<input type="submit" value="送信" class="btn btn-success col-lg-12" />

			</s:form>
			<a class="btn btn-default col-lg-3" style="margin: 20px 0px;"
				href="show-list-book.action">戻る</a>
		</div>

	</div>

</body>
</html>