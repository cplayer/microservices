package com.zhuri.microservices.servicecustomerplan;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface EventTypeMapper {
    //Chose valid eventType
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "text", column = "name")
    })
    @Select("SELECT * FROM event_type WHERE enabled=1;")
    List<EventTypeTree> getAllUITrees();
}
