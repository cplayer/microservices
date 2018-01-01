package com.zhuri.microservices.gatewayweb;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "my")
public class MyConfig {
    String redirectAdmin;
    String redirectUser;

    public String getRedirectAdmin() {
        return redirectAdmin;
    }

    public void setRedirectAdmin(String redirectAdmin) {
        this.redirectAdmin = redirectAdmin;
    }

    public String getRedirectUser() {
        return redirectUser;
    }

    public void setRedirectUser(String redirectUser) {
        this.redirectUser = redirectUser;
    }
}
