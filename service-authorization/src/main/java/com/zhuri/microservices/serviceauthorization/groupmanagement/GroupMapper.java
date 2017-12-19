package com.zhuri.microservices.serviceauthorization.groupmanagement;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface GroupMapper {

    @Select("SELECT * FROM authorization.group")
    List<Group> getAllGroups();

    @Insert("INSERT INTO authorization.group(name, parentId) " +
            " VALUES(#{name}, #{parentId})")
    int addGroup(Group group);

    @Update(" UPDATE authorization.group " +
            " SET name=#{name}, parentId=#{parentId}" +
            " WHERE id=#{id}")
    int updateGroup(Group group);


    @Select("SELECT COUNT(*)" +
            " FROM authorization.group" +
            " WHERE parentId=#{parentId}")
    int countGroupsByParentId(int parentId);

    @Select("SELECT COUNT(*)" +
            " FROM internal_user" +
            " WHERE groupId=#{groupId}")
    int countUsersByGroupId(int groupId);

    @Delete("DELETE FROM authorization.group WHERE id=#{id}")
    void deleteGroupById(int id);

    @Select("SELECT G.id,G.name,G.parentId " +
            " FROM internal_user INNER JOIN authorization.group as G" +
            " ON internal_user.groupId=G.id" +
            " WHERE internal_user.id= #{iUserId}")
    Group getGroupByIUserId(int iUserId);
}
