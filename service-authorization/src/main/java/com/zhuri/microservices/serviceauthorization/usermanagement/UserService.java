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

    @Transactional
    public int addInternalUser(User user) {
        int result = 0;
        user.setEnabled(true);
        userMapper.addInternalUser(user);
        //add ROLE_USER as default role
        userMapper.addIuserRole(user.getId(), 2);
        //add to default group
        userMapper.addIuserGroup(user.getId(), 0);
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
    public int updateIuserRole(int iUserId, int[] roleIds) {
        int i, result = 0;
        int[] oldIds = userMapper.getIdsByIuserId(iUserId);
        for(i=0; i<oldIds.length && i<roleIds.length; i++) {
            userMapper.updateIuserRole(oldIds[i], roleIds[i]);
        }
        while(i<oldIds.length) {
            userMapper.deleteIuserRole(oldIds[i]);
            i++;
        }
        while(i<roleIds.length) {
            userMapper.addIuserRole(iUserId, roleIds[i]);
            i++;
        }
        result = 1;
        return result;
    }
}
