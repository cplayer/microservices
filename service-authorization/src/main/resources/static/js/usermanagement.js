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
                field: "operations",
                title: "操作",
                formatter: operationFormatter
            }],
            data: [
                {
                    "id": 1,
                    "username": "zhangsan",
                    "realName": "张三",
                    "mobilePhone": "10086",
                    "officePhone": "10010",
                    "emailAddress": "zhangsan@company.com",
                    "operations": ""
                },
                {
                    "id": 2,
                    "username": "lisi",
                    "realName": "李四",
                    "mobilePhone": "10087",
                    "officePhone": "10010",
                    "emailAddress": "lisi@company.com",
                    "operations": ""
                },
                {
                    "id": 3,
                    "username": "wangwu",
                    "trueName": "王五",
                    "userTitle": "职工",
                    "phone": "10088",
                    "emailAddress": "wangwu@company.com",
                    "operations": ""
                },
                {
                    "id": 4,
                    "username": "zhaoliu",
                    "realName": "赵六",
                    "mobilePhone": "10089",
                    "officePhone": "10010",
                    "emailAddress": "zhaoliu@company.com",
                    "operations": ""
                }
            ]
        });
    }
    treeList_Init();
    table_Init();
    
});

function operationFormatter (value, row, index)
{
    return [
        '<a class="edit" href="javascript:void(0)" title="edit">',
        '<i class="glyphicon glyphicon-search"></i>',
        '<i class="glyphicon glyphicon-wrench"></i>',
        '</a>'
    ].join('');
}

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
}

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
    var userName = $("#userName").val();
    var realName = $("#realName").val();
    var mobilePhone = $("#mobilePhone").val();
    var officePhone = $("#officePhone").val();
    var emailAddress = $("#emailAddress").val();
    var _data = {};
    replace(_data, id, 'id');
    replace(_data, userName, 'userName');
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