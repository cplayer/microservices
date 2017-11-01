package com.zhuri.microservices.gateway;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import org.springframework.util.AntPathMatcher;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

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
        System.out.println("sessionid = " + ctx.getRequest().getSession().getId());
        String username = (String)ctx.getRequest().getSession().getAttribute("username");
        String url = ctx.getRequest().getRequestURI();
        //let public resource pass
        if(isPublicRes(url)) {
            return null;
        }
        //authority judge
        System.out.println("username = " + username);
        if(username != null) {
            return null;
        } else {
            try {
                ctx.getResponse().sendRedirect("/service-authorization/login");
            } catch (IOException e) {
                e.printStackTrace();
            }
            return null;
        }
    }

    private String[] antPathPatterns = {"/**/*.css", "/**/*.js"};
    private String[] publicURLs = {"/service-authorization/login", "/service-authorization/logout"};

    private boolean isPublicRes(String url) {
        for (String purl : publicURLs) {
            if(purl.equals(url)) {
                return true;
            }
        }

        AntPathMatcher matcher = new AntPathMatcher();
        for (String pattern : antPathPatterns) {
            if (matcher.match(pattern, url)) {
                return true;
            }
        }
        return false;
    }
}
