package com.zhuri.microservices.serviceauthorization.usermanagement;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {

    @Select("SELECT COUNT(*) FROM internale_user where username=#{username}")
    int checkInternalUserUsername(String username);

    @Insert("INSERT INTO internal_user(username, password, enabled) " +
            " VALUES(#{username}, #{password}, #{enabled})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    int addInternalUser(User user);

    @Insert("INSERT INTO iuser_role(iuserId, roleId) " +
            " VALUES(#{iuserId}, #{roleId})")
    int addIuserRole(@Param("iuserId")int iUserId, @Param("roleId")int roleId);

    @Insert("INSERT INTO iuser_group(iuserId, groupId) " +
            " VALUES(#{iuserId}, #{groupId})")
    int addIuserGroup(@Param("iuserId")int iUserId, @Param("groupId")int groupId);

    @Update("UPDATE iuser_role SET " +
            " roleId = #{roleId}")
    int updateIuserRole(@Param("id") int id, @Param("roleId") int roleId);

    @Delete("DELETE FROM iuser_role WHERE id =#{id}")
    void deleteIuserRole(int id);

    @Select("SELECT internal_user.id,username,enabled" +
            " FROM internal_user INNER JOIN iuser_role on internal_user.id = iuser_role.iuserId" +
            " WHERE iuser_role.roleId = #{id}")
    List<User> getIUsersByRoleId(int id);

    @Select("SELECT COUNT(*)" +
            " FROM internal_user INNER JOIN iuser_role on internal_user.id = iuser_role.iuserId" +
            " WHERE iuser_role.roleId = #{id}")
    int countIUsersByRoleId(int id);

    @Select("SELECT id " +
            " FROM iuser_role " +
            " WHERE iuserId=#{iuserId}")
    int[] getIdsByIuserId(int iuserId);

    @Select("SELECT internal_user.id,username,enabled" +
            " FROM internal_user INNER JOIN iuser_role on internal_user.id = iuser_role.iuserId" +
            " WHERE iuser_role.roleId = #{id}")
    List<User> getIUsersByGroupId(int id);
}
