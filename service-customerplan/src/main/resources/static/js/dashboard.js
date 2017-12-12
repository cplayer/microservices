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
                console.log(data);
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
                console.log(data);
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
        paginationDetailHAlign: "right",
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
        paginationDetailHAlign: "right",
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
    $.ajax
    (
        {
            type: "GET",
            dataType: "json",
            url: "/service-customerplan/getCustomerPlansByStatus",
            data: { "status": 1 },
            success: function (data)
            {
                // console.log(data);
                data_1 = data;
                formatDate("saleDate", data_1);
                formatDate("createDate", data_1);
                $("#table2").bootstrapTable("load", data_1);
                $("#number2").html(data_1.length);
            }
        }
    );
    $.ajax
    (
        {
            type: "GET",
            dataType: "json",
            url: "/service-customerplan/getCustomerPlansByStatus",
            data: { "status": 2 },
            success: function (data)
            {
                // console.log(data);
                data_2 = data;
                formatDate("saleDate", data_2);
                formatDate("createDate", data_2);
                $("#table3").bootstrapTable("load", data_2);
                $("#number3").html(data_2.length);
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
            url: "/service-customerplan/getCustomerPlanEventByCustomerPlanId",
            data: { "customerPlanId": id },
            success: function (data)
            {
                console.log(data);
                var str = "";
                for (var x in data)
                {
                    str += "计划编号: " + data[x]["customerPlanId"];
                    // str += " 事件编号: " + data[x]["eventId"];
                    str += " 事件名称：" + data[x]["eventName"];
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