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