function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function rpcCall(urls) {
	var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
			   if (xmlhttp.status == 200) {
				   console.log("OK!");
			   } else {
				   console.log("NG!");
			   }
			   
			   if (urls.length > 0) {
			       rpcCall(urls);
			   } else {
				   alert("批量添加完毕！");
			   }
			}
		};

		xmlhttp.open("POST", urls.shift(), true);
		xmlhttp.send();
		
//		await sleep(1000);
}
async function saveEx(addFlag) {
	var form = document.forms[0];
	var isClosed="0";
	if(isClosed=="1"){
		alert("该日日报已经锁死,无法填写!");
		return;
	}
	
	var firstMilestoneList = document.getElementById('firstMilestoneList');
	var firstMilestoneName=firstMilestoneList.options[firstMilestoneList.selectedIndex].text;
	firstMilestoneName=replaceAll(firstMilestoneName,"%","％")
	var productStatCate=form.productList.value;
	if(productStatCate=="")
	{
		alert("请填写产品线！");	
		return;
	}
//	var dailyDate = form.selectDate.value
//	//日期检查
//	var strNowDate="2017-09-08";
//	var intervalDay=(Date.parse(dailyDate.replace(/-/g,   "/"))-Date.parse(strNowDate.replace(/-/g,   "/")))/(24*60*60*1000);
//	if(intervalDay>2){
//		alert("不能填写当前日期2天之后的日报,请注意!");
//		return;
//	}
	//工作量
	var workLoad=document.getElementsByName("workLoad");
	var strWorkLoad="";
	var tempWorkLoad="";
	var allWorkLoad=0;
	for(var i=0;i<workLoad.length;i++){
		tempWorkLoad = workLoad[i].value;
		if(tempWorkLoad==""){
			//tempWorkLoad=0;
			alert("请输入工作量！");
			return;
		}
		if(isNaN(tempWorkLoad)){
			alert("工作量不是数字，请重新填写！");
			return;
		}else{
			strWorkLoad=strWorkLoad+"^"+tempWorkLoad;
			allWorkLoad=allWorkLoad+parseFloat(tempWorkLoad);
		}
	}
	var firstMilestoneLen=form.firstMilestoneList.length;
	var firstMilestoneId=form.firstMilestoneList.value;
	//取出里程碑对应的任务号
	var aList;
	esprima.parseScript(save + "", {}, function (node) {
		if (node.type == "VariableDeclaration" && node.kind == "var" && node.declarations[0].id.name == "aList") {
			aList = node.declarations[0].init.value;
		}
	});
	var bList = aList.split("],");
	var fmValue;
	for(var n=0;n<bList.length;n++){
		var arrList = bList[n].replace("[","").replace("[","").replace("]","").replace("]","");
		var fmId = arrList.split(",")[0];
		var fmSeq = arrList.split(",")[1];
		fmId = fmId.replace(/(^\s*)|(\s*$)/g, "");
		if(fmId==firstMilestoneId){
			fmValue = fmSeq;
			break;
		}
	}
	if(firstMilestoneLen>1)
	{
		if(firstMilestoneId==""){
			alert("请填写一级里程碑！");	
			return;
		}
	}
	//归集子项目
	var imputaPrjListLen = form.imputaPrjList.length;
	var imputaPrjId = form.imputaPrjList.value;
	if(imputaPrjListLen>1){
		if(imputaPrjId==""){
			alert("请填写子项目！");
			return;
		}
	}
	var currentWorkLoad=parseFloat('8.0');
	var editWorkLoad=parseFloat('null');
	var editType= getQueryString("editType");
	if(editType==1){
		
		if(allWorkLoad-editWorkLoad+currentWorkLoad>24){
			alert("总工作量超过24小时，请重新填写！");
			return;
		}
	}else{
		if(allWorkLoad+currentWorkLoad>24){
			alert("工作量超过24小时，请重新填写！");
			return;
		}
	}

	strWorkLoad=strWorkLoad.substr(1,strWorkLoad.length);
	//工作内容
	var workDes=document.getElementsByName("workDes");
	var strWorkDes="";
	var tempWorkDes="";
	for(var i=0;i<workDes.length;i++){
		tempWorkDes = workDes[i].value;
		tempWorkDes=replaceAll(tempWorkDes,"%","％")
		if(checkText(tempWorkDes)==false){
			alert("工作内容不能有特殊字符！");
			return;
		}else{
			strWorkDes=strWorkDes+"^ "+tempWorkDes;
		}
	}
	strWorkDes=strWorkDes.substr(1,strWorkDes.length);
	//成果物
	var workResult=document.getElementsByName("workResult");
	var strWorkResult="";
	var tempWorkResult="";
	for(var i=0;i<workResult.length;i++){
		tempWorkResult = workResult[i].value;
		tempWorkResult=replaceAll(tempWorkResult,"%","％")
		if(checkText(tempWorkResult)==false){
			alert("成果物不能有特殊字符！");
			return;
		}else{
			strWorkResult=strWorkResult+"^ "+tempWorkResult;
		}
	}
	strWorkResult=strWorkResult.substr(1,strWorkResult.length);
	//角色
	var roleId=document.getElementsByName("roleId");
	var strRoleId="";
	var tempRoleId="";
	for(var i=0;i<roleId.length;i++){
		tempRoleId = roleId[i].value;
		strRoleId=strRoleId+"^"+tempRoleId;
	}
	strRoleId=strRoleId.substr(1,strRoleId.length);
	//活动1
	var actionId1=document.getElementsByName("actionId1");
	var strActionId1="";
	var tempActionId1="";
	for(var i=0;i<actionId1.length;i++){
		tempActionId1 = actionId1[i].value;
		strActionId1=strActionId1+"^"+tempActionId1;
	}
	strActionId1=strActionId1.substr(1,strActionId1.length);
	//活动2
	var actionId2=document.getElementsByName("actionId2");
	var strActionId2="";
	var tempActionId2="";
	for(var i=0;i<actionId2.length;i++){
		tempActionId2 = actionId2[i].value;
		strActionId2=strActionId2+"^"+tempActionId2;
	}
	strActionId2=strActionId2.substr(1,strActionId2.length);
	//是否出差
	var evectionFlag=document.getElementsByName("evectionFlag");
	var evectionFlagValue="";
	for(var i=0;i<evectionFlag.length;i++){
		if(evectionFlag[i].checked==true)
			evectionFlagValue=evectionFlag[i].value;
	}
	//附件
	var files=document.getElementsByName("file1");
	var strFile="";
	var tempFile="";
	if(files.length==0){
		for(var i=0;i<roleId.length;i++){
			strFile=strFile+"^ "+tempFile;
		}
	}else{
		for(var i=0;i<files.length;i++){
			tempFile = files[i].value;
			if(tempFile==""){
				strFile=strFile+"^ "+tempFile;
			}else{
				strFile=strFile+"^ FILE";
			}
		}
	}
	strFile=strFile.substr(1,strFile.length);
	
	var startDateStr = document.getElementById("startDate").value;
	var startDate = new Date(startDateStr);
    var durationStr = document.getElementById("duration").value;
	if (!(!isNaN(durationStr) && parseInt(Number(durationStr)) == durationStr && !isNaN(parseInt(durationStr, 10)) && Number(durationStr) <= 31)) {
		alert("天数必须是不超过31的整数");
		return;
	}
	var duration = Number(durationStr);
	
	var hrefs = [];
	for (var i = 0; i < duration; ++i) {
		if (i != 0) {
			startDate.setDate(startDate.getDate() + 1);
		}
		
		var href = "./dailyManage.do?method=add2&selectDate="+ startDate.toISOString().slice(0,10);
		href += "&prjId=" + form.prjId.value;
		href += "&roleId=" + strRoleId;
		href += "&actionId1=" + strActionId1;
		href += "&actionId2=" + strActionId2;
		href += "&workLoad=" + strWorkLoad;
		href += "&workDes=" + strWorkDes;
		href += "&workResult=" + strWorkResult;
		href += "&evectionFlag=" + evectionFlagValue;
		href += "&realUser=" + form.realUser.value;
		href += "&firstSubsysId=" + form.firstSubsysId.value;
		href += "&secondSubsysId=" + form.secondSubsysId.value;
		href += "&productStatCate=" + productStatCate;
		href += "&files=" + strFile;
		href += "&firstMilestoneId=" + firstMilestoneId;
		href += "&firstMilestoneName=" + firstMilestoneName;
		href += "&mobileflag=1";
		href += "&imputaPrjId=" + imputaPrjId;
		href += "&fmValue=" + fmValue;
		//href += "&dailyId=" + dailyId;
		
		hrefs.push(href);
    }
	
	
	if (hrefs.length == 1) {
		form.action = hrefs[0];
		form.submit();
	} else {
		rpcCall(hrefs);
	}
	
    //sendAction(form, href);
    //reloadParentForm("添加");
    //var win = top.window;
	//win.close();
}
var div = document.createElement("div");
div.innerHTML = "<font style='background:#FFFFE0; color:#FF0000'>开始日  </font>"
                + "<input value='" + document.forms[0].selectDate.value + "' style='background:#FFFFE0; color:#FF0000' type='text' id='startDate' size='10'>"
                + "<font style='background:#FFFFE0; color:#FF0000'>    天数  </font>"
                + "<input style='background:#FFFFE0; color:#FF0000' type='text' value='5' id='duration' size='10'>"
                + "    <input style='background:#FFFFE0; color:#FF0000' id='addEx' type='button' value='批量添加' onclick='saveEx()'>";
div.setAttribute("name", "exDiv");
div.setAttribute("data-role", "header");
div.setAttribute("data-position", "fixed");
div.setAttribute("role", "banner");
div.setAttribute("class", "ui-header ui-bar-inherit ui-header-fixed slidedown ui-fixed-hidden");
document.body.insertBefore(div, document.body.firstChild.firstChild);
