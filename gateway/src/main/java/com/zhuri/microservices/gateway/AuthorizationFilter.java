package com.zhuri.microservices.gateway;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.sun.xml.internal.ws.client.ResponseContext;

import java.io.IOException;

public class AuthorizationFilter extends ZuulFilter {
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
        String username = (String)ctx.getRequest().getSession().getAttribute("username");
        String uri = ctx.getRequest().getRequestURI();
        String extendsionName = uri.substring(uri.lastIndexOf(".")+1);//得到扩展名
        if( "css".equals(extendsionName) || "js".equals(extendsionName)){
            return null;
        }

        if("/service-authrization/login".equals(uri) || username != null) {
            return null;
        } else {
            try {
                ctx.getResponse().sendRedirect("/service-authrization/login");
            } catch (IOException e) {
                e.printStackTrace();
            }
            return null;
        }
    }
}
