package com.zhuri.microservices.servicecustomerplan;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface EventTypeMapper {
    @Insert("INSERT INTO event_type(Name, EventTypeNo, Description, Status, Enabled, CreateMan, CreateTime, updateMan, UpdateTime) " +
            " VALUES(#{Name}, #{EventTypeNo}, #{Description}, #{Status}, #{Enabled}, #{CreateMan}, #{CreateTime}, #{updateMan}, #{UpdateTime})")
    int addEventType(EventType eventType);

    @Update("UPDATE event_type SET Enabled = #{Enabled} WHERE Id = #{Id}")
    int enableEventType(@Param("Id") int id, @Param("Enabled") boolean Enabled);

    int updateEventType();

    EventType getEventType();

    @Select("SELECT * FROM event_type;")
    List<EventType> getAllEventType();
}
