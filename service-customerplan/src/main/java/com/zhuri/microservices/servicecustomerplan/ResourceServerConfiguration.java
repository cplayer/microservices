package com.zhuri.microservices.servicecustomerplan;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
@EnableResourceServer
public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {
    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                    .antMatchers("/**/setCustomerPlanStatus").hasRole("EXAMINER")
                    .anyRequest().authenticated()
                .and().csrf().disable();

    }

    @RestController
    public static class AuthorizeURLController {
        @RequestMapping(value = "/getURLByRole", method = RequestMethod.GET)
        public List getURLByRole(Authentication authentication) {
            List<Map> URLs = new ArrayList<>();
            Map map = null;
            if(authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_EXAMINER"))) {
                map = new HashMap();
                map.put("url","/service-customerplan/dashboard");
                map.put("picClass", "fa fa-dashboard");
                map.put("text","主页");
                URLs.add(map);
                map = new HashMap();
                map.put("url","/service-customerplan/eventReview");
                map.put("text","确认客户计划");
                map.put("picClass", "fa fa-check-square-o");
                URLs.add(map);
                // map = new HashMap();
                // map.put("url", "/service-customerplan/customerPlan");
                // map.put("text", "添加客户计划");
                // map.put("picClass", "fa fa-pencil-square");
                // URLs.add(map);
                return URLs;
            } else {
                map = new HashMap();
                map.put("url","/service-customerplan/dashboard");
                map.put("text","主页");
                map.put("picClass", "fa fa-dashboard");
                URLs.add(map);
                map = new HashMap();
                map.put("url","/service-customerplan/customerPlan");
                map.put("text","添加客户计划");
                map.put("picClass", "fa fa-pencil-square");
                URLs.add(map);
                return URLs;
            }
        }
    }
}
