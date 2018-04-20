export function title(titleRouter) {
    switch (titleRouter) {
        case "ho":
            document.title = "叮叮快修"
            break;
        case "lo":
            document.title = "登录注册"
            break;
        case "ap":
            document.title = "城市定位"
            break;
        case "fe":
            document.title = "意见反馈"
            break;
        case "ad":
            document.title = "地址管理";
            break;
        case "de":
            document.title = "订单详情"
            break;
        case "af":
            document.title = "确认订单"
            break;
        case "or":
            document.title = "我的订单"
            break;
        case "st":
            document.title = "订单详情"
            break;
        case "co":
            document.title = "评价服务"
            break;
        case "mi":
            document.title = "叮叮快修"
            break;
        case "sa":
            document.title = "服务流程";
             break;
        case "us":
            document.title = "用户协议"
          break;
      case "sh":
        document.title = "好友分享"
        break;
        case "in":
        document.title = "我的积分"
        break;

    }
    return document.body.scrollTop = document.documentElement.scrollTop = 0;
};
