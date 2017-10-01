	$(function(){
		$('#create_date').datetimepicker({
			//inline: true,
			dateFormat: 'yy-mm-dd',
			timeFormat: "HH:mm:ss",
			maxDate:"+0m +0w"
		});

		uploadImage("#imgTitle","face") ;
        uploadImage("#imgTitleBig","ocr") ;
		uploadImage("#bce","bceocr") ;
		uploadImage("#caipiao","caipiao") ;
        uploadImage("#nude","nude") ;
        uploadImage("#similar","similar") ;

		$("#autoplay").click(function(){
			var check = $("#autoplay").is(':checked') ;
			if(check){
				$("#playcount").show() ;
			}else{
				$("#playcount").hide() ;
			}
		}) ;

	}) ;
	/**
	 * id:#id
	 * type:存储目录名
	 */
	function uploadImage(id,type){
	    var upload = new AjaxUpload(jQuery(id), {
		    action: '/upload',
		    name: 'upfile',
		    data: {
		        'limitMaxSize': "1"
		    },
		    autoSubmit: true,
		    responseType: 'json',
		    onChange: function(file, ext){
		    	$("#msg").html('') ;
		    },
		    onSubmit: function(file, ext){
		        // Allow only images. You should add security check on the server-side.
		        if (ext && /^(gif|jpg|png|jpeg)$/i.test(ext)) {
		            this.setData({
		                'limitMaxSize': '2',
		                'type':type,
		                'key2': '...'
		            });
		            //loading
		            $(id+"_loading").html("<img src=\"/resources/js/fileuploader/loading.gif\"/>") ;
		        } else {
		            alert("上传文件类型不正确") ;
		            return false;
		        }                            
		    },
		    onComplete: function(file, response){
		        //this.disable();
		        //loading
		        $(id+"_loading").empty() ;
		        
		        if(response.status == "y"){
					$(id+"_img").html("<img style=\"height:180px\" src=\"/public/uploads/"+type+"/"+response.filename+"\"/>") ;
					$(id+"_inp").val(file) ;
					$(id+"_filename").val(response.filename) ;
		        }
		        if(response.status == "n"){
		        	alert(response.info) ;
		        }
                if(response.msg &&response.msg!=""){
                    $("#msg").html(unescape(response.msg)) ;
                }
		    }
		});
	}    	


	$(function(){
		
	}) ;


var uploader = new plupload.Uploader({ //实例化一个plupload上传对象
		browse_button : 'browse',
		url : '/plupload',
		flash_swf_url : '/resources/js/Moxie.swf',
		silverlight_xap_url : '/resources/js/Moxie.xap',
		drop_element : 'drag-area'
	});
	uploader.init(); //初始化
	//绑定文件添加进队列事件
	uploader.bind('FilesAdded',function(uploader,files){
		for(var i = 0, len = files.length; i<len; i++){
			var file_name = files[i].name; //文件名
			//构造html来更新UI
			var html = '<li id="file-' + files[i].id +'"><p class="file-name">' + file_name + '</p><p class="progress"></p></li>';
			$(html).appendTo('#file-list');
		}
	});

	//绑定文件上传进度事件
	uploader.bind('UploadProgress',function(uploader,file){
		$('#file-'+file.id+' .progress').css('width',file.percent + '%');//控制进度条
	});

	//上传按钮
	$('#upload-btn').click(function(){
		uploader.start(); //开始上传
	});
