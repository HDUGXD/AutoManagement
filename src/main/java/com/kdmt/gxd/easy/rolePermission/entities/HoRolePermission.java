package com.kdmt.gxd.easy.rolePermission.entities;

import java.io.Serializable;


public class HoRolePermission implements Serializable {
        
        private static final long serialVersionUID = 1L;
        /**角色ID*/
        private Long rid;
        /**权限ID*/
        private Long pid;
        
        public Long getRid() {
            return this.rid;
        }
        
        public void setRid(Long rid) {
            this.rid = rid;
        }
        
        public Long getPid() {
            return this.pid;
        }
        
        public void setPid(Long pid) {
            this.pid = pid;
        }
    
}