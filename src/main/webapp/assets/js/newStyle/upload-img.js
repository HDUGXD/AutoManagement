$(function () {
    // 初始化
    var $image = $('#up-img-show');
    var $inputImage = $('.up-img-file');
    $image.cropper({
        aspectRatio: '1',
        autoCropArea: 0.8,
        preview: '.up-pre-after',
        responsive: true,
    });

    var URL = window.URL || window.webkitURL;
    var blobURL;

    if (URL) {
        $inputImage.change(function () {
            var files = this.files;
            var file;
            if (files && files.length) {
                file = files[0];
                if (/^image\/\w+$/.test(file.type)) {
                    blobURL = URL.createObjectURL(file);
                    $image.one('built.cropper', function () {
                        URL.revokeObjectURL(blobURL);
                    }).cropper('reset').cropper('replace', blobURL);
                    $inputImage.val('');
                } else {
                    window.alert('图片格式不正确');
                }
            }
        });
    } else {
        $inputImage.prop('disabled', true).parent().addClass('disabled');
    }

    //绑定上传事件
    $('.up-btn-ok').on('click', function () {
        var img_src = $image.attr("src");
        if (img_src == "") {
            return false;
        }
        var url = $(this).attr("url");
        //控制裁剪图片的大小
        var canvas = $image.cropper('getCroppedCanvas', {width: "100", height: "100"});
        var data = canvas.toDataURL(); //转成base64
        if(flag){
            window.parent.frames[1].editSrc(data);
            // parent.editSrc(data);
            close_dialog('editPerson1');
        }else{
            parent.editSrc(data);
            // window.opener.editSrc(data);
            // window.close();
        }
    });

    $('#up-btn-left').on('click', function () {
        $("#up-img-show").cropper('rotate', 90);
    });
    $('#up-btn-right').on('click', function () {
        $("#up-img-show").cropper('rotate', -90);
    });

    function close_dialog(id, destroy) {
        if (id == undefined) {
            //FIXME
            id = $(".k-window-iframecontent", top.window.document.body).attr("id");
        }
        if (window != top.window) {
            top.close_dialog(id);
            return;
        }
        var win = $("#" + id).data("kendoWindow");
        if (destroy == undefined) {
            destroy = true;
        }
        win.close();
        if (destroy) {
            win.destroy();
            return;
        }
    }

});
