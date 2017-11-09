package com.zhuri.microservices.servicecustomerplan;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
//@EnableEurekaClient
public class ServiceCustomerplanApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceCustomerplanApplication.class, args);
	}
}
