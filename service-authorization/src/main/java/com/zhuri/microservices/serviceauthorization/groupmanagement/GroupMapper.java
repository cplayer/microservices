package com.zhuri.microservices.serviceauthorization.groupmanagement;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface GroupMapper {

    @Select("SELECT * FROM authorization.group")
    List<Group> getAllGroups();
}
