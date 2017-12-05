package com.zhuri.microservices.testlogin;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    List<User> users;

    public UserService() {
        AuthoritiesURL authoritiesURL1 = new AuthoritiesURL("/dashboard", "主页");
        AuthoritiesURL authoritiesURL2 = new AuthoritiesURL("/addCustomerPlan", "添加客户计划");
        AuthoritiesURL authoritiesURL3 = new AuthoritiesURL("/eventReview", "审核事件");

        users = new ArrayList<User>();

        User user = new User();
        List<AuthoritiesURL> authoritiesURLS = new ArrayList<>();
        user.setId(1);
        user.setUsername("examiner");
        user.setPassword("123");
        authoritiesURLS.add(authoritiesURL1);
        authoritiesURLS.add(authoritiesURL3);
        user.setAuthoritiesURL(authoritiesURLS);
        users.add(user);

        user = new User();
        authoritiesURLS = new ArrayList<>();
        user.setId(2);
        user.setUsername("user");
        user.setPassword("123");
        authoritiesURLS.add(authoritiesURL1);
        authoritiesURLS.add(authoritiesURL2);
        user.setAuthoritiesURL(authoritiesURLS);
        users.add(user);
    }

    public User loginCheck(String username, String password) {
        for(User u: users) {
            if(u.getUsername().equals(username) && u.getPassword().equals(password)) {
                return u;
            }
        }
        return null;
    }
}
