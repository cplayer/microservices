var testTreeData =
    [
        {
            id: 1,
            name: "用户类1",
            children: [
                {
                    id: 20,
                    name: "用户子类1-1"
                },
                {
                    id: 21,
                    name: "用户子类1-2"
                },
                {
                    id: 22,
                    name: "用户子类1-3"
                }
            ]
        },
        {
            id: 2,
            name: "用户类2",
            children: [
                {
                    id: 30,
                    name: "用户子类2-1"
                },
                {
                    id: 31,
                    name: "用户子类2-2"
                }
            ]
        },
        {
            id: 3,
            name: "用户类3",
            children: [
                {
                    id: 40,
                    name: "用户子类3-1",
                    children: [
                        {
                            id: 400,
                            name: "用户子类3-1-1"
                        },
                        {
                            id: 401,
                            name: "用户子类3-1-2"
                        }
                    ]
                },
                {
                    id: 41,
                    name: "用户子类3-2"
                }
            ]
        }
    ];
var treeList_group, treeList_role;
var userGroupData = {}, userRoleData = {};
var groupSelectId, roleSelectId, roleSelectName;
$(document).ready(function ()
{
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
                // check: {
                //     enable: true,
                //     chkboxType: {"Y": "s", "N": "s"}
                // }
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
            treeList_group = $.fn.zTree.init($("#tree-list_group"), group_setting, testTreeData);
        }
        function treeList_role_Init ()
        {
            var role_setting =
                {
                    // check: {
                    //     enable: true,
                    //     chkStyle: "radio",
                    //     radioType: "level"
                    // },
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
            treeList_role = $.fn.zTree.init($("#tree-list_role"), role_setting, testTreeData);
        }
        treeList_group_Init();
        treeList_role_Init();
    }
    treeList_Init();
    // $("#div-add-user").show();
    // $("#div-add-group").show();
    // $("#div-add-role").show();
});

function groupListClick (event, treeId, treeNode, clickFlag)
{
    groupSelectId = treeNode.id;
}

function roleListDblClick (event, treeId, treeNode, clickFlag)
{
    roleSelectId = treeNode.id;
    roleSelectName = treeNode.name;
    $("#btnChooseRole").click();
}

function roleListClick (event, treeId, treeNode, clickFlag)
{
    roleSelectId = treeNode.id;
    roleSelectName = treeNode.name;
}

var checkUsernameFlag = 1, checkPasswordFlag = 0;

$("#username").blur(function ()
{
    var username = $("#username").val();
    $("#labelusername").html("<span style='color: red'>*</span>用户名");
    if (username == ""){
        $("#labelusername").html("<span style='color: red'>*</span>用户名 <span class='text-red' style='font-size: 10px'>请输入用户名！</span>");
        return;
    }
    $.ajax
    (
        {
            type: "GET",
            url: "checkInternalUserUsername",
            data:{"username": username},
            success: function (data)
            {
                console.log(data);
                console.log("check-user-finished!");
                checkUsernameFlag = data;
                if(checkUsernameFlag > 0) {
                    $("#labelusername").html("<span style='color: red'>*</span>用户名 <span class='text-red' style='font-size: 10px'>该用户名已存在，不可用！</span>");
                } else {
                    $("#labelusername").html("<span style='color: red'>*</span>用户名 <span class='text-green' style='font-size: 10px'>该用户名可以使用！</span>");
                }
            }
        }
    )
});

$("#password").blur(function ()
{
    var password = $("#password").val();
    var rePassword = $("#rePassword").val();
    $("#labelpassword").html("<span style='color: red'>*</span>密码");
    if (password == "" || rePassword == "") return;
    if(password != rePassword) {
        $("#labelpassword").html("<span style='color: red'>*</span>密码 <span class='text-red' style='font-size: 10px'>两次密码输入不一致，请重新输入！</span>");
        checkPasswordFlag = 0;
    } else {
        $("#labelpassword").html("<span style='color: red'>*</span>密码 <span class='text-green' style='font-size: 10px'>两次密码输入一致，可以使用！</span>");
        checkPasswordFlag = 1;
    }
});

$("#rePassword").blur(function ()
{
    var password = $("#password").val();
    var rePassword = $("#rePassword").val();

    $("#labelpassword").html("<span style='color: red'>*</span>密码");
    if (password == "" || rePassword == "") return;
    if (password != rePassword)
    {
        $("#labelpassword").html("<span style='color: red'>*</span>密码 <span class='text-red' style='font-size: 10px'>两次密码输入不一致，请重新输入！</span>");
        checkPasswordFlag = 0;
    } else
    {
        $("#labelpassword").html("<span style='color: red'>*</span>密码 <span class='text-green' style='font-size: 10px'>两次密码输入一致，可以使用！</span>");
        checkPasswordFlag = 1;
    }
});

var id;             // 新的用户id，由url返回

$("#btn-Add-User").click(function () {
    if(checkUsernameFlag > 0) {
        Messenger().post({
            message: "添加失败！用户名已被使用",
            showCloseButton: true,
            type: "error"
        });
        return;
    }
    if(checkPasswordFlag = 0) {
        Messenger().post({
            message: "添加失败！两次密码输入不一致",
            showCloseButton: true,
            type: "error"
        });
        return;
    }

    var username = $("#username").val();
    var password = $("#password").val();
    var realName = $("#realName").val();
    var mobilePhone = $("#mobilePhone").val();
    var officePhone = $("#officePhone").val();
    var emailAddress = $("#emailAddress").val();
    var description = $("#description").val();

    $.ajax
    (
        {
            type: "POST",
            url: "addInternalUser",
            contentType: "application/json",
            data: JSON.stringify({"username": username, "password": password, "realName": realName, "mobilePhone": mobilePhone, "officePhone": officePhone, "emailAddress": emailAddress, "description": description}),
            success: function (data)
            {
                console.log(data);
                console.log("check-user-finished!");
                if (data > 0) {
                    Messenger().post({
                        message: "添加成功！",
                        showCloseButton: true,
                        type: "success"
                    });
                    id = data;
                    $("#div-add-user").hide();
                    $("#div-add-group").show();
                } else {
                    Messenger().post({
                        message: "添加失败！错误代码：" + data,
                        showCloseButton: true,
                        type: "error"
                    });
                }
            }
        }
    )
});

$("#btnAddGroup").click(function ()
{
    $.ajax
    (
        {
            type: "POST",
            url: "updateIUserGroup",
            data: {"iUserId": id, "groupId": groupSelectId},
            success: function (code)
            {
                if (code > 0)
                {
                    Messenger().post({
                        message: "分配成功！",
                        showCloseButton: true,
                        type: "success"
                    });
                    $("#div-add-group").hide();
                    $("#div-add-role").show();
                }
                else
                {
                    Messenger().post({
                        message: "分配失败！错误代码：" + code,
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

$("#btnChooseRole").click(function ()
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

$("#btnAddRole").click(function ()
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
                        message: "分配成功！",
                        showCloseButton: true,
                        type: "success"
                    });
                    window.setTimeout('window.location.href = "userManagement";', 1500);
                }
                else
                {
                    Messenger().post({
                        message: "分配失败！错误代码：" + code,
                        showCloseButton: true,
                        type: "error"
                    });
                }
            }
        }
    );
});
