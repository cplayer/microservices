package com.zhuri.microservices.gatewayweb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@Controller
public class UserController {
    @Autowired
    OAuth2ClientContext oauth2ClientContext;
    @RequestMapping("/test")
    @ResponseBody
    public OAuth2AccessToken test(Principal principal) {
        return oauth2ClientContext.getAccessToken();
    }

    @RequestMapping("/user")
    @ResponseBody
    public Principal user(Principal principal) {
        return principal;
    }

    @RequestMapping("/")
    public String welcome() {
        return "logout";
    }

    @RequestMapping("/byebye")
    @ResponseBody
    public String byebye() {
        return "byebye1";
    }
}
