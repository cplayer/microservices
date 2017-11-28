package com.zhuri.microservices.serviceauthorization;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

//@RestController
public class SecurityController {
    //@RequestMapping({ "/user", "/me" })
    public Principal getUser(Principal user) {
        return user;
    }
}
