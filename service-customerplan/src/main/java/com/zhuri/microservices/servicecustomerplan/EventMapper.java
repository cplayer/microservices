package com.zhuri.microservices.servicecustomerplan;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface EventMapper {
    //Chose valid eventType
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "text", column = "name")
    })
    @Select("SELECT * FROM event_type WHERE enabled=1;")
    List<EventTypeTree> getAllUITrees();

    //Chose valid event
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "text", column = "name")
    })
    @Select("SELECT * FROM event WHERE eventTypeId=#{eventTypeId} AND enabled=1")
    List<EventNode> getEventsByEventType(int eventTypeId);
}
