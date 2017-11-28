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

$(document).ready(function ()
{
    // for tree-list
    function tree_list_Init ()
    {
        $("#tree-list").treeview({
            data: tree,
            "state.selected": true
        });
        $.ajax(
            {
                type: "GET",
                dataType: "json",
                url: "/getUITreeAndUINode",
                success: function (data)
                {
                    console.log(data);
                    $("#tree-list").treeview({
                        data: data,
                        onNodeSelected: function (event, data)
                        {
                            console.log(event);
                            console.log(data);
                        }
                    });
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
                field: 'startDate',
                title: '起始时间',
                editable: 
                {
                    type: 'combodate',
                    title: '请选择新的起始时间',
                    format: 'YYYY-MM-DD',
                    viewformat: 'YYYY-MM-DD',
                    template: 'YYYY-MM-DD',
                    combodate: {
                        minYear: 1950,
                        maxYear: 2100,
                        minuteStep: 1
                    },
                    placement: 'bottom'
                }
            }, {
                field: 'endDate',
                title: '结束时间',
                editable: 
                {
                    type: 'combodate',
                    title: '请选择新的结束时间',
                    format: 'YYYY-MM-DD',
                    viewformat: 'YYYY-MM-DD',
                    template: 'YYYY-MM-DD',
                    combodate: {
                        minYear: 1950,
                        maxYear: 2100,
                        minuteStep: 1
                    },
                    placement: 'bottom'
                }
            }],
            data: [{
                eventId: 1,
                startDate: "2017-11-08",
                endDate: "2018-01-02"
            }, {
                eventId: 2,
                startDate: "2011-09-10",
                endDate: "2018-11-03"
            }, {
                eventId: 3,
                startDate: "2010-09-11",
                endDate: "2011-01-01"
            }, {
                eventId: 4,
                startDate: "2018-09-10",
                endDate: "2022-02-12"
            }],
            onReorderRow: function (newData)
            {
                $("#table").bootstrapTable("load", newData);
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
    // $.ajax(
    //     {
    //         type: "GET",
    //         dataType: "json",
    //         url: "/getCustomerPlansByStatus",
    //         data: {"status": 0},
    //         success: function (data)
    //         {
    //             console.log(data);
    //         }
    //     }
    // )
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
        data[i]["customerPlanId"] = customerPlanId;
        data[i]["sort"] = sort;
        sort++;
    }
    console.log(JSON.stringify(data));
});