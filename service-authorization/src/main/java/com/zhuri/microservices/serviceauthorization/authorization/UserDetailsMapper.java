package com.zhuri.microservices.serviceauthorization.authorization;

import com.zhuri.microservices.serviceauthorization.authorization.CustomUserDetails;
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserDetailsMapper {
    @Select("SELECT * FROM internal_user WHERE username=#{username};")
    CustomUserDetails loadUserByUsername(@Param("username")String username);

    @Select("SELECT role.englishName FROM iuser_role INNER JOIN role ON iuser_role.roleId=role.id WHERE iuser_role.iuserId=#{id};")
    String[] getUserAuthorities(int id);
}
