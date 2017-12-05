package com.zhuri.microservices.testlogin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class TestLoginApplication {
	@Autowired
	UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(TestLoginApplication.class, args);
	}

	@RequestMapping(value="/login", method = RequestMethod.POST)
	public User login(@RequestParam String username, @RequestParam String password) {
		User user = userService.loginCheck(username, password);
		if(user != null) {
			user.setPassword(null);
		}
		return user;
	}
}
