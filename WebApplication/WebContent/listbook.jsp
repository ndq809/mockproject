<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib uri="/struts-tags" prefix="s"%>
<html>
<body>
	<s:include value="header.jsp"></s:include>
	<s:hidden name="message" id="message"></s:hidden>
	<div style="margin-top: 20px;"
		class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		<a class="btn btn-default" href="addBook.jsp"
			style="padding: 0px 20px" onclick="thongBao(1);"><span
			class="glyphicon glyphicon-list"></span>追加</a>
		<table class="table table-striped"
			style="text-align: center; margin-top: 10px" id="danhSach">
			<thead>
				<tr>
					<th style="text-align: center;">書籍ID</th>
					<th style="text-align: center;">書籍名</th>
					<th style="text-align: center;">出版社</th>
					<th style="text-align: center;">ページ数</th>
					<th style="text-align: center;">操作</th>
				</tr>
			</thead>
			<tbody>
				<s:iterator value="listBook">
					<tr>
						<td><s:property value="bookId" /></td>
						<td><s:property value="bookName" /></td>
						<td><s:property value="publisher" /></td>
						<td><s:property value="pageNumber" /></td>
						<td><s:form action="delete-book" method="post"
								id="deleteForm">
								<s:hidden name="bookId" id="bookId"></s:hidden>
								<a class="btn btn-default" style="padding: 0px 20px"
									href="show-update-page.action?bookId=${bookId}"> <span
									class="glyphicon glyphicon-edit"></span> 修正
								</a>
								<a class="btn btn-default submit-link" style="padding: 0px 20px"> <span
									class="glyphicon glyphicon-remove-circle"></span> 削除
								</a>
								<a class="btn btn-default" style="padding: 0px 20px"
									href="show-list-impression.action?bookId=${bookId }"> <span
									class="glyphicon glyphicon-list-alt"></span> 感想一覧
								</a>
							</s:form></td>
					</tr>
				</s:iterator>
			</tbody>
		</table>
	</div>

</body>
</html>