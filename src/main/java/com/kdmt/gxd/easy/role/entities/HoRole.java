package com.kdmt.gxd.easy.role.entities;

import java.io.Serializable;


public class HoRole implements Serializable {
        
        private static final long serialVersionUID = 1L;
        
        private Long id;
        /**角色名称*/
        private String name;
        /**角色类型*/
        private String type;
        
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