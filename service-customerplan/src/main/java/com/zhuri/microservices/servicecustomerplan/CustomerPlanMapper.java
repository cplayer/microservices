package com.zhuri.microservices.servicecustomerplan;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CustomerPlanMapper {

    @Insert("INSERT INTO customerplan(name, customerId, brandId, saleDate, status, createDate) " +
            " VALUES(#{name}, #{customerId}, #{brandId}, #{saleDate}, #{status}, #{createDate})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    int addCustomerPlan(CustomerPlan customerPlan);

    @Select("SELECT * from customerplan WHERE customerId = #{customerId}")
    List<CustomerPlan> getAllCustomerPlanByCustomerId(int customerId);

    @Update("UPDATE customerplan SET status=#{status} WHERE id=#{id}")
    int setCustomerPlanStatus(@Param("status")int status, @Param("id")int id);
}
