package com.zhuri.microservices.serviceauthorization;

import org.apache.ibatis.annotations.*;

@Mapper
public interface UserDetailsMapper {
    @Select("SELECT * FROM user WHERE username=#{username};")
    CustomUserDetails loadUserByUsername(@Param("username")String username);

    @Select("SELECT role.rolename FROM user_role INNER JOIN role ON user_role.roleId=role.id WHERE user_role.userId=#{id};")
    String[] getUserAuthorities(int id);
}
