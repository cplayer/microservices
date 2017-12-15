function set_sidebar_menu ()
{
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
                // console.log(str);
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
            console.log(response);
            $("#number2").html(response.total);
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
            title: "创建时间",
            formatter: dateFormatter
        }, {
            field: "saleDate",
            title: "销售时间",
            formatter: dateFormatter
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
            $("#number3").html(response.total);
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
            title: "创建时间",
            formatter: dateFormatter
        }, {
            field: "saleDate",
            title: "销售时间",
            formatter: dateFormatter
        }]
    });
    set_sidebar_menu();
});

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