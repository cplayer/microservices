// var stepProgressDiv;
// var stepProgressBar;

function set_sidebar_menu ()
{
    var data = document.cookie;
    var flag = 0;
    var pic_dict = {
        "/dashboard": "fa fa-dashboard",
        "/addCustomerPlan": "fa fa-pencil-square",
        "/eventReview": "fa fa-check-square-o"
    };
    data = data.split('; ');
    for (var element in data)
    {
        var arr = data[element].split('=');
        if (arr[0] == 'logininfo') flag = 1;
    }
    if (flag == 1) 
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

var totalTableNum;
// var eventDic = {};

$(document).ready(function ()
{
    // for tree-list
    function tree_list_Init ()
    {
        function proc (data)
        {
            for (var i in data)
            {
                if (data[i].hasOwnProperty("nodes") == true)
                {
                    proc(data[i]["nodes"]);
                    data[i]["children"] = data[i]["nodes"];
                    delete (data[i]["nodes"]);
                    // data[i]["children"] = [];
                }
                // else
                // {
                //     eventDic[data[i]["text"]] = data[i]["id"];
                // }
                id_table[data[i]["text"]] = data[i]["id"];
                delete (data[i]["id"]);
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
                    // console.log(data);
                    proc(data);
                    console.log(id_table);
                    // console.log(data);
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
        $.ajax(
            {
                url: '/getAllTemplates',
                type: 'GET',
                dataType: 'json',
                success: function (data)
                {
                    var val = "";
                    for (element in data)
                    {
                        val += '<option value=' + data[element]["id"] + '>' + data[element]["description"] + '</option>';
                    }
                    $(".model-select2").html(val);
                    $(".model-select2").val(null).trigger("change");
                    // console.log(data);
                }
            }
        );
    }
    // for table
    function table_Init ()
    {
        $('#table').bootstrapTable({
            uniqueid: 'tableId',
            columns: [{
                field: 'tableId',
                visible: false,
                title: 'tableId'
            }, {
                field: 'eventName',
                title: '事件'
            }, {
                field: 'startTime',
                title: '起始时间',
                editable:
                    {
                        // type: 'combodate',
                        // title: '请选择新的起始时间',
                        // format: 'YYYY-MM-DD',
                        // viewformat: 'YYYY-MM-DD',
                        // template: 'YYYY-MM-DD',
                        // combodate: {
                        //     minYear: 2000,
                        //     maxYear: 2050,
                        //     minuteStep: 1,
                        //     yearDescending: false
                        // },
                        // placement: 'bottom'
                        // mode: 'inline'
                        type: 'date',
                        title: '请选择新的起始时间',
                        format: 'yyyy-mm-dd',
                        viewformat: 'yyyy-mm-dd',
                        datepicker:
                        {
                            todayBtn: 'linked'
                        }
                        // placement: 'bottom'
                    }
            }, {
                field: 'endTime',
                title: '结束时间',
                editable:
                    {
                        // type: 'combodate',
                        // title: '请选择新的结束时间',
                        // format: 'YYYY-MM-DD',
                        // viewformat: 'YYYY-MM-DD',
                        // template: 'YYYY-MM-DD',
                        // combodate: {
                        //     minYear: 2000,
                        //     maxYear: 2050,
                        //     minuteStep: 1,
                        //     yearDescending: false
                        // },
                        // placement: 'bottom'
                        type: 'date',
                        title: '请选择新的起始时间',
                        format: 'yyyy-mm-dd',
                        viewformat: 'yyyy-mm-dd',
                        datepicker:
                        {
                            todayBtn: 'linked'
                        }
                        // mode: 'inline'
                    }
            }],
            data: [],
            onReorderRow: function (newData)
            {
                console.log(newData);
                $("#table").bootstrapTable("load", newData);
            },
            contextMenu: "#context-menu-table",
            onContextMenuItem: function (row, $el)
            {
                if ($el.data("item") == "delete")
                {
                    console.log(row);
                    // console.log(row.eventId);
                    console.log(row.tableId);
                    var _remove = [];
                    // _remove = _remove.concat(row.eventId);
                    _remove = _remove.concat(row.tableId);
                    $("#table").bootstrapTable("remove", { "field": "tableId", "values": _remove });
                }
            }
            // onEditableSave: function (editable, field, row, oldValue, $el)
            // {
            //     console.log(editable);
            //     console.log(field);
            //     console.log(row);
            //     console.log(oldValue);
            //     console.log($el);
            //     $("#table").bootstrapTable("updateByUniqueId", { "id": field.tableId, "row": field });
            // }
        });
    }
    tree_list_Init();
    select_Init();
    table_Init();
    $("#dtp-time").datetimepicker();
    set_sidebar_menu();
    totalTableNum = 0;
    var cookie = document.cookie;
    cookie = cookie.split('; ');
    console.log(cookie);
    var editflag = 0;
    var msg = '';
    for (var element in cookie)
    {
        var arr = cookie[element].split('=');
        if ('editflag' == arr[0])
        {
            editflag = arr[1];
        }
    }
    if (editflag == 1)
    {
        for (var element in cookie)
        {
            var arr = cookie[element].split('=');
            console.log(arr);
            if ('msg' == arr[0])
            {
                msg = JSON.parse(arr[1]);
            }
        }
    }
    console.log(editflag);
    console.log(msg);
    $("#Name").val(msg.name);
    $("#Customer").val(msg.customerId);
    $("#Brand").val(msg.brandId);
    $("#dtp-time").datetimepicker('setDate', msg.saleDate);
});

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
    // var data = $("#table").bootstrapTable('getData');
    console.log($("#table"));
    console.log("submit data");
    console.log(data);
    customerPlanId = 1;
    var sort = 1;
    for (var i in data)
    {
        delete data[i]["tableId"];
        delete data[i]["eventId"];
        data[i]["eventId"] = id_table[data[i]["eventName"]];
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
    //             Messenger().post({
    //                 message: "添加计划成功！",
    //                 showCloseButton: true,
    //                 type: "success"
    //             })
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
            new_data = new_data.concat({ "tableId": totalTableNum, "eventName": ret[i].name, "startTime": "", "endTime": "" });
            totalTableNum++;
        }
    }
    $("#table").bootstrapTable("append", new_data);
    console.log(new_data);
    console.log(ret);
});

$(".model-select2").on("select2:select", function (e)
{
    var text = e.params.data.text;
    var id = e.params.data.id;
    $.ajax
    (
        {
            url: '/getTemplateEventByTemplateId',
            type: 'GET',
            data: { "id": id },
            success: function (data)
            {
                console.log(data);
                var new_data = [];
                for (var element in data)
                {
                    var name = data[element]["text"];
                    new_data = new_data.concat({ "tableId": totalTableNum, "eventName": name, "startTime": "", "endTime": ""});
                    totalTableNum++;
                }
                $("#table").bootstrapTable("append", new_data);
                console.log(new_data);
            }
        }
    )
});