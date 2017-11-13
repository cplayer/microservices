package com.zhuri.microservices.servicecustomerplan;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

@Mapper
public interface CustomerPlanMapper {

    @Insert("INSERT INTO customerplan(name, customerId, brandId, saleDate, status, createDate) " +
            " VALUES(#{name}, #{customerId}, #{brandId}, #{saleDate}, #{status}, #{createDate})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    int addCustomerPlan(CustomerPlan customerPlan);
}
