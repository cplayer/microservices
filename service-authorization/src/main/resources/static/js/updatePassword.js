var id = -1;
$(document).ready(function ()
{
    function info_Init ()
    {
        var editflag = find_cookie('editflag');
        var msg = '';
        if (editflag != 'empty')
        {
            msg = find_cookie('msg');
            msg = JSON.parse(msg[1]);
            delete_cookie('editflag');
            delete_cookie('msg');
            $("#username").html(msg.username);
            id = msg.id;
        }
    }
    info_Init();
});

$("#btnPassword").click(function ()
{
    var ps1, ps2;
    ps1 = $("#newPassword").val();
    ps2 = $("#reNewPassword").val();
    if (ps1 != ps2)
    {
        Messenger().post({
            message: "请输入相同的密码！",
            showCloseButton: true,
            type: "error"
        });
    }
    else
    {
        $.ajax
        (
            {
                type: "POST", 
                url: "updateIUserPassword",
                data: {"id": id, "newPassword": ps1},
                success: function (code)
                {
                    if (code > 0)
                    {
                        Messenger().post({
                            message: "修改成功！",
                            showCloseButton: true,
                            type: "success"
                        });
                    }
                    else
                    {
                        Messenger().post({
                            message: "修改失败！错误代码：" + code,
                            showCloseButton: true,
                            type: "error"
                        });
                    }
                }
            }
        )    
    }
    
});