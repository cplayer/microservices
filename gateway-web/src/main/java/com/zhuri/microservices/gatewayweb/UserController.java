package com.zhuri.microservices.gatewayweb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@Controller
public class UserController {
    @Autowired
    OAuth2ClientContext oauth2ClientContext;

    @RequestMapping("/getUserInfo")
    @ResponseBody
    public Map getUserInfo(Principal principal) {
        return oauth2ClientContext.getAccessToken().getAdditionalInformation();
    }

    @RequestMapping("/")
    public String welcome(Authentication authentication) {
        //return "redirect:/service-customerplan/dashboard";
        if(authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))){
            return "redirect:http://localhost:9000/uaa/admin/userManagement";
        } else {
            return "redirect:/service-customerplan/dashboard";
        }
    }

    @RequestMapping("/byebye")
    @ResponseBody
    public String byebye() {
        return "byebye!";
    }

    /*
    @RequestMapping("/login")
    @ResponseBody
    public Map loginDetails() {
        return oauth2ClientContext.getAccessToken().getAdditionalInformation();
    }*/
}
