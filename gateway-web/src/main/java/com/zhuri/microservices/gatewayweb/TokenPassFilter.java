package com.zhuri.microservices.gatewayweb;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Component
public class TokenPassFilter extends ZuulFilter {
    @Autowired
    OAuth2ClientContext oauth2ClientContext;
    @Override
    public String filterType() {
        return "pre";
    }

    @Override
    public int filterOrder() {
        return 0;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public Object run() {
        RequestContext ctx = RequestContext.getCurrentContext();
        //HttpServletRequest request = ctx.getRequest();
        //request.setAttribute("user-info", oauth2ClientContext.getAccessToken().getAdditionalInformation());
        Map map = oauth2ClientContext.getAccessToken().getAdditionalInformation();
        int id = (int)map.get("id");
        String username = (String)map.get("username");
        ctx.addZuulRequestHeader("user-id", id+"");
        ctx.addZuulRequestHeader("user-username", username);
        //System.out.println(oauth2ClientContext.getAccessToken().getAdditionalInformation());
        return null;
    }
}
