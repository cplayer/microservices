package com.zhuri.microservices.servicecustomerplan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.core.convert.converter.Converter;

import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootApplication
//@EnableEurekaClient
public class ServiceCustomerplanApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceCustomerplanApplication.class, args);
	}

	/*
	@Bean
	public Converter<String, Date> addSrtingToDateConvert() {
		return new Converter<String, Date>() {
			@Override
			public Date convert(String s) {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd");
				Date date = null;
				try {
					date = sdf.parse(s);
				} catch (Exception e) {
					date = new Date();
					//e.printStackTrace();
				}
				return date;
			}
		};
	}*/
}
