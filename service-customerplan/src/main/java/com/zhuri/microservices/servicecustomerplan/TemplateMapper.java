package com.zhuri.microservices.servicecustomerplan;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface TemplateMapper {

    @Select("SELECT * FROM template WHERE enabled = 1;")
    public List<Template> getAllTemplates();

    @Select("SELECT eventId FROM template_event where templateId = #{id}")
    public int[] getTemplateEventIdsByTemplateId(int id);

    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "text", column = "name")
    })
    @Select("SELECT * FROM event WHERE id=#{id}")
    EventNode getEventByEventId(int id);
}
