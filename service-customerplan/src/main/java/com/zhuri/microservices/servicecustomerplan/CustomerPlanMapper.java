package com.zhuri.microservices.servicecustomerplan;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CustomerPlanMapper {

    //customerPlan
    @Insert("INSERT INTO customerplan(name, customerId, brandId, saleDate, status, createDate) " +
            " VALUES(#{name}, #{customerId}, #{brandId}, #{saleDate}, #{status}, #{createDate})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    int addCustomerPlan(CustomerPlan customerPlan);

    @Update("Update customerplan " +
            " SET name=#{name}, customerId=#{customerId}, brandId=#{brandId}, saleDate=#{saleDate}, status=#{status}, createDate=#{createDate} " +
            " WHERE id = #{id}")
    void updateCustomerPlan(CustomerPlan customerPlan);

    @Select("SELECT * from customerplan WHERE customerId = #{customerId}")
    List<CustomerPlan> getCustomerPlansByCustomerId(int customerId);

    //status = 1 提交审核 2 已审核
    @Update("UPDATE customerplan SET status=#{status} WHERE id=#{id}")
    int setCustomerPlanStatus(@Param("status")int status, @Param("id")int id);

    @Select("SELECT * from customerplan WHERE customerId = #{customerId} AND status = #{status}")
    List<CustomerPlan> getCustomerPlansByCustomerIdAndStatus(@Param("customerId")int customerId, @Param("status")int status);

    @Select("SELECT * from customerplan WHERE status = #{status}")
    List<CustomerPlan> getCustomerPlansByStatus(int status);

    //customerPlan event
    @Insert("INSERT INTO customerplan_event(customerPlanId, eventId, startTime, endTime, sort) " +
            " VALUES(#{customerPlanId}, #{eventId}, #{startTime}, #{endTime}, #{sort})")
    int addCustomerPlanEvent(CustomerPlanEvent customerPlanEvent);

    @Update("Update customerplan_event " +
            " SET customerPlanId=#{customerPlanId}, eventId=#{eventId}, startTime=#{startTime}, endTime=#{endTime}, sort=#{sort} " +
            " WHERE id = #{id}")
    void updateCustomerPlanEvent(CustomerPlanEvent customerPlanEvent);

    @Select("SELECT A.id,A.customerPlanId, A.eventId,B.name,A.startTime,A.endTime,A.sort " +
            " FROM customerplan.customerplan_event as A INNER JOIN customerplan.event as B ON A.eventId = B.id " +
            " WHERE customerPlanId = #{customerPlanId}")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "customerPlanId", column = "customerPlanId"),
            @Result(property = "eventId", column = "eventId"),
            @Result(property = "eventName", column = "name"),
            @Result(property = "startTime", column = "startTime"),
            @Result(property = "endTime", column = "endTime"),
            @Result(property = "sort", column = "sort"),
    })
    List<CustomerPlanEvent> getCustomerPlanEventByCustomerPlanId( int customerPlanId);

    @Delete("DELETE FROM customerplan_event WHERE id =#{id}")
    void delete(int id);

}