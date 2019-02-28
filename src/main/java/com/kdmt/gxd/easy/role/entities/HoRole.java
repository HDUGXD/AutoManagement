package com.kdmt.gxd.easy.role.entities;

import java.io.Serializable;


public class HoRole implements Serializable {
        
        private static final long serialVersionUID = 1L;
        
        private Long id;
        /**角色名称*/
        private String name;
        /**角色类型*/
        private String type;
        /**上级角色**/
        private String fatherRole;
        /**下级角色**/
        private String sonRole;
        /**备注**/
        private String remark;
        /**权限**/
        private String permission;
    //******分页属性-自定义********
    private int  pageNo;
    private int  pageSize;

    public String getPermission() {
        return permission;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }

    public String getFatherRole() {
        return fatherRole;
    }

    public void setFatherRole(String fatherRole) {
        this.fatherRole = fatherRole;
    }

    public String getSonRole() {
        return sonRole;
    }

    public void setSonRole(String sonRole) {
        this.sonRole = sonRole;
    }

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Long getId() {
            return this.id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public String getName() {
            return this.name;
        }
        
        public void setName(String name) {
            this.name = name;
        }
        
        public String getType() {
            return this.type;
        }
        
        public void setType(String type) {
            this.type = type;
        }
    
}