//长按微信或者二维码

//$(function(){
//
//	$("#aa").on({
//
//		touchstart: function(e){
//
//			timeOutEvent = setTimeout("longPresstj()",500);
//
//		}
//
//	})
//
//});

/**
 * 用户登录调用的js
 * @param  {[type]} url    [description]
 * @param  {[type]} LinkId [description]
 * @return {[type]}        [description]
 */
function login(){
    //初始化关键词
    window.keyword = '';
    window.from = '';
    var refer=document.referrer;
    $.ajax({
        url:'../../server/get_keyword.php',
        data:{refer:refer},
        dataType:'JSON',
        type:'POST',
        async:false,
        success:function(data){
            console.log(data);
            window.keyword = data.keyword;
            window.from = data.from;
        },
        error:function(){

        },
    });
    //访问接口
    var params = { "id": window.link_id, "LinkName": "Index", "url": window.location.href,"keyword":window.keyword,"from":window.from};
    var url = 'http://106.14.225.75/jrdata/index.php/Home/Interface/pageView.html';
    $.ajax({
        url: url,
        type: "get",
        data: params,
        dataType: "text",
        success: function(data) {
            
        },
        error: function(data) {
            
        }
    });
    
}

function longPress(obj){
	obj.on({
		touchstart: function(e){
			timeOutEvent = setTimeout("presstj(0)",500);
		},
		touchmove: function(){  
                clearTimeout(timeOutEvent);   
                timeOutEvent = 0;   
        },
		touchend: function(){  
            clearTimeout(timeOutEvent);    
            return false;   
        }
	})
}

/**
 * 长按记录
 * @param  {[type]} LinkId [description]
 * @return {[type]}        [description]
 */
function presstj(LinkId){
    var code = !!window.gpCode ? window.gpCode : '';
    var phone = !!window.phone ? window.phone : '';
    var send_url = !!window.send_url ? window.send_url : '';
	var params = { "id": window.link_id, "LinkName": "Index", "url": window.location.href,"code":code,"keyword":window.keyword,"from":window.fm,"phone":phone,"server_id":window.server_id};
    var url = 'http://106.14.225.75/jrdata/index.php/Home/Interface/apply.html';
	$.ajax({
            url: url,
            type: "get",
            data: params,
            dataType: "text",
            success: function(data) {
                
            },
            error: function(data) {
                
            }
        });
    // if(window.link_id == 1223){
    //     window.link_id = 1117;
    // }
    // if(window.link_id == 1225){
    //     window.link_id = 1188;
    // }
    // params = { "id": window.link_id, "LinkName": "Index", "url": window.location.href,"code":code,"keyword":window.keyword,"from":window.fm,"phone":phone};
    // //如果号码不为空 且推送链接 则需要推送另一个
    if(phone != '' && send_url != ''){
        switch(window.link){
            case 'out1':
                params = {"LinkID":window.link_id,"Mobile":phone,"Reserve1":code,"From":window.fm};
                $.ajax({
                    url: send_url,
                    type: "get",
                    data: params,
                    dataType: "jsonp",
                    success: function(data) {
                        
                    },
                    error: function(data) {
                        
                    }
                });
                break;
            default:
                
                $.ajax({
                    url: send_url,
                    type: "get",
                    data: params,
                    dataType: "text",
                    success: function(data) {
                        
                    },
                    error: function(data) {
                        
                    }
                });
                break;
        }
    }
}

 function longPressByOCPC(obj,LinkId,convert_id){ 
	obj.on({
		touchstart: function(e){
			timeOutEvent = setTimeout("longPresstjByOCPC("+window.link_id+","+convert_id+")",500);
		},
		touchmove: function(){  
                    clearTimeout(timeOutEvent);   
                timeOutEvent = 0;   
        },
		touchend: function(){  
            clearTimeout(timeOutEvent);    
            return false;   
        }  
	})
}

function longPresstjByOCPC(LinkId,convert_id){
	presstj(LinkId);
	_taq.push({convert_id:convert_id, event_type:"button"})	
}

// function getWXInfo(wxNumObj,wxQRCodeUrlObj,wxNumObj2)
// {
// 	var params = { "id": window.link_id};
//     var url = 'http://106.14.225.75/jrdata/index.php/Home/Interface/getInfo.html?'+(new Date().getTime());
//     wxNumObj.text('扫一扫二维码'); //fanli8256
//     wxQRCodeUrlObj.attr("src",'../../images/lx836925.jpg');
// 	$.ajax({
//             url: url,
//             type: "get",
//             data: params,
//             dataType: "text",
//             async:false,
//             // jsonp: "callback",
//             // jsonpCallback: "JsonCallback",
//             success: function(data) {
//                 testjson = eval("(" + data + ")");
//                 if(testjson.ret==0 && testjson.data!=null){
//                     if(testjson.data.img == 'fanli8256.jpg'){
//                         wxNumObj.text('扫一扫二维码');//testjson.data.code
//                         wxQRCodeUrlObj.attr("src",'../../images/'+testjson.data.img);
//                         if(wxNumObj2){
//                             wxNumObj2.text(testjson.data.code);
//                         }
//                     }else{
//                         if(wxNumObj2){
//                             wxNumObj2.text(testjson.data.code);
//                         }
//                         setTimeout(function () {
//                             wxNumObj.text('扫一扫二维码');//testjson.data.code
//                             wxQRCodeUrlObj.attr("src",'../../images/'+testjson.data.img);
//                         }, 5000);
//                     }
// 				}else{
//                     if(wxNumObj2){
//                         wxNumObj2.text(testjson.data.code);
//                     }
//                     setTimeout(function () {
//                         wxNumObj.text('扫一扫二维码');//testjson.data.code
//                         wxQRCodeUrlObj.attr("src",'../../images/loading.png');
//                     }, 5000);
//                 }
//             },
//             error: function(data) {
                
//             }
//         });
// }


function getWXInfo(wxNumObj,wxQRCodeUrlObj,wxNumObj2)
{
    var params = { "id": window.link_id};
    var url = 'http://106.14.225.75/jrdata/index.php/Home/Interface/getInfo.html?'+(new Date().getTime());
    wxNumObj.text('扫一扫二维码'); //fanli8256
    wxQRCodeUrlObj.attr("src",'../../images/lx836925.jpg');
    $.ajax({
            url: url,
            type: "get",
            data: params,
            dataType: "text",
            async:false,
            // jsonp: "callback",
            // jsonpCallback: "JsonCallback",
            success: function(data) {
                testjson = eval("(" + data + ")");
                if(testjson.ret==0 && testjson.data!=null){
                    if(testjson.data.img == 'fanli8256.jpg'){
                        wxNumObj.text('扫一扫二维码');//testjson.data.code
                        wxQRCodeUrlObj.attr("src",'../../images/'+testjson.data.img);
                        if(wxNumObj2){
                            wxNumObj2.text(testjson.data.code);
                        }
                    }else{
                        if(wxNumObj2){
                            wxNumObj2.text(testjson.data.code);
                        }
                        setTimeout(function () {
                            wxNumObj.text('扫一扫二维码');//testjson.data.code
                            wxQRCodeUrlObj.attr("src",'../../images/'+testjson.data.img);
                        }, 5000);
                    }
                }else{
                    if(wxNumObj2){
                        wxNumObj2.text(testjson.data.code);
                    }
                    setTimeout(function () {
                        wxNumObj.text('扫一扫二维码');//testjson.data.code
                        wxQRCodeUrlObj.attr("src",'../../images/loading.png');
                    }, 5000);
                }
            },
            error: function(data) {
                
            }
        });
}

function getWXInfo2(wxNumObj,wxQRCodeUrlObj)
{
    var params = { "id": window.link_id};
    var url = 'http://106.14.225.75/jrdata/index.php/Home/Interface/getInfo.html?'+(new Date().getTime());
    $.ajax({
            url: url,
            type: "get",
            data: params,
            dataType: "text",
            async:false,
            // jsonp: "callback",
            // jsonpCallback: "JsonCallback",
            success: function(data) {
                testjson = eval("(" + data + ")");
                if(testjson.ret==0 && testjson.data!=null){
                    wxNumObj.text(testjson.data.code);//testjson.data.code
                    wxQRCodeUrlObj.attr("src",'../../images/'+testjson.data.img);
                }else{
                    wxNumObj.text(testjson.data.code);//testjson.data.code
                    wxQRCodeUrlObj.attr("src",'../../images/loading.png');
                }
            },
            error: function(data) {
                
            }
        });
}

function getQQInfo(wxNumObj,wxQRCodeUrlObj)
{
    var params = { "id": window.link_id};
    var url = 'http://106.14.225.75/jrdata/index.php/Home/Interface/getInfo.html?'+(new Date().getTime());
    $.ajax({
            url: url,
            type: "get",
            data: params,
            dataType: "text",
            async:false,
            // jsonp: "callback",
            // jsonpCallback: "JsonCallback",
            success: function(data) {
                testjson = eval("(" + data + ")");
                if(testjson.ret==0 && testjson.data!=null){
                    wxNumObj.text(testjson.data.code);//testjson.data.code
                    wxQRCodeUrlObj.attr("src",'../../images/'+testjson.data.img);
                    window.qq_url = testjson.data.url;
                }else{
                    wxNumObj.text(testjson.data.code);//testjson.data.code
                    wxQRCodeUrlObj.attr("src",'../../images/loading.png');
                }
            },
            error: function(data) {
                
            }
        });
}

/**
 * 
 * @return {[type]} [description]
 */
function getLinkInfo(){
    var params = { "id": window.link_id};
    var url = 'http://106.14.225.75/jrdata/index.php/Home/Interface/getLinkInfo.html?'+(new Date().getTime());
    $.ajax({
            url: url,
            type: "get",
            data: params,
            dataType: "json",
            async:false,
            success: function(data) {
                if(data.ret == 1){
                    switch(data.link){
                        case 'out1':
                            window.send_url = 'http://117.78.50.100:8080/stif/InputResource';
                            break;
                        default:
                            window.send_url = 'http://'+data.link+'/index.php/Home/Interface/accept';
                            break;
                    }
                    window.link = data.link;
                    window.fm = data.fm;
                    window.server_id = data.server_id;
                    console.log(window.send_url);
                    console.log(window.fm);
                }
            },
            error: function(data) {
                
            }
        });
}