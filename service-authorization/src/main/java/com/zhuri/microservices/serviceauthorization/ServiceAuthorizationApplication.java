package com.zhuri.microservices.serviceauthorization;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class ServiceAuthorizationApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceAuthorizationApplication.class, args);
	}
}
