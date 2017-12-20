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
                nodes: [
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

$(document).ready(function ()
{
    function treeList_Init ()
    {
        var setting = {
            view: {
                showIcon: true
            },
            check: {
                enable: true,
                chkboxType: {"Y": "ps", "N": "ps"}
            }
        };
        function treeList_group_Init ()
        {
            treeList_group = $.fn.zTree.init($("#tree-list_group"), setting, testTreeData);
        }
        function treeList_role_Init ()
        {
            treeList_role = $.fn.zTree.init($("#tree-list_role"), setting, testTreeData);
        }
        treeList_group_Init();
        treeList_role_Init();
    }
    function table_Init ()
    {
        $("#tableResult").bootstrapTable(
        {
            pagination: true,
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