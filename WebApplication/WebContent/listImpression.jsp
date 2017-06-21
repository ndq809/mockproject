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
		<s:hidden name="bookId" id="bookId"></s:hidden>
		<a class="btn btn-default" href="show-add-impression-page.action?bookId=${bookId }" style="padding: 0px 20px"
			onclick="thongBao(1);"><span
			class="glyphicon glyphicon-list"></span>追加</a>
		<table class="table table-striped"
					style="text-align: center; margin-top: 10px" id="danhSach">
					<thead>
						<tr>
							<th style="text-align: center; width: 8%">感想ID	</th>
							<th style="text-align: center; width: 20%">コメント	</th>
							<th style="text-align: center; width: 22%">操作</th>
						</tr>
					</thead>
					<tbody>
						<s:iterator value="listImpression">
							<tr>
								<td><s:property value="impressionId" /></td>
								<td><s:property value="impressionName" /></td>
								<td>
								<s:form action="delete-impression" method="post" id="deleteForm">
								<s:hidden name="impressionId" id="impressionId"></s:hidden>
								<s:hidden name="bookId" id="bookId"></s:hidden>
									<a class="btn btn-default" style="padding: 0px 20px"
									href="show-impression-update-page.action?bookId=${bookId}&impressionId=${impressionId}"
										>
										<span class="glyphicon glyphicon-edit"></span> 修正
									</a>
									<a class="btn btn-default submit-link" style="padding: 0px 20px"
										><span class="glyphicon glyphicon-remove-circle"></span> 削除</a>
								</s:form>
								</td>
								
							</tr>
						</s:iterator>
					</tbody>
				</table>
				
		</div>

</body>
</html>