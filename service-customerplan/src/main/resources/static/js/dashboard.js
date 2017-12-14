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
    // var data = find_cookie('logininfo');
    // var pic_dict = {
    //     "/dashboard": "fa fa-dashboard",
    //     "/customerPlan": "fa fa-pencil-square",
    //     "/eventReview": "fa fa-check-square-o"
    // };
    // if (data != 'empty') 
    // {
    //     data = JSON.parse(data[1]);
    //     console.log(data);
    //     $(".user-panel > .info > p").html(data["username"]);
    //     $(".user-menu > a > span").html(data["username"]);
    //     $(".user-header > p").html(data["username"] + " - Developer<small>Member since Nov. 2012</small>");
    //     var str = "";
    //     str += '<li class="header">主导航</li>';
    //     for (var element in data["authoritiesURL"])
    //     {
    //         var url = data["authoritiesURL"][element]["url"];
    //         var text = data["authoritiesURL"][element]["text"];
    //         str += '<li><a href="' + url + '"><i class="' + '/service-customerplan' + pic_dict[url] + '"></i><span>' + text + '</span></a></li>';
    //     }
    //     console.log(str);
    //     $(".sidebar-menu").html(str);
    //     Messenger().post({
    //         type: 'info',
    //         message: '欢迎登录，' + data["username"] + '！',
    //         hideAfter: 2
    //     });
    // }
    // else
    // {
    //     Messenger().post({
    //         type: 'info',
    //         message: '欢迎进入Dashboard！',
    //         hideAfter: 2
    //     })
    // }
    $.ajax
    (
        {
            type: "GET",
            dataType: "json",
            url: "/service-customerplan/getURLByRole",
            success: function (data)
            {
                // console.log(data);
                var str = "";
                str += '<li class="header">主导航</li>';
                for (var element in data)
                {
                    var picClass = data[element]["picClass"];
                    var url = data[element]["url"];
                    var text = data[element]["text"];
                    str += '<li><a href="' + url + '"><i class="' + picClass + '"></i><span>' + text + '</span></a></li>';
                }
                console.log(str);
                $(".sidebar-menu").html(str);
            }
        }
    );
    $.ajax
    (
        {
            type: "GET",
            url: "/getUserInfo",
            success: function (data)
            {
                // console.log(data);
                $(".user-panel > .info > p").html(data["username"]);
                $(".user-menu > a > span").html(data["username"]);
                $(".user-header > p").html(data["username"] + " - Developer<small>Member since Nov. 2012</small>");
                var login_flag = find_cookie('login_flag');
                if (login_flag == 'empty' && login_flag[1] == 0)
                {
                    Messenger().post({
                        type: 'info',
                        message: '欢迎登录，' + data["username"] + '！',
                        hideAfter: 2
                    });
                    set_cookie('login_flag', 1);    
                }
                
            }
        }
    );
}

$(document).ready(function ()
{
    $("#table2").bootstrapTable(
    {
        pagination: true,
        sidePagination: "server",
        method: "get",
        url: "/service-customerplan/getCustomerPlansByStatus",
        cache: false,
        queryParams: function (params)
        {
            console.log("params = ");
            console.log(params);
            params.sortOrder = undefined;
            params["status"] = 1;
            return params;
        },
        queryParamsType: "",
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 20, 25, 50, 'All'],
        responseHandler: function (response)
        {
            for (var element in response)
            {
                delete response[element]["eventList"];
                delete response[element]["status"];
                response[element]["operate"] = '';
            }
            return response;
        },
        // paginationDetailHAlign: "right",
        columns: [{
            field: 'id',
            title: '计划编号'
        }, {
            field: 'brandId',
            title: '品牌编号'
        }, {
            field: "customerId",
            title: "客户编号"
        }, {
            field: "name",
            title: "表单名称"
        }, {
            field: "createDate",
            title: "创建时间"
        }, {
            field: "saleDate",
            title: "销售时间"
        }, {
            field: 'operate',
            title: '修改..',
            // align: 'center',
            events: operateEvents,
            formatter: operateFormatter
        }]
    });
    $("#table3").bootstrapTable(
    {
        pagination: true,
        sidePagination: "server",
        method: "get",
        url: "/service-customerplan/getCustomerPlansByStatus",
        cache: false,
        queryParams: function (params)
        {
            params.sortOrder = undefined;
            params["status"] = 2;
            return params;
        },
        queryParamsType: "",
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 20, 25, 50, 'All'],
        responseHandler: function (response)
        {
            for (var element in response)
            {
                delete response[element]["eventList"];
                delete response[element]["status"];
                response[element]["operate"] = '';
            }
            return response;
        },
        // paginationDetailHAlign: "right",
        columns: [{
            field: 'id',
            title: '计划编号'
        }, {
            field: 'brandId',
            title: '品牌编号'
        }, {
            field: "customerId",
            title: "客户编号"
        }, {
            field: "name",
            title: "表单名称"
        }, {
            field: "createDate",
            title: "创建时间"
        }, {
            field: "saleDate",
            title: "销售时间"
        }]
    });
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
            url: "/service-customerplan/getCustomerPlanEventByCustomerPlanId",
            data: { "customerPlanId": id },
            success: function (data)
            {
                console.log(data);
                var str = "";
                str += "<table class='table table-bordered table-hover' style='border: 2px; color=black; border-style: solid'>";
                str += [
                    "<tr>",
                    "<th>计划编号</th>",
                    "<th>事件名称</th>",
                    "<th>起始时间</th>",
                    "<th>终止时间</th>",
                    "</tr>",
                ].join('');
                for (var x in data)
                {
                    // str += "计划编号: " + data[x]["customerPlanId"];
                    // // str += " 事件编号: " + data[x]["eventId"];
                    // str += " 事件名称：" + data[x]["eventName"];
                    // str += " 起始时间: " + moment(data[x]["startTime"]).format("YYYY-MM-DD");
                    // str += " 终止时间: " + moment(data[x]["endTime"]).format("YYYY-MM-DD");
                    // str += "<br></br>";
                    str += [
                        "<tr>",
                        "<th>" + data[x]["customerPlanId"] + "</th>",
                        "<th>" + data[x]["eventName"] + "</th>",
                        "<th>" + moment(data[x]["startTime"]).format("YYYY-MM-DD") + "</th>",
                        "<th>" + moment(data[x]["endTime"]).format("YYYY-MM-DD") + "</th>",
                        "</tr>"
                    ].join('');
                }
                str += "</table>";
                // console.log(str);
                if (data.length == 0) str = "无具体信息！";
                element[0].innerHTML = str;   
            }
        }
    );
    return html;
}

function operateFormatter (value, row, index)
{
    return [
        '<a class="edit" href="javascript:void(0)" title="edit">',
        '<i class="glyphicon glyphicon-wrench"></i>',
        '</a>'
    ].join('');
}

window.operateEvents = {
    'click .edit': function (e, value, row, index)
    {
        console.log(row);
        var msg = 
        {
            customerPlanId: row.id,
            name: row.name,
            // customerId: row.customerId,
            brandId: row.brandId,
            saleDate: row.saleDate
        };
        console.log(msg);
        document.cookie = "editflag=1";
        document.cookie = "msg=" + JSON.stringify(msg);
        window.location.href = "/service-customerplan/customerPlan";
    }
};