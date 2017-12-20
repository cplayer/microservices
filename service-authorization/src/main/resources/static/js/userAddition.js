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
var userGroupData, userRoleData;
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
                        $.extend(userGroupData, data);
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
                    check: {
                        enable: true,
                        chkStyle: "radio",
                        radioType: "level"
                    },
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: 'id',
                            pIdKey: null,
                            rootpId: null
                        }
                    },
                    callback: {
                        onClick: roleListClick
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
                        $.extend(userRoleData, data);
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
});

function groupListClick (event, treeId, treeNode, clickFlag)
{
    groupSelectId = treeNode.id;

}

function roleListClick (event, treeId, treeNode, clickFlag)
{
    roleSelectId = treeNode.id;

}

var checkUsernameFlag = 1, checkPasswordFlag = 0;

$("#username").blur(function ()
{
    var username = $("#username").val();
    if(username==""){
        $("#checkUsername").val("请输入用户名！")
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
                if(checkUsernameFlag>0) {
                    $("#checkUsername").val("该用户名已存在，不可用！")
                } else {
                    $("#checkUsername").val("该用户名可以使用！")
                }
            }
        }
    )
});

$("#password").blur(function ()
{
    var password = $("#password").val();
    var rePassword = $("#rePassword").val();

    if(password!=rePassword){
        $("#checkRePassword").val("两次密码输入不一致，请重新输入！")
        checkPasswordFlag = 0;
    } else {
        $("#checkRePassword").val("两次密码输入一致，可以使用！")
        checkPasswordFlag = 1;
    }
});

$("#rePassword").blur(function ()
{
    var password = $("#password").val();
    var rePassword = $("#rePassword").val();

    if(password!=rePassword){
        $("#checkRePassword").val("两次密码输入不一致，请重新输入！")
        checkPasswordFlag = 0;
    } else {
        $("#checkRePassword").val("两次密码输入一致，可以使用！")
        checkPasswordFlag = 1;
    }
});

$("#btn-Add-User").click(function () {
    if(checkUsernameFlag>0) {
        Messenger().post({
            message: "添加失败！用户名已被使用",
            showCloseButton: true,
            type: "error"
        });
        return;
    }
    if(checkPasswordFlag = 0) {
        Messenger().post({
            message: "添加失败！两次密码输入一致",
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
                if(data>0) {
                    Messenger().post({
                        message: "添加成功！",
                        showCloseButton: true,
                        type: "success"
                    });
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
})