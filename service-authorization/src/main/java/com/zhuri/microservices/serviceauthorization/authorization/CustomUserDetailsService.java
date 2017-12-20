package com.zhuri.microservices.serviceauthorization.authorization;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    UserDetailsMapper userDetailsMapper;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        CustomUserDetails customUserDetails = userDetailsMapper.loadUserByUsername(s);
        if(customUserDetails != null) {
            String[] authoritiesStrings = userDetailsMapper.getUserAuthorities(customUserDetails.getId());
            List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
            for (String as:authoritiesStrings
                 ) {
                authorities.add(new SimpleGrantedAuthority("ROLE_"+as));
            }
            customUserDetails.setAuthorities(authorities);
        } else {
            throw new UsernameNotFoundException("Invalid username or password!");
        }
        return customUserDetails;
    }
}
