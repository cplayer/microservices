package com.zhuri.microservices.servicecustomerplan;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CustomerPlanEventMapper {
    @Insert("INSERT INTO customerplan_event(customerPlanId, eventId, startTime, endTime, sort) " +
            " VALUES(#{customerPlanId}, #{eventId}, #{startTime}, #{endTime}, #{sort})")
    int addCustomerPlanEvent(CustomerPlanEvent customerPlanEvent);

    @Select("SELECT * FROM customerplan_event WHERE customerPlanId = #{customerPlanId}")
    List<CustomerPlanEvent> getCustomerPlanEventByCustomerPlanId( int customerPlanId);
}
