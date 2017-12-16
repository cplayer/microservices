package com.zhuri.microservices.serviceauthorization.rolemanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RoleController {

    @Autowired
    RoleService roleService;

    @RequestMapping(value="/admin/getAllRoles", method = RequestMethod.GET)
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    @RequestMapping(value="/admin/addRole", method = RequestMethod.POST)
    public int addRole(Role role) {
        return roleService.addRole(role);
    }

    @RequestMapping(value="/admin/updateRole", method = RequestMethod.POST)
    public int updateRole(Role role) {
        return  roleService.updateRole(role);
    }
}
