var id = -1;
var treeList_group, treeList_role;
var userGroupData = {}, userRoleData = {};
var groupSelectId = null, roleSelectId = null, roleSelectName = null;
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
            $("#realName").val(msg.realName);
            $("#mobilePhone").val(msg.mobilePhone);
            $("#officePhone").val(msg.officePhone);
            $("#emailAddress").val(msg.emailAddress);
            $("#description").val(msg.description);
            id = msg.id;
        }
    }
    function treeList_Init ()
    {
        function treeList_group_Init ()
        {
            var group_setting = {
                view: {
                    showIcon: true
                },
                callback: {
                    onClick: groupListClick
                }
            };
            $.ajax
            (
                {
                    type: "GET",
                    dataType: "json",
                    url: "getGroupTree",
                    success: function (data)
                    {
                        console.log(data);
                        $.extend(true, userGroupData, data);
                        treeList_group = $.fn.zTree.init($("#tree-list_group"), group_setting, data);
                    }
                }
            );
        }
        function treeList_role_Init ()
        {
            var role_setting =
                {
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: 'id',
                            pIdKey: null,
                            rootpId: null
                        }
                    },
                    callback: {
                        onClick: roleListClick,
                        onDblClick: roleListDblClick
                    }
                };
            $.ajax
            (
                {
                    type: "GET",
                    dataType: "json",
                    url: "getAllRoles",
                    success: function (data)
                    {
                        console.log(data);
                        $.extend(true, userRoleData, data);
                        for (var element in data)
                        {
                            delete data[element]["englishName"];
                            data[element]["name"] = data[element]["chineseName"];
                            delete data[element]["chineseName"];
                            data[element]["t"] = data[element]["description"];
                            delete data[element]["description"];
                        }
                        treeList_role = $.fn.zTree.init($("#tree-list_role"), role_setting, data);
                    }
                }
            );
        }
        treeList_group_Init();
        treeList_role_Init();
    }
    treeList_Init();
    info_Init();
});

function groupListClick (event, treeId, treeNode, clickFlag)
{
    groupSelectId = treeNode.id;
}

function roleListClick (event, treeId, treeNode, clickFlag)
{
    roleSelectId = treeNode.id;
    roleSelectName = treeNode.name;
}

function roleListDblClick (event, treeId, treeNode, clickFlag)
{
    roleSelectId = treeNode.id;
    roleSelectName = treeNode.name;
    $("#btnAddRole").click();
}

$("#btnUpdateUser").click(function ()
{
    var send_data = {};
    if (id == -1)
    {
        Messenger().post({
            message: "没有初始用户，请尝试通过主界面进入修改页面！",
            showCloseButton: true,
            type: "error"
        });
        return;
    }
    else
    {
        send_data["id"] = id;
    }
    send_data["username"] = $("#username").val();
    send_data["realName"] = $("#realName").val();
    send_data["mobilePhone"] = $("#mobilePhone").val();
    send_data["officePhone"] = $("#officePhone").val();
    send_data["emailAddress"] = $("#emailAddress").val();
    send_data["description"] = $("#description").val();
    $.ajax
    (
        {
            type: "POST",
            url: "updateIUserInfo",
            contentType: "application/json",
            data: JSON.stringify(send_data),
            success: function (code)
            {
                if (code > 0)
                {
                    Messenger().post({
                        message: "修改信息成功！",
                        showCloseButton: true,
                        type: "success"
                    });
                }
                else
                {
                    Messenger().post({
                        message: "修改信息失败！错误代码：" + code,
                        showCloseButton: true,
                        type: "error"
                    });
                }
            }
        }
    )
}); 

$("#btnUpdateGroup").click(function ()
{
    var send_data = {};
    if (id == -1)
    {
        Messenger().post({
            message: "没有初始用户，请尝试通过主界面进入修改页面！",
            showCloseButton: true,
            type: "error"
        });
        return;
    }
    else
    {
        send_data["iUserId"] = id;
    }
    if (groupSelectId == null)
    {
        Messenger().post({
            message: "请选择一个组织！",
            showCloseButton: true,
            type: "error"
        });
        return;
    }
    send_data["groupId"] = groupSelectId;
    $.ajax
    (
        {
            type: "POST",
            url: "updateIUserGroup",
            data: send_data,
            success: function (code)
            {
                if (code > 0)
                {
                    Messenger().post({
                        message: "修改组织成功！",
                        showCloseButton: true,
                        type: "success"
                    });
                }
                else
                {
                    Messenger().post({
                        message: "修改组织失败！错误代码：" + code,
                        showCloseButton: true,
                        type: "error"
                    });
                }
            }
        }
    )
});

function get_select_options (_select)
{
    var result = [];
    for (var i = 0; i < _select[0].length; ++i)
    {
        // console.log(_select[0][i]);
        result.push(_select[0][i]["value"]);
    }
    // for (var element in _select[0]["children"])
    // {
    //     console.log(_select[0]["children"][element]);
    //     result.push(_select[0]["children"][element]["value"]);
    // }
    return result;
}

$("#btnAddRole").click(function ()
{
    var name = roleSelectName;
    // console.log($("#list_role"));
    var option_list = get_select_options($("#list_role"));
    for (var element in option_list)
    {
        if (option_list[element] == name)
        {
            Messenger().post({
                message: "请勿添加重复的角色！",
                showCloseButton: true,
                type: "error"
            });
            return;
        }
    }
    $("#list_role").append("<option>" + name + "</option>");
    // console.log(option_list);
});

$("#btnRemoveRole").click(function ()
{
    var selected = $("#list_role")[0]["selectedOptions"];
    var children = $("#list_role").children();
    var newhtml = "";
    for (var i = 0; i < children.length; ++i)
    {
        var flag = 0;
        for (var j = 0; j < selected.length; ++j)
        {
            if (children[i]["value"] == selected[j]["value"])
            {
                flag = 1;
                break;
            }
        }
        if (flag == 0)
        {
            newhtml += "<option>" + children[i]["value"] + "</option>";
        }
    }
    $("#list_role").html(newhtml);
});

$("#btnUpdateRole").click(function ()
{
    var option_list = get_select_options($("#list_role"));
    var id_array = [];
    console.log(userRoleData);
    console.log(option_list);
    for (var element in option_list)
    {
        for (var _element in userRoleData)
        {
            if (userRoleData[_element]["chineseName"] == option_list[element])
            {
                id_array.push(userRoleData[_element]["id"]);
                break;
            }
        }
    }
    console.log(id_array);
    var send_data = {};
    send_data["iUserId"] = id;
    send_data["roleIds"] = id_array;
    console.log(send_data);
    $.ajax
    (
        {
            type: "POST",
            url: "updateIUserRole",
            data: send_data,
            success: function (code)
            {
                if (code > 0)
                {
                    Messenger().post({
                        message: "修改角色成功！",
                        showCloseButton: true,
                        type: "success"
                    });
                }
                else
                {
                    Messenger().post({
                        message: "修改角色失败！错误代码：" + code,
                        showCloseButton: true,
                        type: "error"
                    });
                }
            }
        }
    );
});