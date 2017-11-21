package com.zhuri.microservices.servicecustomerplan;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface EventTypeMapper {
    @Insert("INSERT INTO event_type(name, eventTypeNo, description, status, enabled, createMan, createTime, updateMan, updateTime) " +
            " VALUES(#{name}, #{eventTypeNo}, #{description}, #{status}, #{enabled}, #{createMan}, #{createTime}, #{updateMan}, #{updateTime})")
    int addEventType(EventType eventType);

    @Update("UPDATE event_type SET enabled = #{enabled} WHERE id = #{id}")
    int enableEventType(@Param("Id") int id, @Param("Enabled") boolean Enabled);

    int updateEventType();

    EventType getEventType();

    @Select("SELECT * FROM event_type;")
    List<EventType> getAllEventType();
}
