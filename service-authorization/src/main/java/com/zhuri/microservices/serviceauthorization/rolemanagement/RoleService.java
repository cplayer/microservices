package com.zhuri.microservices.serviceauthorization.rolemanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    @Autowired
    RoleMapper roleMapper;

    public List<Role> getAllRoles() {
        return roleMapper.getAllRoles();
    }

    public Role getRoleById(int id) {
        return roleMapper.getRoleById(id);
    }

    public int addRole(Role role) {
        return roleMapper.addRole(role);
    }


    public int updateRole(Role role) {
        return  roleMapper.updateRole(role);
    }

    public  List<Role> getRolesByIUserId(int iUserId) {
        return roleMapper.getRolesByIUserId(iUserId);
    }
}
