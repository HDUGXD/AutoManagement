package com.supconit.easy.ticket.permission.entities;

import java.io.Serializable;


public class HoPermission implements Serializable {
        
        private static final long serialVersionUID = 1L;
        
        private Long id;
        /**url地址*/
        private String url;
        /**url描述*/
        private String name;
        
        public Long getId() {
            return this.id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public String getUrl() {
            return this.url;
        }
        
        public void setUrl(String url) {
            this.url = url;
        }
        
        public String getName() {
            return this.name;
        }
        
        public void setName(String name) {
            this.name = name;
        }
    
}