var tree = [
    {
        text: "Parent 1",
        nodes: [
            {
                text: "Child 1",
                nodes: [
                    {
                        text: "Grandchild 1"
                    },
                    {
                        text: "Grandchild 2"
                    }
                ]
            },
            {
                text: "Child 2"
            }
        ]
    },
    {
        text: "Parent 2"
    },
    {
        text: "Parent 3"
    },
    {
        text: "Parent 4"
    },
    {
        text: "Parent 5"
    }
];

var stepProgressDiv;
var stepProgressBar;
var customerPlanId;
var zTree_list;
var id_table;

$(document).ready(function ()
{
    // for tree-list
    function tree_list_Init ()
    {
        function proc (data)
        {
            for (var i in data)
            {
                id_table[data[i]["text"]] = data[i]["id"];
                delete(data[i]["id"]);
                if (data[i].hasOwnProperty("nodes") == true)
                {
                    proc(data[i]["nodes"]);
                    data[i]["children"] = data[i]["nodes"];
                    delete (data[i]["nodes"]);
                    // data[i]["children"] = [];
                }
                data[i]["name"] = data[i]["text"];
                delete(data[i]["text"]);
                // else
                // {
                    
                // }
            }
        }
        id_table = {};
        // $("#tree-list").jstree();
        $.ajax(
            {
                type: "GET",
                dataType: "json",
                url: "/getUITreeAndUINode",
                success: function (data)
                {
                    console.log(data);
                    proc(data);
                    console.log(data);
                    var setting = {
                        view: {
                            showIcon: false,
                        },
                        check: {
                            enable: true,
                            chkboxType: { "Y": "ps", "N": "ps" }
                        }
                    };
                    zTree_list = $.fn.zTree.init($("#tree-list"), setting, data);
                }
            }
        );
    }
    // for select
    function select_Init ()
    {
        $(".model-select2").select2({
            placeholder: "选择一个模板",
            width: "100%",
            minimumResultsForSearch: Infinity,
            allowClear: true
        });
        $(".model-select2").val(null).trigger("change");        
    }
    // for table
    function table_Init ()
    {
        $('#table').bootstrapTable({
            columns: [{
                field: 'eventId',
                title: '事件'
            }, {
                field: 'startTime',
                title: '起始时间',
                editable: 
                {
                    type: 'combodate',
                    title: '请选择新的起始时间',
                    format: 'YYYY-MM-DD',
                    viewformat: 'YYYY-MM-DD',
                    template: 'YYYY-MM-DD',
                    combodate: {
                        minYear: 2000,
                        maxYear: 2050,
                        minuteStep: 1,
                        yearDescending: false
                    },
                    // placement: 'bottom'
                    mode: 'inline'
                }
            }, {
                field: 'endTime',
                title: '结束时间',
                editable: 
                {
                    type: 'combodate',
                    title: '请选择新的结束时间',
                    format: 'YYYY-MM-DD',
                    viewformat: 'YYYY-MM-DD',
                    template: 'YYYY-MM-DD',
                    combodate: {
                        minYear: 2000,
                        maxYear: 2050,
                        minuteStep: 1,
                        yearDescending: false
                    },
                    // placement: 'bottom'
                    mode: 'inline'
                }
            }],
            data: [],
            onReorderRow: function (newData)
            {
                $("#table").bootstrapTable("load", newData);
            },
            contextMenu: "#context-menu-table",
            onContextMenuItem: function (row, $el)
            {
                if ($el.data("item") == "delete")
                {
                    console.log(row);
                    console.log(row.eventId);
                    var _remove = [];
                    _remove = _remove.concat(row.eventId);
                    $("#table").bootstrapTable("remove", {"field": "eventId", "values": _remove});
                }
            }
        });
    }
    // for progressBar
    function progressBar_Init ()
    {
        stepProgressDiv = $("#stepProgress");
        stepProgressBar = stepProgressDiv.progressStep({
            fillColor: "#516784",
            radius: 15,
            strokeColor: "#000000",
            "font-size": 18,
            "labelOffset": 30,
            margin: 30
        });
        stepProgressBar.addStep("填写计划");
        stepProgressBar.addStep("完善计划");
        stepProgressBar.addStep("待审核");
        stepProgressBar.addStep("已审核");
        stepProgressBar.refreshLayout();
        stepProgressBar.setCurrentStep(1);
    }
    tree_list_Init();
    select_Init();
    table_Init();
    progressBar_Init();
});

$(window).resize(function ()
{  
    // progressBar resize
    stepProgressDiv.css("width", $(document.body).width() * 0.7);
    stepProgressBar.refreshLayout();
});

$("#btnSave").on("click", function ()
{
    var data = $("#table").bootstrapTable('getData', useCurrentPage = true);
    // console.log(data);
    customerPlanId = 1;
    var sort = 1;
    for (var i in data)
    {
        data[i]["eventId"] = id_table[data[i]["eventId"]];
        data[i]["customerPlanId"] = customerPlanId;
        data[i]["sort"] = sort;
        if (data[i]["startTime"] != "")
        {
            data[i]["startTime"] = moment(data[i]["startTime"]).format("x");
        }
        if (data[i]["endTime"] != "")
        {
            data[i]["endTime"] = moment(data[i]["endTime"]).format("x");
        }
        sort++;
    }
    $.ajax({
        url: "/addCustomerPlanEvent",
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        success: function (data)
        {
            alert("保存成功！");
            console.log("success!");
            console.log(data);
        }
    });
    console.log(JSON.stringify(data));
});

$("#btnAdd").on("click", function ()
{
    var ret = zTree_list.getCheckedNodes(true);
    var new_data = [];
    for (var i in ret)
    {
        if (ret[i].isParent == false)
        {
            new_data = new_data.concat({"eventId": ret[i].name, "startTime": "", "endTime": ""});
        }
    }
    $("#table").bootstrapTable("append", new_data);
    console.log(new_data);
    console.log(ret);
});