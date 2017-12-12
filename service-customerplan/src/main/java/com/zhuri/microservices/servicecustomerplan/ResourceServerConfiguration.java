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

@Configuration
@EnableResourceServer
public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {
    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                    //.antMatchers("/**/test").hasRole("EXAMINER")
                    .anyRequest().authenticated();

    }

    @RestController
    public static class AuthorizeURLController {
        @RequestMapping(value = "/mytest", method = RequestMethod.GET)
        public void getURLByRole(Authentication authentication) {
            /*for (GrantedAuthority ga : authentication.getAuthorities()) {
                System.out.println(ga.getAuthority());
            }*/
            if(authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_EXAMINER"))) {
                System.out.println("I'm examiner");
            } else {
                System.out.println("I'm user");
            }
        }
    }
}
