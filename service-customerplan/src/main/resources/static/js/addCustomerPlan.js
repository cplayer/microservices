// var stepProgressDiv;
// var stepProgressBar;

function set_sidebar_menu ()
{
    var data = document.cookie;
    var pic_dict = {
        "/dashboard": "fa fa-dashboard",
        "/addCustomerPlan": "fa fa-pencil-square",
        "/eventReview": "fa fa-check-square-o"
    };
    if (data.length > 0) 
    {
        data = JSON.parse(data);
        console.log(data);
        $(".user-panel > .info > p").html(data["username"]);
        $(".user-menu > a > span").html(data["username"]);
        $(".user-header > p").html(data["username"] + " - Developer<small>Member since Nov. 2012</small>");
        var str = "";
        str += '<li class="header">主导航</li>';
        for (var element in data["authoritiesURL"])
        {
            var url = data["authoritiesURL"][element]["url"];
            var text = data["authoritiesURL"][element]["text"];
            str += '<li><a href="' + url + '"><i class="' + pic_dict[url] + '"></i><span>' + text + '</span></a></li>';
        }
        console.log(str);
        $(".sidebar-menu").html(str);
    }
}

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
                delete (data[i]["id"]);
                if (data[i].hasOwnProperty("nodes") == true)
                {
                    proc(data[i]["nodes"]);
                    data[i]["children"] = data[i]["nodes"];
                    delete (data[i]["nodes"]);
                    // data[i]["children"] = [];
                }
                data[i]["name"] = data[i]["text"];
                delete (data[i]["text"]);
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
                    $("#table").bootstrapTable("remove", { "field": "eventId", "values": _remove });
                }
            }
        });
    }
    tree_list_Init();
    select_Init();
    table_Init();
    $("#dtp-time").datetimepicker();
    set_sidebar_menu();
    // stepProgressDiv = $("#stepProgress");
    // stepProgressBar = stepProgressDiv.progressStep({
    //     fillColor: "#516784",
    //     radius: 15,
    //     strokeColor: "#000000",
    //     "font-size": 18,
    //     "labelOffset": 30,
    //     margin: 30
    // });
    // stepProgressBar.addStep("填写计划");
    // stepProgressBar.addStep("完善计划");
    // stepProgressBar.addStep("待审核");
    // stepProgressBar.addStep("已审核");
    // stepProgressBar.refreshLayout();
    // stepProgressBar.setCurrentStep(0);
});

// $(window).resize(function ()
// {
//     stepProgressDiv.css("width", $(document.body).width() * 0.7);
//     stepProgressBar.refreshLayout();
// });

$("#btn-submit").click(function ()
{
    // console.log("Submit Clicked");
    var strName = $("#Name").val();
    var intCustomer = $("#Customer").val();
    var intBrand = $("#Brand").val();
    var _dateUptime = $("#dtp-time").data('DateTimePicker').date();
    var dateUptime = moment(_dateUptime.format("GGGG-MM-DD")).format("x");
    var sendData =
        {
            "name": strName,
            "customerId": intCustomer,
            "brandId": intBrand,
            "saleDate": dateUptime
        };
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
    sendData["eventList"] = data;
    sendData["status"] = 1;
    sendData["createDate"] = moment().format("x");
    console.log(sendData);
    // $.ajax(
    //     {
    //         url: "/addCustomerPlan",
    //         data: JSON.stringify(sendData),
    //         type: "POST",
    //         contentType: "application/json;charset=utf-8",
    //         success: function (data)
    //         {
    //             console.log("Success!");
    //             console.log(data);
    //         }
    //     }
    // );
});

$("#btnAdd").on("click", function ()
{
    var ret = zTree_list.getCheckedNodes(true);
    var new_data = [];
    for (var i in ret)
    {
        if (ret[i].isParent == false)
        {
            new_data = new_data.concat({ "eventId": ret[i].name, "startTime": "", "endTime": "" });
        }
    }
    $("#table").bootstrapTable("append", new_data);
    console.log(new_data);
    console.log(ret);
});