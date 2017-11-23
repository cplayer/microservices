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
    List<CustomerPlan> getCustomerPlansByCustomerId(int customerId);

    //status = 0 草稿 1 提交审核 2 已审核 3 申请完成 4 确认完成
    @Update("UPDATE customerplan SET status=#{status} WHERE id=#{id}")
    int setCustomerPlanStatus(@Param("status")int status, @Param("id")int id);

    @Select("SELECT * from customerplan WHERE customerId = #{customerId} AND status = #{status}")
    List<CustomerPlan> getCustomerPlansByCustomerIdAndStatus(@Param("customerId")int customerId, @Param("status")int status);

    @Select("SELECT * from customerplan WHERE status = #{status}")
    List<CustomerPlan> getCustomerPlansByStatus(int status);

}