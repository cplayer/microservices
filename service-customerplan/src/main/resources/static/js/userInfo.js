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

var treeList_org, treeList_user;

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
        function treeList_org_Init ()
        {
            treeList_org = $.fn.zTree.init($("#tree-list_org"), setting, testTreeData);
        }
        function treeList_user_Init ()
        {
            treeList_user = $.fn.zTree.init($("#tree-list_user"), setting, testTreeData);
        }
        treeList_org_Init();
        treeList_user_Init();
    }
    function table_Init ()
    {
        $("#tableResult").bootstrapTable(
        {
            pagination: true,
            columns: [{
                field: "id",
                title: "ID"
            }, {
                field: "userId",
                title: "用户编码"
            }, {
                field: "userName",
                title: "用户名"
            }, {
                field: "trueName",
                title: "真实姓名"
            }, {
                field: "userTitle",
                title: "职务头衔"
            }, {
                field: "phone",
                title: "移动电话"
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
                    "userId": 1,
                    "userName": "zhangsan",
                    "trueName": "张三",
                    "userTitle": "职工",
                    "phone": "10086",
                    "emailAddress": "zhangsan@company.com",
                    "operations": ""
                },
                {
                    "id": 2,
                    "userId": 2,
                    "userName": "lisi",
                    "trueName": "李四",
                    "userTitle": "职工",
                    "phone": "10087",
                    "emailAddress": "lisi@company.com",
                    "operations": ""
                },
                {
                    "id": 3,
                    "userId": 3,
                    "userName": "wangwu",
                    "trueName": "王五",
                    "userTitle": "职工",
                    "phone": "10088",
                    "emailAddress": "wangwu@company.com",
                    "operations": ""
                },
                {
                    "id": 4,
                    "userId": 4,
                    "userName": "zhaoliu",
                    "trueName": "赵六",
                    "userTitle": "管理员",
                    "phone": "10089",
                    "emailAddress": "zhaoliu@company.com",
                    "operations": ""
                },
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