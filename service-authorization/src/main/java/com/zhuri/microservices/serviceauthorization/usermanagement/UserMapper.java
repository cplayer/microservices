package com.zhuri.microservices.serviceauthorization.usermanagement;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {

    @Select("SELECT COUNT(*) FROM internal_user where username=#{username}")
    int checkInternalUserUsername(String username);

    @Insert("INSERT INTO internal_user(username, password, enabled, realName, mobilePhone, officePhone, emailAddress, description) " +
            " VALUES(#{username}, #{password}, #{enabled}, #{realName}, #{mobilePhone}, #{officePhone}, #{emailAddress}, #{description})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    int addInternalUser(User user);

    @Insert("INSERT INTO iuser_role(iUserId, roleId) " +
            " VALUES(#{iUserId}, #{roleId})")
    int addIUserRole(@Param("iUserId")int iUserId, @Param("roleId")int roleId);

    @Update("UPDATE internal_user" +
            " SET password=#{password}" +
            " WHERE id=#{id}")
    int updateIUserPassword(@Param("id")int id, @Param("password")String password);

    @Select("SELECT id " +
            " FROM iuser_role " +
            " WHERE iUserId=#{iUserId}")
    int[] getIdsByIUserId(int iUserId);

    @Update("UPDATE iuser_role SET " +
            " roleId = #{roleId}" +
            " WHERE id = #{id}")
    int updateIUserRole(@Param("id") int id, @Param("roleId") int roleId);

    @Delete("DELETE FROM iuser_role WHERE id =#{id}")
    void deleteIUserRole(int id);

    @Update("UPDATE internal_user SET " +
            " groupId = #{groupId}" +
            " WHERE id = #{id}")
    int updateIUserGroup(@Param("id") int id, @Param("groupId") int groupId);


    @Select("SELECT internal_user.id, username, enabled, realName, mobilePhone, officePhone, emailAddress, description" +
            " FROM internal_user INNER JOIN iuser_role on internal_user.id = iuser_role.iUserId" +
            " WHERE iuser_role.roleId = #{roleId}")
    List<User> getIUsersByRoleId(int roleId);

    @Select("SELECT COUNT(*)" +
            " FROM internal_user INNER JOIN iuser_role on internal_user.id = iuser_role.iUserId" +
            " WHERE iuser_role.roleId = #{roleId}")
    int countIUsersByRoleId(int roleId);

    @Select("SELECT id, username, enabled, realName, mobilePhone, officePhone, emailAddress, description FROM internal_user WHERE groupId = #{groupId}")
    List<User> getIUsersByGroupId(int groupId);

    @Select("SELECT COUNT(*) FROM internal_user WHERE groupId = #{groupId}")
    int countIUsersByGroupId(int groupId);

    @Select("<script> " +
            "SELECT id, username, enabled, realName, mobilePhone, officePhone, emailAddress, description " +
            "FROM internal_user " +
            " <where> " +
            " <if test=\"id != null\">id=#{id}</if> " +
            " <if test=\"username != null\"> AND username=#{username}</if> " +
            " <if test=\"realName != null\">AND realName=#{realName}</if> " +
            " <if test=\"mobilePhone != null\"> AND mobilePhone=#{mobilePhone}</if> " +
            " <if test=\"officePhone != null\">AND officePhone=#{officePhone}</if> " +
            " <if test=\"emailAddress != null\"> AND emailAddress=#{emailAddress}</if> " +
            " </where> " +
            " </script> ")
    List<User> getIUsersByUserInfo(@Param("id")Integer id, @Param("username")String username,
                           @Param("realName")String realName, @Param("mobilePhone")String mobilePhone,
                           @Param("officePhone")String officePhone, @Param("emailAddress")String emailAddress);

    @Select("<script> " +
            "SELECT COUNT(*) " +
            "FROM internal_user " +
            " <where> " +
            " <if test=\"id != null\">id=#{id}</if> " +
            " <if test=\"username != null\"> AND username=#{username}</if> " +
            " <if test=\"realName != null\">AND realName=#{realName}</if> " +
            " <if test=\"mobilePhone != null\"> AND mobilePhone=#{mobilePhone}</if> " +
            " <if test=\"officePhone != null\">AND officePhone=#{officePhone}</if> " +
            " <if test=\"emailAddress != null\"> AND emailAddress=#{emailAddress}</if> " +
            " </where> " +
            " </script> ")
    int countIUsersByUserInfo(@Param("id")Integer id, @Param("username")String username,
                           @Param("realName")String realName, @Param("mobilePhone")String mobilePhone,
                           @Param("officePhone")String officePhone, @Param("emailAddress")String emailAddress);

    @Update("UPDATE internal_user " +
            " SET realName=#{realName}, mobilePhone=#{mobilePhone}, officePhone=#{officePhone}, emailAddress=#{emailAddress}, description=#{description}" +
            " WHERE id=#{id}")
    int updateIUserInfo(User user);
}
