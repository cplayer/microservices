package com.zhuri.microservices.serviceauthorization.rolemanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RoleController {

    @Autowired
    RoleService roleService;

    @RequestMapping(value="/admin/getAllRoles", method = RequestMethod.GET)
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    @RequestMapping(value="/admin/getRoleById", method = RequestMethod.GET)
    public Role getRoleById(@RequestParam int id) {
        return roleService.getRoleById(id);
    }

    @RequestMapping(value="/admin/addRole", method = RequestMethod.POST)
    public int addRole(@RequestBody Role role) {
        return roleService.addRole(role);
    }

    @RequestMapping(value="/admin/updateRole", method = RequestMethod.POST)
    public int updateRole(@RequestBody Role role) {
        return  roleService.updateRole(role);
    }

    @RequestMapping(value="/admin/getRolesByIUserId", method = RequestMethod.GET)
    public  List<Role> getRolesByIUserId(@RequestParam  int iUserId) {
        return roleService.getRolesByIUserId(iUserId);
    }
}
