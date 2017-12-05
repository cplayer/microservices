package com.zhuri.microservices.testlogin;

import java.util.List;

public class User {
    int id;
    String username;
    String password;
    List<AuthoritiesURL> authoritiesURL;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<AuthoritiesURL> getAuthoritiesURL() {
        return authoritiesURL;
    }

    public void setAuthoritiesURL(List<AuthoritiesURL> authoritiesURL) {
        this.authoritiesURL = authoritiesURL;
    }
}
