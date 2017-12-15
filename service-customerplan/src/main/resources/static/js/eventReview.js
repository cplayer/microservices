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
                console.log(data);
                var str = "";
                str += '<li class="header">主导航</li>';
                for (var element in data)
                {
                    var picClass = data[element]["picClass"];
                    var url = data[element]["url"];
                    var text = data[element]["text"];
                    str += '<li><a href="' + url + '"><i class="' + picClass + '"></i><span>' + text + '</span></a></li>';
                    console.log(str);
                    $(".sidebar-menu").html(str);
                }
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
            }
        }
    );
}

$(document).ready(function ()
{
    function tableInit ()
    {
        $("#reviewTable").bootstrapTable({
            // paginationDetailHAlign: "right",
            pagination: true,
            sidePagination: "server",
            method: "get",
            url: "/service-customerplan/getCustomerPlansByStatus",
            cache: false,
            queryParams: function (params)
            {
                params.sortOrder = undefined;
                params["status"] = 1;
                return params;
            },
            queryParamsType: "",
            pageNumber: 1,
            pageSize: 10,
            pageList: [10, 20, 25, 50, 'All'],
            // responseHandler: function (response)
            // {
            //     // console.log(response);
            //     // $("#number3").html(response.total);
            //     // for (var element in response[rows])
            //     // {
            //     //     delete response[rows][element]["eventList"];
            //     //     delete response[rows][element]["status"];
            //     //     response[rows][element]["operate"] = '';
            //     // }
            //     // return response;
            // },
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
                title: "创建时间",
                formatter: dateFormatter
            }, {
                field: "saleDate",
                title: "销售时间",
                formatter: dateFormatter
            }]
            // }, {
            //     field: "eventList",
            //     title: "事件列表"
            // }]
        });
        // $.ajax(
        //     {
        //         type: "GET",
        //         dataType: "json",
        //         url: "/service-customerplan/getCustomerPlansByStatus",
        //         data: { "status": 1 },
        //         success: function (data)
        //         {
        //             console.log(data);
        //             data_1 = data;
        //             formatDate("saleDate", data_1);
        //             formatDate("createDate", data_1);
        //             $("#reviewTable").bootstrapTable("load", data_1);
        //         }
        //     }
        // );
    }
    // progressInit();
    tableInit();
    set_sidebar_menu();
});

// $(window).resize(function ()
// {
//     // progressBar resize
//     stepProgressDiv.css("width", $(document.body).width() * 0.7);
//     stepProgressBar.refreshLayout();
// });

$("#btn-review").click(function ()
{
    function send_data (id)
    {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/service-customerplan/setCustomerPlanStatus",
            data: { "status": 2, "id": id },
            success: function (data)
            {
                console.log(data);
                console.log("Success in " + id);
                Messenger().post({
                    type: 'success',
                    message: '审核成功！',
                    hideAfter: 2,
                    showCloseButton: true
                })
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