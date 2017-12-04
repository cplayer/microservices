function formatDate (index, data)
{
    for (var element in data)
    {
        if (data[element][index] != null)
        {
            data[element][index] = moment(data[element][index]).format("YYYY-MM-DD");
        }
    }
}

$(document).ready(function ()
{
    // function progressInit ()
    // {
    //     var stepProgressDiv = $("#stepProgress");
    //     var stepProgressBar = stepProgressDiv.progressStep({
    //         fillColor: "#516784",
    //         radius: 15,
    //         strokeColor: "#000000",
    //         "font-size": 18,
    //         "labelOffset": 30,
    //         margin: 30
    //     });
    //     stepProgressBar.addStep("填写计划");
    //     stepProgressBar.addStep("完善计划");
    //     stepProgressBar.addStep("待审核");
    //     stepProgressBar.addStep("已审核");
    //     stepProgressBar.refreshLayout();
    //     stepProgressBar.setCurrentStep(2);    
    // }
    function tableInit ()
    {
        $("#reviewTable").bootstrapTable({
            paginationDetailHAlign: "right",
            columns: [{
                field: 'state',
                checkbox: 'true'
            }, {
                field: 'id',
                title: '计划编号'
            }, {
                field: 'brandId',
                title: '品牌编号'
            }, {
                field: "customerId",
                title: "消费者编号"
            }, {
                field: "name",
                title: "时间名称"
            }, {
                field: "createDate",
                title: "创建时间"
            }, {
                field: "saleDate",
                title: "销售时间"
            }]
            // }, {
            //     field: "eventList",
            //     title: "事件列表"
            // }]
        });
        $.ajax(
            {
                type: "GET",
                dataType: "json",
                url: "/getCustomerPlansByStatus",
                data: { "status": 1 },
                success: function (data)
                {
                    console.log(data);
                    data_1 = data;
                    formatDate("saleDate", data_1);
                    formatDate("createDate", data_1);
                    $("#reviewTable").bootstrapTable("load", data_1);
                }
            }
        );
    }
    // progressInit();
    tableInit();
});

// $(window).resize(function ()
// {
//     // progressBar resize
//     stepProgressDiv.css("width", $(document.body).width() * 0.7);
//     stepProgressBar.refreshLayout();
// });

function detailFormatter (index, row, element)
{
    var html = "loading..";
    var id = row.id;
    $.ajax(
        {
            type: "GET",
            dataType: "json",
            url: "/getCustomerPlanEventByCustomerPlanId",
            data: { "customerPlanId": id },
            success: function (data)
            {
                console.log(data);
                var str = "";
                for (var x in data)
                {
                    str += "计划编号: " + data[x]["customerPlanId"];
                    str += " 事件编号: " + data[x]["eventId"];
                    str += " 起始时间: " + moment(data[x]["startTime"]).format("YYYY-MM-DD");
                    str += " 终止时间: " + moment(data[x]["endTime"]).format("YYYY-MM-DD");
                    str += "<br></br>";
                }
                // console.log(str.length);
                // console.log(str);
                if (str.length == 0) str = "None";
                element[0].innerHTML = str;
            }
        }
    );
    return html;
}

$("#btn-review").click(function ()
{
    function send_data (id)
    {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/setCustomerPlanStatus",
            data: { "status": 2, "id": id },
            success: function (data)
            {
                console.log(data);
                console.log("Success in " + id);
            }
        });
    }
    console.log("review clicked");
    var ret = $("#reviewTable").bootstrapTable("getSelections");
    console.log(ret);
    for (var element in ret)
    {
        send_data(ret[element].id);
        console.log("id = " + ret[element].id);
    }
});