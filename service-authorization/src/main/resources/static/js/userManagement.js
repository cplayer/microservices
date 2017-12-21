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
var groupSelectId, roleSelectId;

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
    function table_Init ()
    {
        $("#tableResult").bootstrapTable(
        {
            pagination: true,
            pageNumber: 1,
            pageSize: 20,
            columns: [{
                field: "id",
                title: "用户编码"
            }, {
                field: "username",
                title: "用户名"
            }, {
                field: "realName",
                title: "真实姓名"
            }, {
                field: "mobilePhone",
                title: "移动电话"
            }, {
                field: "officePhone",
                title: "办公电话"
            }, {
                field: "emailAddress",
                title: "邮件地址"
            }, {
                field: "description",
                title: "备注",
                formatter: descriptionFormatter
            }, {
                field: "operations",
                title: "操作",
                formatter: operationFormatter,
                events: operateEvents
            }],
            data: []
        });
    }
    treeList_Init();
    table_Init();
    
});

function operationFormatter (value, row, index)
{
    return [
        '<a class="info" href="javascript:void(0)" title="info">',
        '<i class="glyphicon glyphicon-user"></i>',
        '</a>',
        '<a class="pwd" href="javascript:void(0)" title="pwd">',
        '<i class="glyphicon glyphicon-lock"></i>',
        '</a>',
    ].join('');
}

function descriptionFormatter (value, row, index)
{
    if (value == null)
    {
        return "无";
    }
    else if (value.length > 10)
    {
        return value.substring(10) + '...';
    }
    else
    {
        return value;
    }
}

window.operateEvents = {
    'click .info': function (e, value, row, index)
    {
        console.log(row);
        var msg =
            {
                id: row.id,
                username: row.username,
                realName: row.realName,
                mobilePhone: row.mobilePhone,
                officePhone: row.officePhone,
                emailAddress: row.emailAddress,
                description: row.description
            };
        console.log(msg);
        document.cookie = "editflag=1";
        document.cookie = "msg=" + JSON.stringify(msg);
        window.location.href = "updateUserInfo";
    },
    'click .pwd': function (e, value, row, index)
    {
        console.log(row);
        var msg =
            {
                id: row.id,
                username: row.username,
            };
        console.log(msg);
        document.cookie = "editflag=1";
        document.cookie = "msg=" + JSON.stringify(msg);
        window.location.href = "updatePassword";
    }
};

function groupListClick (event, treeId, treeNode, clickFlag)
{
    groupSelectId = treeNode.id;
    $.ajax
    (
        {
            type: "GET",
            url: "getIUsersByGroupId",
            data: {"groupId": groupSelectId, "pageNumber": 1, "pageSize": 20},
            success: function (data)
            {
                console.log(data);
                $("#tableResult").bootstrapTable('load', data.rows);
            }
        }
    )
}

function roleListClick (event, treeId, treeNode, clickFlag)
{
    roleSelectId = treeNode.id;
    $.ajax
    (
        {
            type: "GET",
            url: "getIUsersByRoleId",
            data: {"roleId": roleSelectId, "pageNumber": 1, "pageSize": 20},
            success: function (data)
            {
                console.log(data);
                $("#tableResult").bootstrapTable('load', data.rows);
            }
        }
    )
}

$("#btn-add-group").click(function () {
    if (typeof(groupSelectId) == "undefined") {
        Messenger().post({
            message: "请选择上级组织！",
            showCloseButton: true,
            type: "error"
        });
        $("#add-group").modal("toggle");
    }
    if(groupSelectId == 0) {
        Messenger().post({
            message: "无法对未分组用户进行操作！",
            showCloseButton: true,
            type: "error"
        });
        $("#add-group").modal("toggle");
    }
});

$("#btn-update-group").click(function () {
    if (typeof(groupSelectId) == "undefined") {
        Messenger().post({
            message: "请选择一个组织！",
            showCloseButton: true,
            type: "error"
        });
        $("#update-group").modal("toggle");
    }
    if(groupSelectId == 0) {
        Messenger().post({
            message: "无法对未分组用户进行操作！",
            showCloseButton: true,
            type: "error"
        });
        $("#update-group").modal("toggle");
    }
});

$("#btn-delete-group").click(function () {
    if (typeof(groupSelectId) == "undefined") {
        Messenger().post({
            message: "请选择一个组织！",
            showCloseButton: true,
            type: "error"
        });
        $("#delete-group").modal("toggle");
    }
    if(groupSelectId == 0) {
        Messenger().post({
            message: "无法对未分组用户进行操作！",
            showCloseButton: true,
            type: "error"
        });
        $("#delete-group").modal("toggle");
    }
});

$("#btn-add-group-submit").click(function ()
{
    var groupName = $("#addGroup_Name").val();
    $.ajax
    (
        {
            type: "POST",
            url: "addGroup",
            contentType: "application/json",
            data: JSON.stringify({"name": groupName, "parentId": groupSelectId}),
            success: function (data)
            {
                console.log(data);
                console.log("add-group-finished!");
                if (data > 0)
                {
                    Messenger().post({
                        message: "添加成功！",
                        showCloseButton: true,
                        type: "success"
                    });    
                }
                else 
                {
                    Messenger().post({
                        message: "添加失败！错误代码：" + data,
                        showCloseButton: true,
                        type: "error"
                    });
                }
                $("#add-group").modal("toggle");
            }
        }
    )
});

$("#btn-update-group-submit").click(function ()
{
    var groupName = $("#updateGroup_Name").val();
    $.ajax
    (
        {
            type: "POST",
            url: "updateGroup",
            contentType: "application/json",
            data: JSON.stringify({"name": groupName, "id": groupSelectId}),
            success: function (data)
            {
                console.log(data);
                console.log("update-group-finished!");
                if (data > 0)
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
                        message: "修改失败！错误代码：" + data,
                        showCloseButton: true,
                        type: "error"
                    });
                }
                $("#update-group").modal("toggle");
            }
        }
    )
});

$("#btn-delete-group-submit").click(function ()
{
    $.ajax
    (
        {
            type: "POST", 
            url: "deleteGroupById",
            data: {"id": groupSelectId},
            success: function (data)
            {
                console.log(data);
                console.log("delete-group-finished!");
                if (data > 0)
                {
                    Messenger().post({
                        message: "删除成功！",
                        showCloseButton: true,
                        type: "success"
                    });
                }
                else 
                {
                    Messenger().post({
                        message: "删除失败！错误代码：" + data,
                        showCloseButton: true,
                        type: "error"
                    });
                }
                $("#delete-group").modal("toggle");
            }
        }
    )
});

$("#btn-add-role-submit").click(function ()
{
    var roleChineseName = $("#addRole_ChineseName").val();
    var roleEnglishName = $("#addRole_EnglishName").val();
    var roleDescription = $("#addRole_Description").val();
    $.ajax
    (
        {
            type: "POST",
            url: "addRole",
            contentType: "application/json",
            data: JSON.stringify({"chineseName": roleChineseName, "englishName": roleEnglishName, "description":roleDescription}),
            success: function (data)
            {
                console.log(data);
                console.log("add-role-finished!");
                if (data > 0)
                {
                    Messenger().post({
                        message: "添加成功！",
                        showCloseButton: true,
                        type: "success"
                    });
                }
                else
                {
                    Messenger().post({
                        message: "添加失败！错误代码：" + data,
                        showCloseButton: true,
                        type: "error"
                    });
                }
                $("#add-role").modal("toggle");
            }
        }
    )
});

$("#btn-update-role").click(function () {
    if (typeof(roleSelectId) == "undefined") {
        Messenger().post({
            message: "请选择一个角色！",
            showCloseButton: true,
            type: "error"
        });
        $("#update-role").modal("toggle");
        return;
    }
    $.ajax
    (
        {
            type: "GET",
            url: "getRoleById",
            contentType: "application/json",
            data: {"id": roleSelectId},
            success: function (data)
            {
                console.log(data);
                console.log("get-role-finished!");
                $("#updateRole_Id").val(data["id"]);
                $("#updateRole_ChineseName").val(data["chineseName"]);
                $("#updateRole_EnglishName").val(data["englishName"]);
                $("#updateRole_Description").val(data["description"])
            }
        }
    )
});

$("#btn-update-role-submit").click(function ()
{
    var roleId =  $("#updateRole_Id").val();
    var roleChineseName = $("#updateRole_ChineseName").val();
    var roleEnglishName = $("#updateRole_EnglishName").val();
    var roleDescription = $("#updateRole_Description").val();
    $.ajax
    (
        {
            type: "POST",
            url: "updateRole",
            contentType: "application/json",
            data: JSON.stringify({"id":roleId, "chineseName": roleChineseName, "englishName": roleEnglishName, "description":roleDescription}),
            success: function (data)
            {
                console.log(data);
                console.log("update-role-finished!");
                if (data > 0)
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
                        message: "修改失败！错误代码：" + data,
                        showCloseButton: true,
                        type: "error"
                    });
                }
                $("#update-role").modal("toggle");
            }
        }
    )
});

$("#btnSearch").click(function ()
{
    function replace (source, data, field)
    {
        if (data != "") 
        {
            source[field] = data;
        }
    }
    var id = $("#id").val();
    var username = $("#username").val();
    var realName = $("#realName").val();
    var mobilePhone = $("#mobilePhone").val();
    var officePhone = $("#officePhone").val();
    var emailAddress = $("#emailAddress").val();
    var _data = {};
    replace(_data, id, 'id');
    replace(_data, username, 'username');
    replace(_data, realName, 'realName');
    replace(_data, mobilePhone, 'mobilePhone');
    replace(_data, officePhone, 'officePhone');
    replace(_data, emailAddress, 'emailAddress');
    replace(_data, 1, 'pageNumber');
    replace(_data, 20, 'pageSize');
    $.ajax
    (
        {
            type: "GET",
            url: "getIUsersByUserInfo",
            data: _data,
            success: function (data)
            {
                console.log(data);
                $("#tableResult").bootstrapTable('load', data.rows);
            }
        }
    )
});