function split_cookie ()
{
    var arr = document.cookie.split('; ');
    return arr;
}

function find_cookie (title)
{
    var arr = split_cookie();
    for (var element in arr)
    {
        var args = arr[element].split('=');
        if (title == args[0])
        {
            return args;
        }
    }
    return 'empty';
}

function set_cookie (title, newValue)
{
    var _cookie = find_cookie(title);
    if (_cookie != 'empty')
    {
        document.cookie = _cookie[0] + '=' + newValue;
    }
    else
    {
        console.log("Error in set cookie:" + title + ", because cookie not Found.");
    }
}

function add_cookie (title, value)
{
    document.cookie = title + '=' + value;
}

function delete_cookie (title)
{
    var _cookie = find_cookie(title);
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = _cookie[0] + '=' + _cookie[1] + '; expires=' + date.toUTCString();
}

function dateFormatter (value, row, index)
{
    if (value == null) return '无';
    return moment(value).format("YYYY-MM-DD");
}

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
                // str += "<table class='table table-bordered table-hover' style='border: 1px solid blue;'>";
                str += "<div class='box box-primary' style='margin-bottom: 5px'><div class='box-body no-padding table-responsive'><table class='table table-bordered table-hover''>";
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
                        "<td>" + data[x]["customerPlanId"] + "</td>",
                        "<td>" + data[x]["eventName"] + "</td>",
                        "<td>" + moment(data[x]["startTime"]).format("YYYY-MM-DD") + "</td>",
                        "<td>" + moment(data[x]["endTime"]).format("YYYY-MM-DD") + "</td>",
                        "</tr>"
                    ].join('');
                }
                str += "</table></div></div>";
                // console.log(str);
                if (data.length == 0) str = "无具体信息！";
                element[0].innerHTML = str;
            }
        }
    );
    return html;
}