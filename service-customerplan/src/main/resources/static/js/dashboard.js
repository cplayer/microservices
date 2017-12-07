var data_0, data_1, data_2, data_3, data_4;

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
    $("#table1").bootstrapTable(
    {
        paginationDetailHAlign: "right",
        columns: [{
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
        }, {
            field: "eventList",
            title: "事件列表"
        }]
    });
    $("#table2").bootstrapTable(
    {
        paginationDetailHAlign: "right",
        columns: [{
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
        }, {
            field: "eventList",
            title: "事件列表"
        }]
    });
    $("#table3").bootstrapTable(
    {
        paginationDetailHAlign: "right",
        columns: [{
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
        }, {
            field: "eventList",
            title: "事件列表"
        }]
    });
    $("#table4").bootstrapTable(
    {
        paginationDetailHAlign: "right",
        columns: [{
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
        }, {
            field: "eventList",
            title: "事件列表"
        }]
    });
    $("#table5").bootstrapTable(
    {
        paginationDetailHAlign: "right",
        columns: [{
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
        }, {
            field: "eventList",
            title: "事件列表"
        }]
    });
    $.ajax(
        {
            type: "GET",
            dataType: "json",
            url: "/getCustomerPlansByStatus",
            data: {"status": 0},
            success: function (data)
            {
                console.log(data);
                data_0 = data;
                formatDate("saleDate", data_0);
                formatDate("createDate", data_0);
                $("#table1").bootstrapTable("load", data_0);
                $("#number1").html(data_0.length);
            }
        }
    );
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
                $("#table2").bootstrapTable("load", data_1);
                $("#number2").html(data_1.length);
            }
        }
    );
    $.ajax(
        {
            type: "GET",
            dataType: "json",
            url: "/getCustomerPlansByStatus",
            data: { "status": 2 },
            success: function (data)
            {
                console.log(data);
                data_2 = data;
                formatDate("saleDate", data_2);
                formatDate("createDate", data_2);
                $("#table3").bootstrapTable("load", data_2);
                $("#number3").html(data_2.length);
            }
        }
    );
    $.ajax(
        {
            type: "GET",
            dataType: "json",
            url: "/getCustomerPlansByStatus",
            data: { "status": 3 },
            success: function (data)
            {
                console.log(data);
                data_3 = data;
                formatDate("saleDate", data_3);
                formatDate("createDate", data_3);
                $("#table4").bootstrapTable("load", data_3);
                $("#number4").html(data_3.length);
            }
        }
    );
    $.ajax(
        {
            type: "GET",
            dataType: "json",
            url: "/getCustomerPlansByStatus",
            data: { "status": 4 },
            success: function (data)
            {
                console.log(data);
                data_4 = data;
                formatDate("saleDate", data_4);
                formatDate("createDate", data_4);
                $("#table5").bootstrapTable("load", data_4);
                $("#number5").html(data_4.length);
            }
        }
    );
    set_sidebar_menu();
});

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
