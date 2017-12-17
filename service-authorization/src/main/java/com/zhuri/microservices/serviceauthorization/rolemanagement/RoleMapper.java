package com.zhuri.microservices.serviceauthorization.rolemanagement;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface RoleMapper {
    @Select("SELECT * FROM role")
    List<Role> getAllRoles();

    @Insert("INSERT INTO role(chineseName, englishName, description)" +
            " VALUES(#{chineseName}, #{englishName}, #{description})")
    int addRole(Role role);

    @Update("UPDATE role " +
            " SET chineseName=#{chineseName}, englishName=#{englishName}, description=#{description}" +
            " WHERE id=#{id}")
    int updateRole(Role role);


    @Select("SELECT role.id, chineseName, englishName, description " +
            " FROM iuser_role INNER JOIN role ON iuser_role.roleId = role.id" +
            " WHERE iuser_role.iUserId = #{iUserId} ")
    List<Role> getRolesByIUserId(int iUserId);

}
