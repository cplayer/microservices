package com.zhuri.microservices.serviceauthorization.usermanagement;

import com.github.pagehelper.PageHelper;
import com.zhuri.microservices.serviceauthorization.PageBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public int checkInternalUserUsername(String username) {
        return userMapper.checkInternalUserUsername(username);
    }

    public int checkInternalUserPassword(int id, String password) {
        return userMapper.checkInternalUserPassword(id,password);
    }

    @Transactional
    public int addInternalUser(User user) {
        int result = 0;
        user.setEnabled(true);
        user.setGroupId(0);
        userMapper.addInternalUser(user);
        //add ROLE_USER as default role
        userMapper.addIUserRole(user.getId(), 2);
        result = 1;
        return result;
    }

    @Transactional
    public PageBean<User> getIUsersByRoleId(int roleId, int pageNumber, int pageSize) {
        PageHelper.startPage(pageNumber, pageSize);
        List<User> allRows = userMapper.getIUsersByRoleId(roleId);
        int total = userMapper.countIUsersByRoleId(roleId);            //总记录数
        PageBean<User> pageData = new PageBean<>(pageNumber, pageSize, total);
        pageData.setRows(allRows);
        return pageData;
    }

    @Transactional
    public PageBean<User> getIUsersByGroupId(int groupId, int pageNumber, int pageSize) {
        PageHelper.startPage(pageNumber, pageSize);
        List<User> allRows = userMapper.getIUsersByGroupId(groupId);
        int total = userMapper.countIUsersByGroupId(groupId);            //总记录数
        PageBean<User> pageData = new PageBean<>(pageNumber, pageSize, total);
        pageData.setRows(allRows);
        return pageData;
    }

    @Transactional
    public PageBean<User> getIUsersByUserInfo(Integer id, String username, String realName, String mobilePhone, String officePhone, String emailAddress, int pageNumber, int pageSize) {
        PageHelper.startPage(pageNumber, pageSize);
        List<User> allRows = userMapper.getIUsersByUserInfo(id, username,realName,mobilePhone,officePhone,emailAddress);
        int total = userMapper.countIUsersByUserInfo(id, username,realName,mobilePhone,officePhone,emailAddress);
        PageBean<User> pageData = new PageBean<>(pageNumber, pageSize, total);
        pageData.setRows(allRows);
        return pageData;
    }

    public User getIUserById(int id) {
        return userMapper.getIUserById(id);
    }

    int updateIUserPassword(int id, String password) {
        return userMapper.updateIUserPassword(id, password);
    }

    @Transactional
    public int updateIUserRole(int iUserId, int[] roleIds) {
        int i, result = 0;
        int[] oldIds = userMapper.getIdsByIUserId(iUserId);
        for(i=0; i<oldIds.length && i<roleIds.length; i++) {
            userMapper.updateIUserRole(oldIds[i], roleIds[i]);
        }
        while(i<oldIds.length) {
            userMapper.deleteIUserRole(oldIds[i]);
            i++;
        }
        while(i<roleIds.length) {
            userMapper.addIUserRole(iUserId, roleIds[i]);
            i++;
        }
        result = 1;
        return result;
    }

    public int updateIUserGroup(int iUserId, int groupId) {
        return userMapper.updateIUserGroup(iUserId, groupId);
    }

    public int updateIUserInfo(User user) {
        return userMapper.updateIUserInfo(user);
    }

}
